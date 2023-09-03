import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Observable } from 'rxjs';
import { TvshowState } from '@/pages/tvshows/tvshow-id/tvshow-id.component';
import { MovieState } from '@/pages/movies/movie-id/movie-id.component';

@Component({
  selector: 'app-media-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-wrapper.component.html',
})
export class MediaWrapperComponent {
  @Input() media$!: Observable<MovieState | TvshowState>;
}
