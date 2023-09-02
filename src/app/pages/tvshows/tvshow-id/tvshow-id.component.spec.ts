import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TvshowIdComponent } from './tvshow-id.component';

describe('TvshowIdComponent', () => {
  let component: TvshowIdComponent;
  let fixture: ComponentFixture<TvshowIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvshowIdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvshowIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
