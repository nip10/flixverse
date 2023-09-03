import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clapperboard, LucideAngularModule } from 'lucide-angular';
import type { Observable } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import type { VideosState } from '../../pages/movies/movie-id/movie-id.component';
import { HlmButtonDirective } from '../button/hlm-button.directive';

@Component({
  selector: 'app-media-trailer',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    DialogModule,
    HlmButtonDirective,
  ],
  templateUrl: './media-trailer.component.html',
})
export class MediaTrailerComponent {
  @Input() videoMedia$!: Observable<VideosState>;

  clapperboardIcon = Clapperboard;
  isModalVisible = false;

  showDialog() {
    this.isModalVisible = true;
  }

  closeDialog() {
    this.isModalVisible = false;
  }
}
