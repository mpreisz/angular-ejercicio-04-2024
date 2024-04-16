import { createFeatureSelector, createSelector } from "@ngrx/store";
import { POST_STATE_KEY, PostState } from "./post.reducers";


export const getPostsState =
createFeatureSelector<PostState>(POST_STATE_KEY);

export const getPosts = createSelector(getPostsState,  state => state.posts
);

export const getPostLoaded = createSelector(getPostsState, state =>state.loaded)


export const getPostToEdit = createSelector(
  getPostsState,
  state =>state.postToEdit

)
export const selectTotalPosts = createSelector(
  getPostsState,
  (state) => state.posts.length
);
