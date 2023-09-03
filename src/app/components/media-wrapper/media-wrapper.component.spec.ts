import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaWrapperComponent } from './media-wrapper.component';

describe('MediaWrapperComponent', () => {
  let component: MediaWrapperComponent;
  let fixture: ComponentFixture<MediaWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
