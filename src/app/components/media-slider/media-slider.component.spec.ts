import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaSliderComponent } from './media-slider.component';

describe('MediaSliderComponent', () => {
  let component: MediaSliderComponent;
  let fixture: ComponentFixture<MediaSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
