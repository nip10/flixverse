import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type Observable, map } from 'rxjs';
import type { QueryObserverResult } from '@tanstack/query-core';
import { MediaSliderComponent, type MediaState } from '../../components/media-slider/media-slider.component';
import { TmdbService } from '../../shared/services/tmdb.service';
import type { GetMoviesResponse, GetTvShowsResponse } from '../../shared/types/tmdb';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MediaSliderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  tmdbService = inject(TmdbService);
  movies$ = this.transformMovies(this.tmdbService.getMovies().result$);
  tvShows$ = this.transformTvShows(this.tmdbService.getTvShows().result$);

  private transformMovies(source$: Observable<QueryObserverResult<GetMoviesResponse, unknown>>): Observable<MediaState> {
    return source$.pipe(
      map(response => ({
        ...response,
        data: response.data?.results.map(movie => ({
          id: movie.id,
          name: movie.title ?? movie.original_title ?? 'Unknown',
          rating: movie.vote_average,
          image: {
            url: movie.backdrop_path ? this.tmdbService.createImageUrl('backdrop', movie.backdrop_path, 'w300') : '',
            alt: movie.title ?? movie.original_title ?? 'Unknown'
          },
          mediaType: 'movies'
        }))
      }))
    );
  }

  private transformTvShows(source$: Observable<QueryObserverResult<GetTvShowsResponse, unknown>>): Observable<MediaState> {
    return source$.pipe(
      map(response => ({
        ...response,
        data: response.data?.results.map(tvShow => ({
          id: tvShow.id,
          name: tvShow.name ?? tvShow.original_name ?? 'Unknown',
          rating: tvShow.vote_average,
          image: {
            url: this.tmdbService.createImageUrl('backdrop', tvShow.backdrop_path, 'w300'),
            alt: tvShow.name ?? tvShow.original_name ?? 'Unknown'
          },
          mediaType: 'tvshows'
        }))
      }))
    );
  }

  // OLD
  // movies: Movie[] = [];
  //
  // constructor(private readonly tmdbService: TmdbService) {}
  //
  // ngOnInit(): void {
  //   this.tmdbService.getMovies().result$.subscribe((movies) => {
  //     this.movies = movies.data?.results ?? [];
  //   });
  //   this.tmdbService.getTvShows().result$.subscribe((tvShows) => {
  //     this.tvShows = tvShows.data?.results ?? [];
  //   });
  // }
}
