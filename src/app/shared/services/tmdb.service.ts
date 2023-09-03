import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UseQuery } from '@ngneat/query';
import type {
  Config,
  GetMovieCreditsResponse,
  GetMovieResponse,
  GetMoviesResponse,
  GetTvShowCreditsResponse,
  GetTvShowResponse,
  GetTvShowsResponse,
  GetVideosResponse,
  ImageTypeSizes,
} from '@/shared/types/tmdb';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly BASE_URL = 'https://api.themoviedb.org/3';
  private readonly API_READ_ACCESS_TOKEN = import.meta.env
    .NG_APP_TMDB_API_READ_ACCESS_TOKEN;
  private readonly config: Config = {
    images: {
      base_url: 'http://image.tmdb.org/t/p/',
      secure_base_url: 'https://image.tmdb.org/t/p/',
      backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
      logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
      poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
      profile_sizes: ['w45', 'w185', 'h632', 'original'],
      still_sizes: ['w92', 'w185', 'w300', 'original'],
    },
    change_keys: [
      'adult',
      'air_date',
      'also_known_as',
      'alternative_titles',
      'biography',
      'birthday',
      'budget',
      'cast',
      'certifications',
      'character_names',
      'created_by',
      'crew',
      'deathday',
      'episode',
      'episode_number',
      'episode_run_time',
      'freebase_id',
      'freebase_mid',
      'general',
      'genres',
      'guest_stars',
      'homepage',
      'images',
      'imdb_id',
      'languages',
      'name',
      'network',
      'origin_country',
      'original_name',
      'original_title',
      'overview',
      'parts',
      'place_of_birth',
      'plot_keywords',
      'production_code',
      'production_companies',
      'production_countries',
      'releases',
      'revenue',
      'runtime',
      'season',
      'season_number',
      'season_regular',
      'spoken_languages',
      'status',
      'tagline',
      'title',
      'translations',
      'tvdb_id',
      'tvrage_id',
      'type',
      'video',
      'videos',
    ],
  };
  private http = inject(HttpClient);
  private useQuery = inject(UseQuery);

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.API_READ_ACCESS_TOKEN}`,
      }),
    };
  }

  createImageUrl<T extends keyof ImageTypeSizes>(
    type: T,
    path: string,
    size: ImageTypeSizes[T]
  ): string {
    return `${this.config.images.secure_base_url}${size}${path}`;
  }

  createVideoUrl(key: string): string {
    return `https://www.youtube.com/embed/${key}`;
  }

  getMovies() {
    return this.useQuery(['movies'], () =>
      this.http.get<GetMoviesResponse>(
        `${this.BASE_URL}/discover/movie`,
        this.getHeaders()
      )
    );
  }

  getMovieById(id: number) {
    return this.useQuery(['movie', id], () =>
      this.http.get<GetMovieResponse>(
        `${this.BASE_URL}/movie/${id}`,
        this.getHeaders()
      )
    );
  }

  getMovieCreditsById(id: number) {
    return this.useQuery(['movieCredits', id], () =>
      this.http.get<GetMovieCreditsResponse>(
        `${this.BASE_URL}/movie/${id}/credits`,
        this.getHeaders()
      )
    );
  }

  getMovieRecommendationsById(id: number) {
    return this.useQuery(['movieRecommendations', id], () =>
      this.http.get<GetMoviesResponse>(
        `${this.BASE_URL}/movie/${id}/recommendations`,
        this.getHeaders()
      )
    );
  }

  getMovieVideosById(id: number) {
    return this.useQuery(['movieVideos', id], () => {
      return this.http.get<GetVideosResponse>(
        `${this.BASE_URL}/movie/${id}/videos`,
        this.getHeaders()
      );
    });
  }

  getTvShows() {
    return this.useQuery(['tvShows'], () =>
      this.http.get<GetTvShowsResponse>(
        `${this.BASE_URL}/discover/tv`,
        this.getHeaders()
      )
    );
  }

  getTvShowById(id: number) {
    return this.useQuery(['tvShow', id], () =>
      this.http.get<GetTvShowResponse>(
        `${this.BASE_URL}/tv/${id}`,
        this.getHeaders()
      )
    );
  }

  getTvShowCreditsById(id: number) {
    return this.useQuery(['tvShowCredits', id], () =>
      this.http.get<GetTvShowCreditsResponse>(
        `${this.BASE_URL}/tv/${id}/aggregate_credits`,
        this.getHeaders()
      )
    );
  }

  getTvShowRecommendationsById(id: number) {
    return this.useQuery(['tvShowRecommendations', id], () =>
      this.http.get<GetTvShowsResponse>(
        `${this.BASE_URL}/tv/${id}/recommendations`,
        this.getHeaders()
      )
    );
  }

  getTvShowVideosById(id: number) {
    return this.useQuery(['tvShowVideos', id], () => {
      return this.http.get<GetVideosResponse>(
        `${this.BASE_URL}/tv/${id}/videos`,
        this.getHeaders()
      );
    });
  }
}
