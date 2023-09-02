import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieIdComponent } from './movie-id.component';

describe('MovieIdComponent', () => {
  let component: MovieIdComponent;
  let fixture: ComponentFixture<MovieIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieIdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
