import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { type Observable, map, switchMap } from 'rxjs';
import type { QueryObserverResult } from '@tanstack/query-core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TmdbService } from '../../../shared/services/tmdb.service';
import type {
  GetTvShowCreditsResponse,
  GetTvShowResponse,
  GetTvShowsResponse,
  GetVideosResponse,
  TvShowCast,
} from '../../../shared/types/tmdb';
import {
  MediaSliderComponent,
  type MediaState,
} from '../../../components/media-slider/media-slider.component';
import {
  CastSliderComponent,
  type CastState,
} from '../../../components/cast-slider/cast-slider.component';
import { MediaWrapperComponent } from '../../../components/media-wrapper/media-wrapper.component';
import { MediaDetailsComponent } from '../../../components/media-details/media-details.component';

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

export interface TvshowState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: TvshowIdData;
}

export interface TvshowCreditsData {
  cast: (Pick<TvShowCast, 'id' | 'name' | 'profile_path'> & {
    character: string;
  })[];
}

export interface TvshowCreditsState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: TvshowCreditsData;
}

export interface VideosData {
  url: SafeResourceUrl | null;
}

export interface VideosState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: VideosData;
}

@Component({
  selector: 'app-tvshow-id',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MediaWrapperComponent,
    MediaDetailsComponent,
    CastSliderComponent,
    MediaSliderComponent,
  ],
  templateUrl: './tvshow-id.component.html',
})
export class TvshowIdComponent {
  tmdbService = inject(TmdbService);
  activatedRoute = inject(ActivatedRoute);
  sanitizer = inject(DomSanitizer);

  tvshow$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const tvshowId = Number(params.get('tvshowId'));
      return this.transformTvshow(
        this.tmdbService.getTvShowById(tvshowId).result$
      );
    })
  );

  private transformTvshow(
    source$: Observable<QueryObserverResult<GetTvShowResponse, unknown>>
  ): Observable<TvshowState> {
    return source$.pipe(
      map((response) => ({
        ...response,
        data: {
          name:
            response.data?.name ?? response.data?.original_name ?? 'Unknown',
          rating: response.data?.vote_average,
          overview: response.data?.overview ?? 'No overview available',
          releaseDate: response.data?.first_air_date ?? 'Unknown',
          runtime:
            response.data?.episode_run_time[0] ??
            response.data?.last_episode_to_air?.runtime,
          seasons: response.data?.number_of_seasons,
          episodes: response.data?.number_of_episodes,
          genres: response.data?.genres.map((genre) => genre.name) ?? [],
          image: {
            url: response.data?.poster_path
              ? this.tmdbService.createImageUrl(
                  'poster',
                  response.data?.poster_path,
                  'w500'
                )
              : '',
            alt:
              response.data?.name ?? response.data?.original_name ?? 'Unknown',
          },
        },
      }))
    );
  }

  tvshowCredits$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const tvshowId = Number(params.get('tvshowId'));
      return this.transformTvshowCredits(
        this.tmdbService.getTvShowCreditsById(tvshowId).result$
      );
    })
  );

  private transformTvshowCredits(
    source$: Observable<QueryObserverResult<GetTvShowCreditsResponse, unknown>>
  ): Observable<CastState> {
    return source$.pipe(
      map((response) => ({
        ...response,
        data:
          response.data?.cast.map((cast) => ({
            id: cast.id,
            name: cast.name,
            character: cast.roles[0].character,
            image: {
              url: cast.profile_path
                ? this.tmdbService.createImageUrl(
                    'profile_sizes',
                    cast.profile_path,
                    'w185'
                  )
                : '',
              alt: cast.name,
            },
          })) ?? [],
      }))
    );
  }

  tvshowRecommendations$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const tvshowId = Number(params.get('tvshowId'));
      return this.transformTvShows(
        this.tmdbService.getTvShowRecommendationsById(tvshowId).result$
      );
    })
  );

  private transformTvShows(
    source$: Observable<QueryObserverResult<GetTvShowsResponse, unknown>>
  ): Observable<MediaState> {
    return source$.pipe(
      map((response) => ({
        ...response,
        data: response.data?.results.map((tvShow) => ({
          id: tvShow.id,
          name: tvShow.name ?? tvShow.original_name ?? 'Unknown',
          rating: tvShow.vote_average,
          image: {
            url: this.tmdbService.createImageUrl(
              'backdrop',
              tvShow.backdrop_path,
              'w300'
            ),
            alt: tvShow.name ?? tvShow.original_name ?? 'Unknown',
          },
          mediaType: 'tvshows',
        })),
      }))
    );
  }

  tvshowVideos$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const tvshowId = Number(params.get('tvshowId'));
      return this.transformVideos(
        this.tmdbService.getTvShowVideosById(tvshowId).result$
      );
    })
  );

  private transformVideos(
    source$: Observable<QueryObserverResult<GetVideosResponse, unknown>>
  ): Observable<VideosState> {
    return source$.pipe(
      map((response) => {
        const trailer = response.data?.results.find(
          (video) => video.type === 'Trailer'
        );
        let trailerUrl = null;
        if (trailer) {
          trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.tmdbService.createVideoUrl(trailer.key)
          );
        }
        return {
          ...response,
          data: {
            url: trailerUrl,
          },
        };
      })
    );
  }
}
