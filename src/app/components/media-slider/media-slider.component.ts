import {
  Component,
  type ElementRef,
  Input,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { Observable } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { LucideAngularModule, Star } from 'lucide-angular';
register();

export interface MediaState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: MediaSliderData[];
}

export interface MediaSliderData {
  id: number;
  mediaType: 'movies' | 'tvshows';
  name: string;
  rating: number;
  image: {
    url: string;
    alt: string;
  };
}

@Component({
  selector: 'app-media-slider',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './media-slider.component.html',
})
export class MediaSliderComponent {
  @ViewChild('swiper') swiper: ElementRef | undefined;
  @Input() mediaState$: Observable<MediaState> | undefined;
  starIcon = Star;
}
