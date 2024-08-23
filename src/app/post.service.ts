import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts = new BehaviorSubject<Post[]>([]);
  posts$ = this.posts.asObservable();
  private currentId = 1;

  constructor() {}

  addPost(post: Post) {
    post.id = this.currentId++;
    const currentPosts = this.posts.value;
    this.posts.next([...currentPosts, post]);
  }

  editPost(updatedPost: Post) {
    const currentPosts = this.posts.value;
    const postIndex = currentPosts.findIndex((p) => p.id === updatedPost.id);
    currentPosts[postIndex] = updatedPost;
    this.posts.next([...currentPosts]);
  }

  deletePost(postId: number) {
    const currentPosts = this.posts.value.filter((post) => post.id !== postId);
    this.posts.next(currentPosts);
  }

  getPostById(postId: number): Post | undefined {
    return this.posts.value.find((post) => post.id === postId);
  }
}
