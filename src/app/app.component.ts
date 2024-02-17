import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribable } from 'rxjs';
import { ColorSchemeService } from './modules/color-scheme/color-scheme.service';
import { Scheme, UserScheme } from './modules/color-scheme/color-scheme.types';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  template: `
    <main class="container narrow">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private colorSchemeService: ColorSchemeService) {}

  systemSchemeChange$: Unsubscribable;
  userSchemeChange$: Unsubscribable;
  schemeChange$: Unsubscribable;

  ngOnInit(): void {
    this.systemSchemeChange$ = this.colorSchemeService.systemSchemeChange.subscribe(
      (selectedScheme: Scheme) => {
        console.log('System scheme preference changed to:', selectedScheme);
      },
    );
    this.userSchemeChange$ = this.colorSchemeService.userSchemeChange.subscribe(
      (selectedScheme: UserScheme) => {
        console.log('User scheme preference changed to:', selectedScheme);
      },
    );
    this.schemeChange$ = this.colorSchemeService.schemeChange.subscribe(
      (selectedScheme: Scheme) => {
        console.log('Scheme preference changed to:', selectedScheme);
      },
    );
  }

  ngOnDestroy(): void {
    this.systemSchemeChange$.unsubscribe();
    this.userSchemeChange$.unsubscribe();
    this.schemeChange$.unsubscribe();
  }
}
