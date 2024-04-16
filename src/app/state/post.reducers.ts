import { createReducer, on, Action } from "@ngrx/store";
import { Post } from "../post/models/post";
import { addPost, deletePost, loadPosts, loadPostsSuccessfully, setPostToEdit, updatePost } from "./post.actions";
// import { updatePost } from "./post.actions";

export const POST_STATE_KEY = 'posts'
export interface PostState {
  posts: Post[],
loaded: boolean;
postToEdit:Post;
}

export const initialState: PostState = {
  posts: [],
  loaded: false,
  postToEdit:{
    user: "",
    content: "",
    published: new Date()
  }

}

export const postsReducer = createReducer(
initialState,
on(loadPosts, state =>{
  return {...state}
 }),
on(loadPostsSuccessfully, (state, action) =>{
  return {
    ...state,
    posts: action.posts,
    loaded: true,
  }},
),
on(addPost, (state, action) => {
  const newPosts : Post[] = state.posts.slice();
  newPosts.push(action.post)
  return {
    ...state,
  posts: newPosts,
}

}),
on(deletePost, (state, action)=>{
  const allPost: Post[] = state.posts.slice();
  allPost.splice(allPost.findIndex(x => x === action.post), 1)
return {
  ...state,
  posts : allPost,
}
}),

on(setPostToEdit, (state, action)=>{
  return {
  ...state,
  postToEdit : action.post,
}
}),
on(updatePost, (state, action)=>{
const  posts = state.posts.slice()
const index: number = posts.findIndex(x=> x === action.outdatePost)
posts[index] = action.updatePost
  return {
  ...state,
  posts : posts,
}
}),

// on(countPosts, (state) => {
//   return {
//     ...state,
//     totalPosts: state.posts.length
//   };
// })
);


//MODIFICAR:
// on(updatePost, (state, action) => {
//   const updatedPosts = state.posts.map((post, index) =>
//     index === action.index ? { ...post, ...action.post } : post
//   );
//   return {
//     ...state,
//     posts: updatedPosts,
//   };
// })
//MODIFICAR:








  export function reducer(state: PostState | undefined, action: Action){
    return postsReducer(state,action)
  }
