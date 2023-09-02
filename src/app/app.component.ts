import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'app-root',
  template: '<app-header /><div class="flex flex-col flex-1 gap-2 max-w-7xl"><router-outlet /></div><app-footer />',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { class: 'min-h-screen flex flex-col' }
})
export class AppComponent {
  title = 'flixverse';
}
