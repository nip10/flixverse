import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UseQuery } from '@ngneat/query';
import type { GetMoviesResponse, GetTvShowsResponse } from '../types/tmdb';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private BASE_URL = 'https://api.themoviedb.org/3'; // TMDB base URL
  private API_READ_ACCESS_TOKEN = import.meta.env.NG_APP_TMDB_API_READ_ACCESS_TOKENL; // TMDB API Read Access Token
  private http = inject(HttpClient);
  private useQuery = inject(UseQuery);

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.API_READ_ACCESS_TOKEN}`
      })
    };
  }

  getMovies() {
    return this.useQuery(['movies'], () => this.http.get<GetMoviesResponse>(`${this.BASE_URL}/discover/movie`, this.getHeaders()));
  }

  getTvShows() {
    return this.useQuery(['tvShows'], () => this.http.get<GetTvShowsResponse>(`${this.BASE_URL}/discover/tv`, this.getHeaders()));
  }
}
