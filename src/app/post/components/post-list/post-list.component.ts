import { Component, Injectable, OnInit } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
import { Store, createAction, props } from '@ngrx/store';
import { loadPosts } from '../../../state/post.actions';
import { getPostLoaded, getPosts } from '../../../state/posts.selector';
import { Observable, filter, map, take, tap } from 'rxjs';
import { Post } from '../../models/post';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Actions, ofType } from '@ngrx/effects';
import {MatButtonToggleModule} from '@angular/material/button-toggle';





export const EXAMPLE_STATE_KEY = 'posts';

export interface ExampleState {
  isWorking: boolean,  //rastrea si alguna funcionalidad esta activa.
  description: string   //almaceno una descripcion del estado actual del proceso.
}

export const initialState: ExampleState = {
  isWorking: false,
  description: 'uyyy no anda...'
}

// export const  exampleInitialState = createFeatureSelector<ExampleState>(EXAMPLE_STATE_KEY)

//Actions para cambiar la propiedad isWorking
export const updateWorkingStatus = createAction(
  '[PostList ComponentStore] Update isWorking',
  props<{ isWorking: boolean }>()
);


@Injectable()
export class PostListComponentStore extends ComponentStore<ExampleState> {  // ESTRUCTURA DEL STATE QUE USA EL COMPONENTSTORE, DEFINIDA MAS ARRIBA

  constructor(public actions$: Actions) {
    super(initialState);
  }

  // selectors
  getExampleState$ = this.select(  // Obtengo todo el estado del componente
    (state) => state
  );
  getIsWorkingExampleState$ = this.select(   //Obtengo solo el isWorking
    (state) => state.isWorking
  );

  // updater (reducer)
  setIsWorking = this.updater((state, isWorking: boolean) => ({
    ...state,
    isWorking: isWorking
  }));


 // effect
 updateIswWorkingEffect = this.effect(() =>
  this.actions$.pipe(
      ofType(updateWorkingStatus),
      map((action) => {
        console.log(action.isWorking);
        this.setIsWorking(action.isWorking)}))
  );
}

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, CommonModule,MatButtonToggleModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  providers: [PostListComponentStore]
})
export class PostListComponent implements OnInit {
  // public posts!: Post[];
   posts$: Observable<Post[]> = this.store.select(getPosts);
   postloaded$: Observable<boolean> = this.store.select(getPostLoaded);


// Component Store
isWorkingState$: Observable<boolean> = this.componentStore.getIsWorkingExampleState$;


  constructor(
    // private postService: PostsService,
    private store: Store,
    private router: Router,
    private componentStore: PostListComponentStore) {}

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

 toggleIsWorking(param: boolean) {
  this.componentStore.setIsWorking(param);  //llamo al metodo del reducer que me manda el nuevo estado.
}



  }

