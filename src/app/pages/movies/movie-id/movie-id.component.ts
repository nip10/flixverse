import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { type Observable, map, switchMap } from 'rxjs';
import { LucideAngularModule, Star } from 'lucide-angular';
import type { QueryObserverResult } from '@tanstack/query-core';
import { register } from 'swiper/element/bundle';
import { TmdbService } from '../../../shared/services/tmdb.service';
import type { Cast, GetMovieCreditsResponse, GetMovieResponse, GetMoviesResponse } from '../../../shared/types/tmdb';
import { MediaSliderComponent, MediaState } from '../../../components/media-slider/media-slider.component';
register();

export interface MovieIdData {
  name: string;
  rating?: number;
  releaseDate: string;
  runtime?: number | null;
  overview: string;
  genres: string[];
  image: {
    url: string;
    alt: string;
  };
}

export interface MovieState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: MovieIdData;
}

export interface MovieCreditsData {
  cast: Pick<Cast, 'id' | 'name' | 'character' | 'profile_path'>[];
}

export interface MovieCreditsState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: MovieCreditsData;
}

@Component({
  selector: 'app-movie-id',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, MediaSliderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './movie-id.component.html',
})
export class MovieIdComponent {
  tmdbService = inject(TmdbService);
  activatedRoute = inject(ActivatedRoute);

  starIcon = Star;

  movie$ = this.activatedRoute.paramMap.pipe(
    switchMap(params => {
      const movieId = Number(params.get('movieId'));
      return this.transformMovie(this.tmdbService.getMovieById(movieId).result$);
    })
  );

  private transformMovie(source$: Observable<QueryObserverResult<GetMovieResponse, unknown>>): Observable<MovieState> {
    return source$.pipe(
      map(response => ({
        ...response,
        data: {
          name: response.data?.title ?? response.data?.original_title ?? 'Unknown',
          rating: response.data?.vote_average,
          overview: response.data?.overview ?? 'No overview available',
          releaseDate: response.data?.release_date ?? 'Unknown',
          runtime: response.data?.runtime,
          genres: response.data?.genres.map(genre => genre.name) ?? [],
          image: {
            url: response.data?.poster_path ? this.tmdbService.createImageUrl('poster', response.data?.poster_path, 'w500') : '',
            alt: response.data?.title ?? response.data?.original_title ?? 'Unknown'
          }
        }
      }))
      );
    }

    movieCredits$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const movieId = Number(params.get('movieId'));
        return this.transformMovieCredits(this.tmdbService.getMovieCreditsById(movieId).result$);
      })
    );

    private transformMovieCredits(source$: Observable<QueryObserverResult<GetMovieCreditsResponse, unknown>>): Observable<MovieCreditsState> {
      return source$.pipe(
        map(response => ({
          ...response,
          data: {
            cast: response.data?.cast.map(cast => ({
              id: cast.id,
              name: cast.name,
              character: cast.character,
              profile_path: cast.profile_path ? this.tmdbService.createImageUrl('profile_sizes', cast.profile_path, 'w185') : ''
            })) ?? []
          }
        }))
      );
    }

    movieRecommendations$ = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const movieId = Number(params.get('movieId'));
        return this.transformMovies(this.tmdbService.getMovieRecommendationsById(movieId).result$);
      }
    ));

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
}
