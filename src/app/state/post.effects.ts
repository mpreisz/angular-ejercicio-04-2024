import { Inject, Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  map,  switchMap } from 'rxjs/operators';
import { loadPosts, loadPostsSuccessfully } from './post.actions';
import { Post } from '../post/models/post';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../post/post.module';
@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        this.httpClient
      .get<Post[]>(this.serviceURL)
        .pipe(map((posts)=> loadPostsSuccessfully({posts})))

    )
  ))
  constructor(private actions$: Actions,
    @Inject(API_URL) public serviceURL: string,
            private httpClient: HttpClient) {}
}
