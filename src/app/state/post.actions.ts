import { createAction, props } from '@ngrx/store';
import { Post } from '../post/models/post';

export const loadPosts = createAction('[Post list] load posts success');

export const loadPostsSuccessfully = createAction(
  '[Post Set-list] Set Post success',
  props<{ posts: Post[] }>()
);
