import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CastSliderComponent } from './cast-slider.component';

describe('CastSliderComponent', () => {
  let component: CastSliderComponent;
  let fixture: ComponentFixture<CastSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CastSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
