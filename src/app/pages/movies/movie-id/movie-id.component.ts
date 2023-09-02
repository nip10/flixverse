import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { type Observable, map, switchMap } from 'rxjs';
import { LucideAngularModule, Star } from 'lucide-angular';
import type { QueryObserverResult } from '@tanstack/query-core';
import { TmdbService } from '../../../shared/services/tmdb.service';
import type { GetMovieResponse } from '../../../shared/types/tmdb';

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

@Component({
  selector: 'app-movie-id',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './movie-id.component.html',
})
export class MovieIdComponent {
  tmdbService = inject(TmdbService);
  activatedRoute = inject(ActivatedRoute);

  starIcon = Star;

  movie$ = this.activatedRoute.paramMap.pipe(
    switchMap(params => {
      const movieId = Number(params.get('movieId'));
      return this.transformMovies(this.tmdbService.getMovieById(movieId).result$);
    })
  );

  private transformMovies(source$: Observable<QueryObserverResult<GetMovieResponse, unknown>>): Observable<MovieState> {
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
}
