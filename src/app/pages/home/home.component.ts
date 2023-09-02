import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type Observable, map } from 'rxjs';
import { TmdbService } from '../../shared/services/tmdb.service';
import { MediaSliderComponent, type MediaState } from '../../components/media-slider/media-slider.component';
import type { GetMoviesResponse, GetTvShowsResponse } from '../../shared/types/tmdb';
import type { QueryObserverResult } from '@tanstack/query-core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MediaSliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
          name: movie.title,
          image: {
            url: this.tmdbService.createImageUrl('backdrop', movie.backdrop_path, 'w300'),
            alt: movie.title ?? movie.original_title ?? 'Unknown'
          }
        }))
      }))
    );
  }

  private transformTvShows(source$: Observable<QueryObserverResult<GetTvShowsResponse, unknown>>): Observable<MediaState> {
    return source$.pipe(
      map(response => ({
        ...response,
        data: response.data?.results.map(tvShow => ({
          name: tvShow.name,
          image: {
            url: this.tmdbService.createImageUrl('backdrop', tvShow.backdrop_path, 'w300'),
            alt: tvShow.name ?? tvShow.original_name ?? 'Unknown'
          }
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
