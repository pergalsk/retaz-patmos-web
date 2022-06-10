import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColorSchemeService, Scheme } from './modules/color-scheme/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private colorSchemeService: ColorSchemeService) {}

  systemSchemeChange$;
  userSchemeChange$;
  schemeChange$;

  ngOnInit(): void {
    this.systemSchemeChange$ = this.colorSchemeService.systemSchemeChange.subscribe(
      (selectedScheme: Scheme) => {
        console.log('System scheme preference changed to:', selectedScheme);
      }
    );
    this.userSchemeChange$ = this.colorSchemeService.userSchemeChange.subscribe(
      (selectedScheme: Scheme) => {
        console.log('User scheme preference changed to:', selectedScheme);
      }
    );
    this.schemeChange$ = this.colorSchemeService.schemeChange.subscribe(
      (selectedScheme: Scheme) => {
        console.log('Scheme preference changed to:', selectedScheme);
      }
    );
  }

  ngOnDestroy(): void {
    this.systemSchemeChange$.unsubscribe();
    this.userSchemeChange$.unsubscribe();
    this.schemeChange$.unsubscribe();
  }
}
