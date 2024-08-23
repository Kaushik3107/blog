import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    const post = this.postService.getPostById(this.postId);
    if (post) {
      this.postForm.patchValue(post);
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const updatedPost: Post = { id: this.postId!, ...this.postForm.value };
      this.postService.editPost(updatedPost);
      this.router.navigate(['/posts']);
    }
  }
}
