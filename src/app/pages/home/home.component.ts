import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../shared/services/tmdb.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  movies$ = this.todosService.getMovies().result$;

  constructor(private todosService: TmdbService) {}

  // OLD
  // movies: Movie[] = [];
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
