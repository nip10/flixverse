import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieIdComponent } from './pages/movies/movie-id/movie-id.component';
import { TvshowsComponent } from './pages/tvshows/tvshows.component';
import { TvshowIdComponent } from './pages/tvshows/tvshow-id/tvshow-id.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
    pathMatch: 'full',
  },
  {
    path: 'movies/:movieId',
    component: MovieIdComponent,
  },
  {
    path: 'tvshows',
    component: TvshowsComponent,
    pathMatch: 'full',
  },
  {
    path: 'tvshows/:tvshowId',
    component: TvshowIdComponent,
  },
];
