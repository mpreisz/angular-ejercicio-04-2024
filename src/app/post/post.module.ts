import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './services/posts.service';
import { Routes, RouterModule } from '@angular/router';
import { PostFormComponent } from './components/post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PostListComponent },
  { path: 'create', component: PostFormComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostListComponent,
    PostComponent,
    HttpClientModule,
    PostFormComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: 'API_URL',
      useValue: 'https://asmisalan.github.io/feedgram/posts.json',
    },
    PostsService,
  ],

  exports: [PostComponent, PostListComponent, PostFormComponent],
})
export class PostModule {}
