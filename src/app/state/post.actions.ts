import { createAction, props } from '@ngrx/store';
import { Post } from '../post/models/post';


//Action para solicitar publicaciones.
export const loadPosts = createAction(
  '[Post list] request all the post');

  //Action Publicacion cargada con exito.
export const loadPostsSuccessfully = createAction(
  '[Post list] load post success',
  props<{ posts: Post[] }>()
);
//Action falla en la carga de la publicacion.
export const loadPostsFailure = createAction(
  '[Post list] load posts failure',
  props<{ posts: Post[] }>()
);

export const getPostLoaded = createAction(
  '[Post list] post loaded '
 );
// Action solicitud de creacion de publicaciones
export const addPost = createAction(
  '[Post Form]  Post creation request',
  props<{ post: Post }>()
)
export const addPostsuccess = createAction(
  '[Post Form]  Post creation ',
  props<{ postId: number }>()
)

//Action Borrar un post:
export const deletePost = createAction(
  '[Post list] delete post succesfully',
  props<{ post: Post }>()
)
//Action editar un post:
export const setPostToEdit = createAction(
  '[Post] Set Post to edit',
  props<{ post: Post }>()
)
//Action actualizar publicaciones:
export const updatePost = createAction(
  '[Post Form] update posts',
  props<{ updatePost: Post, outdatePost: Post }>()
)


