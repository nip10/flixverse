import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'movie',
    loadComponent: () =>
      import('./pages/movies/movies.component').then((m) => m.MoviesComponent),
    pathMatch: 'full',
  },
  {
    path: 'movie/:movieId',
    loadComponent: () =>
      import('./pages/movies/movie-id/movie-id.component').then(
        (m) => m.MovieIdComponent
      ),
  },
  {
    path: 'tv',
    loadComponent: () =>
      import('./pages/tvshows/tvshows.component').then(
        (m) => m.TvshowsComponent
      ),
    pathMatch: 'full',
  },
  {
    path: 'tv/:tvshowId',
    loadComponent: () =>
      import('./pages/tvshows/tvshow-id/tvshow-id.component').then(
        (m) => m.TvshowIdComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
  },
  {
    path: 'discover',
    loadComponent: () =>
      import('./pages/discover/discover.component').then(
        (m) => m.DiscoverComponent
      ),
  },
];
