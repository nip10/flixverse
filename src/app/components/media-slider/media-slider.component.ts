import { Component, type ElementRef, Input, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Observable } from 'rxjs';
import { register } from 'swiper/element/bundle';
register();

export interface MediaState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: MediaSliderData[];
}

export interface MediaSliderData {
  name: string;
  image: {
    url: string;
    alt: string;
  };
}


@Component({
  selector: 'app-media-slider',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './media-slider.component.html',
})
export class MediaSliderComponent {
  @ViewChild('swiper') swiper: ElementRef | undefined;
  @Input() mediaState$: Observable<MediaState> | undefined;
}
