import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'add-post', component: AddPostComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'edit-post/:id', component: AddPostComponent }, // For editing posts
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
