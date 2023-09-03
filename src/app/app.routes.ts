import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies/movies.component').then((m) => m.MoviesComponent),
    pathMatch: 'full',
  },
  {
    path: 'movies/:movieId',
    loadComponent: () =>
      import('./pages/movies/movie-id/movie-id.component').then(
        (m) => m.MovieIdComponent
      ),
  },
  {
    path: 'tvshows',
    loadComponent: () =>
      import('./pages/tvshows/tvshows.component').then(
        (m) => m.TvshowsComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'tvshows/:tvshowId',
    loadComponent: () =>
      import('./pages/tvshows/tvshow-id/tvshow-id.component').then(
        (m) => m.TvshowIdComponent
      ),
  },
];
