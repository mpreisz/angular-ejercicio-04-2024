import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {  deletePost, setPostToEdit } from '../../../state/post.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectTotalPosts } from '../../../state/posts.selector';
// import { updatePost } from '../../../state/post.actions';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  buttonText: string = "VIEW MORE";
  showFullContent: boolean = false;
  postCount$: Observable<number> = this.store.select(selectTotalPosts);
  constructor(private store: Store, private router: Router){}
  @Input()
  post! : Post;

  ngOnInit() {


  }

  ViewMoreOrLessContent() {
    this.showFullContent = !this.showFullContent;
    this.buttonText = this.showFullContent ? 'VIEW LESS' : 'VIEW MORE';
  }

  deletePost(post: Post){
    this.store.dispatch(deletePost({post}));
  }

  editPost(post: Post){
    this.store.dispatch(setPostToEdit({post}))
    this.router.navigate(['posts', 'create'])
  }

  // contador(){
  //   this.store.dispatch(countPosts());
  // }
//MODIFICAR:
// modifyPost(post: Post){
//  this.store.dispatch(updatePost({ index: 2, post: updatedPost }));
// }
//MODIFICAR
}
