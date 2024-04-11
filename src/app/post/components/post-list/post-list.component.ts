import { Component } from '@angular/core';
import { data } from '../../../data';
import { PostComponent } from "../post/post.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [PostComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
posts = data
}
