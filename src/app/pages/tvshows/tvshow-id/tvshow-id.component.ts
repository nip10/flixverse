import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { type Observable, map, switchMap } from 'rxjs';
import { LucideAngularModule, Star } from 'lucide-angular';
import type { QueryObserverResult } from '@tanstack/query-core';
import { TmdbService } from '../../../shared/services/tmdb.service';
import type { GetTvShowResponse } from '../../../shared/types/tmdb';

export interface TvshowIdData {
  name: string;
  rating?: number;
  releaseDate: string;
  runtime?: number | null;
  overview: string;
  genres: string[];
  seasons?: number;
  episodes?: number;
  image: {
    url: string;
    alt: string;
  };
}

export interface MovieState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: TvshowIdData;
}

@Component({
  selector: 'app-tvshow-id',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './tvshow-id.component.html',
})
export class TvshowIdComponent {
  tmdbService = inject(TmdbService);
  activatedRoute = inject(ActivatedRoute);

  starIcon = Star;

  tvshow$ = this.activatedRoute.paramMap.pipe(
    switchMap(params => {
      const tvshowId = Number(params.get('tvshowId'));
      return this.transformMovies(this.tmdbService.getTvShowById(tvshowId).result$);
    })
  );

  private transformMovies(source$: Observable<QueryObserverResult<GetTvShowResponse, unknown>>): Observable<MovieState> {
    return source$.pipe(
      map(response => ({
        ...response,
        data: {
          name: response.data?.name ?? response.data?.original_name ?? 'Unknown',
          rating: response.data?.vote_average,
          overview: response.data?.overview ?? 'No overview available',
          releaseDate: response.data?.first_air_date ?? 'Unknown',
          runtime: response.data?.episode_run_time[0] ?? response.data?.last_episode_to_air?.runtime,
          seasons: response.data?.number_of_seasons,
          episodes: response.data?.number_of_episodes,
          genres: response.data?.genres.map(genre => genre.name) ?? [],
          image: {
            url: response.data?.poster_path ? this.tmdbService.createImageUrl('poster', response.data?.poster_path, 'w500') : '',
            alt: response.data?.name ?? response.data?.original_name ?? 'Unknown'
          }
        }
      }))
    );
  }
}
