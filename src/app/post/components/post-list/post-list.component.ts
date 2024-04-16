import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadPosts } from '../../../state/post.actions';
import { getPostLoaded, getPosts } from '../../../state/posts.selector';
import { Observable, filter, take, tap } from 'rxjs';
import { Post } from '../../models/post';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  // public posts!: Post[];
   posts$: Observable<Post[]> = this.store.select(getPosts);
   postloaded$: Observable<boolean> = this.store.select(getPostLoaded);

  constructor(
    // private postService: PostsService,
    private store: Store,
    private router: Router) {}

  ngOnInit() {
    this.postloaded$.pipe(
      filter(x => !x),
      take(1),
      tap(x => {
        this.store.dispatch(loadPosts())
      })).subscribe();

  }
 createPost(){
  this.router.navigate(["posts/create"]);
 }
  }

