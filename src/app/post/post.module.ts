import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsService } from './services/posts.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, PostListComponent, PostComponent,  HttpClientModule
  ],
  providers: [{
     provide: 'API_URL',
     useValue: 'https://asmisalan.github.io/feedgram/posts.json' }
    , PostsService,
    ],

  exports: [PostListComponent]

})
export class PostModule { }
