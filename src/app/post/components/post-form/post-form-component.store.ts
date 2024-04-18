import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Actions, ofType } from "@ngrx/effects";
import { createAction, props, Store } from "@ngrx/store";
import { filter, map, take, withLatestFrom } from "rxjs";
import { Post } from "../../models/post";
import { addPost, updatePost } from "../../../state/post.actions";

export interface PostFormComponentState {
  post: Post
}

const initialState: PostFormComponentState = {
  post: {
    user: '',
    published: new Date,
    content: ''
  }
}

// actions
export const createPostAction = createAction(
  '[PostForm ComponentStore] Create Post in GlobalStore',
);
export const updatePostAction = createAction(
  '[PostForm ComponentStore] Update Post in GlobalStore',
  props<{ outdatedPost: Post }>()
);


@Injectable()
export class PostFormComponentStore extends ComponentStore<PostFormComponentState> {
  constructor(public actions$: Actions, private globalStore: Store) {
    super(initialState);
  }

//Creo mi selector:
getPost$ = this.select(
  (state) => state.post
);

 // updaters
 postUpdater = this.updater((state, formValues: Partial<{ userName: string | null; content: string | null; }>) => {
  const statePost: Post = {
    user: formValues.userName ?? '',
    published: new Date,
    content: formValues.content ?? ''
  };
  return {
    ...state,
    post: statePost
  }
});

 // creo un effects
 createPostEffect = this.effect(() =>
  this.actions$.pipe(
    ofType(createPostAction),
    map(() => {
      this.getPost$.pipe(
        map((post) =>
          this.globalStore.dispatch(addPost({ post }))
        )
      ).subscribe();
    })
  )
);

 //creo otro effects
 updatePostEffect = this.effect(() =>
  this.actions$.pipe(
    ofType(updatePostAction),
    withLatestFrom(this.getPost$),
    map(([action,updatedPost]) => {
      this.globalStore.dispatch(updatePost({ updatePost: updatedPost, outdatePost: action.outdatedPost}))
    })
  )
);

}
