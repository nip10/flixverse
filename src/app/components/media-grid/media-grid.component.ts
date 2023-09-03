import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { Observable } from 'rxjs';
import { LucideAngularModule, Star } from 'lucide-angular';

export interface MediaState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: MediaSliderData[];
}

export interface MediaSliderData {
  id: number;
  mediaType: 'movie' | 'tv' | 'person';
  name: string;
  rating?: number;
  image: {
    url: string;
    alt: string;
  };
}

@Component({
  selector: 'app-media-grid',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './media-grid.component.html',
})
export class MediaGridComponent {
  @Input() mediaState$: Observable<MediaState> | undefined;
  starIcon = Star;
}
