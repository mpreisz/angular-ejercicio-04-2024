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
import { map } from 'rxjs';
import { Post } from '../../models/post';
// import { Router, RouterLink } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    // RouterLink,
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent implements OnInit {
  constructor(private router: Router, private postsService: PostsService) {}

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

  //agrego un metodo para verificar si el formulario es valido?
  public onSubmit() {
    const postData: Post = {
      user: '',
      content: '',
    };
    postData.user = this.postForm.get('user')!.value || '';
    postData.user = this.postForm.get('content')!.value || '';
    this.postsService.addPost(postData);
    this.router.navigate(['posts/list']);
  }
  ngOnInit(): void {}
}
