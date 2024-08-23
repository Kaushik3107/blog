import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchQuery: string = '';
  selectedCategories: { [key: string]: boolean } = {};
  categories: string[] = ['IT', 'Social', 'Marketing', 'News'];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postService.posts$.subscribe((posts) => {
      this.posts = posts;
      this.filterPosts(); // Initial filtering
    });

    this.categories.forEach((category) => {
      this.selectedCategories[category] = false; // Initialize category filters
    });
  }

  filterPosts(): void {
    const query = this.searchQuery.toLowerCase();
    const selectedCategories = Object.keys(this.selectedCategories).filter(
      (cat) => this.selectedCategories[cat]
    );

    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(post.category);

      return matchesSearch && matchesCategory;
    });
  }

  editPost(postId: number): void {
    this.router.navigate(['/edit-post', postId]);
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId);
  }
}
