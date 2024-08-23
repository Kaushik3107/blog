import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  postId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required], // New category field
    });
  }

  ngOnInit(): void {
    // Check if there's an ID in the route params
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    if (this.postId) {
      this.isEditMode = true;
      // Load the existing post data
      const post = this.postService.getPostById(this.postId);
      if (post) {
        this.postForm.patchValue(post);
      }
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData: Post = { id: this.postId ?? 0, ...this.postForm.value };

      if (this.isEditMode) {
        // Edit existing post
        this.postService.editPost(postData);
      } else {
        // Add new post
        this.postService.addPost(postData);
      }

      // Redirect to post list
      this.router.navigate(['/posts']);
    }
  }
}
