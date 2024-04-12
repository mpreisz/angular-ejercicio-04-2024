import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';

import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './services/posts.service';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadComponent: () =>
      import('./components/post-list/post-list.component').then(
        (x) => x.PostListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/post-form/post-form.component').then(
        (x) => x.PostFormComponent
      ),
  },
];

export const API_URL = new InjectionToken(<string>'API_URL');
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: 'https://asmisalan.github.io/feedgram/posts.json',
    },
    PostsService,
  ],

  // exports: [PostComponent, PostListComponent, PostFormComponent],
  exports: [],
})
export class PostModule {}
