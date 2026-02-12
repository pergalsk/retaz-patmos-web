import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-footer-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  template: '<router-outlet /><app-footer />',
})
export class FooterLayoutComponent {}
