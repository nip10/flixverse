import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ChevronsDownUp, LucideAngularModule, Search } from 'lucide-angular';
import type { QueryObserverResult } from '@tanstack/query-core';
import { TmdbService } from '@/shared/services/tmdb.service';
import type {
  GetMoviesResponse,
  GetMultiSearchResponse,
} from '@/shared/types/tmdb';
import { HlmInputDirective } from '@/components/ui/input/hlm-input.directive';
import { HlmButtonDirective } from '@/components/ui/button/hlm-button.directive';
import { MediaState } from '@/components/media-grid/media-grid.component';
import { MediaGridComponent } from '@/components/media-grid/media-grid.component';

interface SearchFormValues {
  searchTerm: string | null;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    HlmInputDirective,
    HlmButtonDirective,
    MediaGridComponent,
  ],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  tmdbService = inject(TmdbService);
  formBuilder = inject(FormBuilder);

  searchIcon = Search;

  items$?: Observable<MediaState>;

  private transformMultiItem(
    source$: Observable<QueryObserverResult<GetMultiSearchResponse, unknown>>
  ): Observable<MediaState> {
    return source$.pipe(
      map((response) => ({
        ...response,
        data: response.data?.results.map((item) => ({
          id: item.id,
          name:
            item.name ??
            item.title ??
            item.original_name ??
            item.original_title ??
            'Unknown',
          rating: item.vote_average,
          image: {
            url: item.backdrop_path
              ? this.tmdbService.createImageUrl(
                  'backdrop',
                  item.backdrop_path,
                  'w300'
                )
              : '',
            alt: item.title ?? item.original_title ?? 'Unknown',
          },
          mediaType: item.media_type,
        })),
      }))
    );
  }

  onSubmit(values: Partial<SearchFormValues>) {
    console.log('DEBUG submit', values);
    if (!values.searchTerm) {
      return;
    }
    this.items$ = this.transformMultiItem(
      this.tmdbService.getMultiSearch(values.searchTerm).result$
    );
  }

  searchForm = this.formBuilder.group({
    searchTerm: [''],
  });
}
