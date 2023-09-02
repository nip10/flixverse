import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../shared/services/tmdb.service';
import { NgImageSliderModule } from 'ng-image-slider';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgImageSliderModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  tmdbService = inject(TmdbService);
  movies$ = this.tmdbService.getMovies().result$;
  moviesSlider$ = this.movies$.pipe(
    map(movies =>
      movies.data?.results.map(movie => ({
        image: this.tmdbService.createImageUrl('backdrop', movie.backdrop_path, 'w300'),
        thumbImage: this.tmdbService.createImageUrl('backdrop', movie.backdrop_path, 'w300'),
        alt: movie.title || movie.original_title
      }))
    ),
  );

  // imageObject = [
  //   {
  //     image: 'assets/1.jpg',
  //     thumbImage: 'assets/1.jpg',
  //     alt: 'alt of image',
  //   },
  //   {
  //     image: 'assets/2.jpg',
  //     thumbImage: 'assets/2.jpg',
  //     alt: 'Image alt',
  //   },
  //   {
  //     image: 'assets/3.jpg',
  //     thumbImage: 'assets/3.jpg',
  //     alt: 'Image alt', //Optional: You can use this key if want to show image with alt
  //   },
  //   {
  //     image:
  //       'https://images.unsplash.com/photo-1693035647726-e8cf7467a058?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3532&q=80',
  //     thumbImage:
  //       'https://images.unsplash.com/photo-1693035647726-e8cf7467a058?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3532&q=80',
  //     alt: 'Image alt', //Optional: You can use this key if want to show image with alt
  //   },
  // ];

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
