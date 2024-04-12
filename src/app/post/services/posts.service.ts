import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Post } from '../models/post';
import { map, take } from 'rxjs';
import { API_URL } from '../post.module';

@Injectable()
export class PostsService {
  public allPosts: Post[] = [];
  constructor(
    @Inject(API_URL) public serviceURL: string,
    private httpClient: HttpClient
  ) {
    this.httpClient
      .get<Post[]>(this.serviceURL)
      .pipe(
        take(1),
        map((posts) => posts.map((post) => this.allPosts.push(post)))
      )
      .subscribe();
  }

  // public getAllPost() {
  //   return this.httpClient.get<Post[]>(this.ServiceURL);
  // }
  addPost(post: Post) {
    this.allPosts.push(post);
  }
}
