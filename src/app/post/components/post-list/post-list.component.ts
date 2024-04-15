import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts.service';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../../state/post.actions';
import { getPosts } from '../../../state/posts.selector';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  // public posts!: Post[];
   posts$: Observable<Post[]> = this.store.select(getPosts)

  constructor(
    // private postService: PostsService,
    private store: Store) {}

  ngOnInit() {
    // this.posts = this.postService.allPosts;
    this.store.dispatch(loadPosts())
  }
}
