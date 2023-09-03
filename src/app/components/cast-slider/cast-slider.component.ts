import {
  Component,
  type ElementRef,
  Input,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Observable } from 'rxjs';
import { register } from 'swiper/element/bundle';
import { RouterModule } from '@angular/router';
register();

export interface CastState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data?: CastSliderData[];
}

export interface CastSliderData {
  id: number;
  name: string;
  character: string;
  image: {
    url: string;
    alt: string;
  };
}

@Component({
  selector: 'app-cast-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './cast-slider.component.html',
})
export class CastSliderComponent {
  @ViewChild('swiper') swiper: ElementRef | undefined;
  @Input() castState$: Observable<CastState> | undefined;
}
