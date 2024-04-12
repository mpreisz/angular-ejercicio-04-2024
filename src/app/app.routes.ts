import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./post/post.module').then((x) => x.PostModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
];
