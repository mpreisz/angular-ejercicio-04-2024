import { createFeatureSelector, createSelector } from "@ngrx/store";
import { POST_STATE_KEY, PostState } from "./post.reducers";

export const getPostsState =
createFeatureSelector<PostState>(POST_STATE_KEY);

export const getPosts = createSelector(getPostsState,  state => state.posts
);

