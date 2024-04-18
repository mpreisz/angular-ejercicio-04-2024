import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, filter, map, take } from 'rxjs';
import { Post } from '../../models/post';
// import { Router, RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import {  Router } from '@angular/router';
import { addPost, updatePost, } from '../../../state/post.actions';
import { Store } from '@ngrx/store';
import { getPostToEdit } from '../../../state/posts.selector';
import { PostFormComponentStore } from './post-form-component.store';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
     ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
  providers: [PostFormComponentStore]
})
export class PostFormComponent implements OnInit {
   post$ : Observable<Post> = this.store.select(getPostToEdit);
   outdatePost: Post = { user: "", content: "", published: new Date()}

   isNewPost = true;



  constructor(private router: Router,
    private postsService: PostsService,
    private store: Store,
    private componentStore: PostFormComponentStore,

    ) {}

  public postForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    // published: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  private userErrors() {
    const errors: string[] = [];
    if (this.postForm.getError('required', ['user'])) {
      errors.push('Se requiere un nombre');
    }
    if (this.postForm.getError('required', ['content'])) {
      errors.push('El contenido es requerido');
    }
    return errors;
  }

  public errorsArray: string[] = [];

  public contentErrors$ = this.postForm.statusChanges.pipe(
    map((x) => {
      return (this.errorsArray = this.userErrors());
    })
  );

  ngOnInit() {
    this.post$.pipe(
    filter(x=>x.user != "" && x.content != ""),
    take(1),
    map(x=> {
      this.outdatePost = x;
      this.isNewPost = false
    })).subscribe()

    this.postForm.valueChanges.pipe(
      map((values) => this.componentStore.postUpdater(values))
    ).subscribe();

  }

  //agrego un metodo para verificar si el formulario es valido?
  public onSubmit() {
    const postData: Post = {
      user: '',
      content: '',
      published: new Date()
    };
    postData.user = this.postForm.get('user')!.value || '';
    postData.content = this.postForm.get('content')!.value || '';
    // this.postsService.addPost(postData);
    if(this.isNewPost ){
      this.store.dispatch(addPost({post: postData}))
    } else{
      this.store.dispatch(updatePost({updatePost: postData ,outdatePost: this.outdatePost }))
    }

    this.router.navigate(['posts/list']);
  }

}
