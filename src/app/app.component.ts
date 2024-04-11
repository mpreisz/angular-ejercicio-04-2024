import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostModule } from './post/post.module';
import { PostListComponent } from "./post/components/post-list/post-list.component";

 @Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PostModule, PostListComponent]
})
export class AppComponent {
  title = 'angular-ejercicio';
}
