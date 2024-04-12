import { Component } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  public posts!: Post[];
  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.posts = this.postService.allPosts;
  }
}
