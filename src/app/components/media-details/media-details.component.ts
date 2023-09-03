import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star } from 'lucide-angular';
import type { Observable } from 'rxjs';
import { MediaTrailerComponent } from '@/components/media-trailer/media-trailer.component';
import type { VideosState } from '@/pages/tvshows/tvshow-id/tvshow-id.component';

@Component({
  selector: 'app-media-details',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MediaTrailerComponent],
  templateUrl: './media-details.component.html',
})
export class MediaDetailsComponent {
  @Input() name!: string;
  @Input() rating?: number | null;
  @Input() genres!: string[];
  @Input() overview!: string;
  @Input() releaseDate!: string;
  @Input() runtime?: number | null;
  @Input() seasons?: number;
  @Input() episodes?: number;
  @Input() videoMedia$!: Observable<VideosState>;
  starIcon = Star;

  get genreText() {
    return this.genres?.join(', ');
  }
}
