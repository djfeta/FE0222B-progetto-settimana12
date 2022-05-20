import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Route[] = [
  {
    path: 'preferiti',
    loadChildren: () =>
      import('./features/preferiti/preferiti.module').then((m) => m.UsersModule),
  },
  {
    path: 'movies',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./features/movies/movies.module').then(
        (m) => m.MoviesModule
      ),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
