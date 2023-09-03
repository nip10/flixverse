import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, map, type Subscription } from 'rxjs';
import { CheckboxModule, type CheckboxChangeEvent } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { ChevronsDownUp, LucideAngularModule } from 'lucide-angular';
import type { QueryObserverResult } from '@tanstack/query-core';
import { TmdbService } from '@/shared/services/tmdb.service';
import type { GetMoviesResponse } from '@/shared/types/tmdb';
import { BrnCollapsibleTriggerDirective } from '@/components/ui/collapsible/brn-collapsible-trigger.directive';
import { BrnCollapsibleContentComponent } from '@/components/ui/collapsible/brn-collapsible-content.component';
import { BrnCollapsibleComponent } from '@/components/ui/collapsible/brn-collapsible.component';
import { HlmButtonDirective } from '@/components/ui/button/hlm-button.directive';
import type { MediaState } from '@/components/media-slider/media-slider.component';
import { MediaGridComponent } from '@/components/media-grid/media-grid.component';

type Range = [number, number];

interface SearchFormValues {
  genres: (number | null)[];
  releaseYear: [number, number] | null;
  runtime: [number, number] | null;
  rating: [number, number] | null;
}

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    BrnCollapsibleComponent,
    BrnCollapsibleContentComponent,
    BrnCollapsibleTriggerDirective,
    CheckboxModule,
    SliderModule,
    HlmButtonDirective,
    MediaGridComponent,
  ],
  templateUrl: './discover.component.html',
})
export class DiscoverComponent implements OnInit, OnDestroy {
  tmdbService = inject(TmdbService);
  formBuilder = inject(FormBuilder);

  currentYear = new Date().getUTCFullYear();
  chevronDownUp = ChevronsDownUp;

  movieGenres = this.tmdbService.config.genres.movie;

  private valueChangesSubscription!: Subscription;

  movies$ = this.transformMovies(this.tmdbService.discoverMovies().result$);

  private transformMovies(
    source$: Observable<QueryObserverResult<GetMoviesResponse, unknown>>
  ): Observable<MediaState> {
    return source$.pipe(
      map((response) => ({
        ...response,
        data: response.data?.results.map((movie) => ({
          id: movie.id,
          name: movie.title ?? movie.original_title ?? 'Unknown',
          rating: movie.vote_average,
          image: {
            url: movie.backdrop_path
              ? this.tmdbService.createImageUrl(
                  'backdrop',
                  movie.backdrop_path,
                  'w300'
                )
              : '',
            alt: movie.title ?? movie.original_title ?? 'Unknown',
          },
          mediaType: 'movie',
        })),
      }))
    );
  }

  onSubmit(values: Partial<SearchFormValues>) {
    console.log('DEBUG submit', values);
    const filters = {
      genres: values.genres ?? [],
      releaseYear: values.releaseYear ?? [1900, 2023],
      runtime: values.runtime ?? [0, 300],
      rating: values.rating ?? [0, 10],
    };
    this.movies$ = this.transformMovies(
      this.tmdbService.discoverMovies(undefined, filters).result$
    );
  }

  ngOnInit() {
    this.valueChangesSubscription = this.searchForm.valueChanges.subscribe(
      (values) => {
        // TODO: add types to the formbuilder and remove this assertion
        this.onSubmit(values as Partial<SearchFormValues>);
      }
    );
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
  }

  searchForm = this.formBuilder.group({
    genres: this.formBuilder.array<number>([]),
    releaseYear: this.formBuilder.control<Range>([1900, 2023]),
    runtime: this.formBuilder.control<Range>([0, 300]),
    rating: this.formBuilder.control<Range>([0, 10]),
  });

  getReleaseYearRange() {
    return this.searchForm.get('releaseYear')?.value;
  }

  getRuntimeRange() {
    return this.searchForm.get('runtime')?.value;
  }

  getRatingRange() {
    return this.searchForm.get('rating')?.value;
  }

  onGenreChange(e: CheckboxChangeEvent) {
    const genreId = e.checked[0];
    const genres: FormArray = this.searchForm.get('genres') as FormArray;
    if (genreId) {
      genres.push(new FormControl(genreId));
    } else {
      const index = genres.controls.findIndex(
        (control) => control.value === genreId
      );
      if (index >= 0) {
        genres.removeAt(index);
      }
    }
  }
}
