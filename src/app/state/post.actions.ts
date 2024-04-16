import { createAction, props } from '@ngrx/store';
import { Post } from '../post/models/post';

export const loadPosts = createAction(
  '[Post list] request all the post');

export const loadPostsSuccessfully = createAction(
  '[Post list] load post success',
  props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
  '[Post list] load posts failure',
  props<{ posts: Post[] }>()
);

export const getPostLoaded = createAction(
  '[Post list] post loaded '
 );

export const addPost = createAction(
  '[Post Form]  Post creation request',
  props<{ post: Post }>()
)
export const addPostsuccess = createAction(
  '[Post Form]  Post creation ',
  props<{ postId: number }>()
)

//Borrar un post:
export const deletePost = createAction(
  '[Post list] delete post succesfully',
  props<{ post: Post }>()
)

export const setPostToEdit = createAction(
  '[Post] Set Post to edit',
  props<{ post: Post }>()
)

export const updatePost = createAction(
  '[Post Form] update posts',
  props<{ updatePost: Post, outdatePost: Post }>()
)


// export const countPosts = createAction('[Post] Count Posts');



//MODIFICAR:
// export const updatePost = createAction(
//   '[Post list] Post modified',
//   props<{ index: number, post: Post }>()

// );
  //MODIFICAR:
