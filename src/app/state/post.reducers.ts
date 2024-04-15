import { createReducer, on, Action } from "@ngrx/store";
import { Post } from "../post/models/post";
import { loadPosts, loadPostsSuccessfully } from "./post.actions";

export const POST_STATE_KEY = 'posts'
export interface PostState {
  posts: Post[],

}

export const initialState: PostState = {
  posts: []
}

const postsReducer = createReducer(
initialState,
on(loadPosts, state =>({
...state
})),
on(loadPostsSuccessfully, (state, action) =>{
  return {
    ...state,
    posts: action.posts,
  }

  }))

  export function reducer(state: PostState | undefined, action: Action){
    return postsReducer(state,action)
  }
