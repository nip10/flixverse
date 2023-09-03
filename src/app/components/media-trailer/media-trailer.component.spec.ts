import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaTrailerComponent } from './media-trailer.component';

describe('MediaTrailerComponent', () => {
  let component: MediaTrailerComponent;
  let fixture: ComponentFixture<MediaTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTrailerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
