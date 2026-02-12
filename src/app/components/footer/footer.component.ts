import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="text-center">
      <div class="logo">
        <a href="https://patmos.sk">
          <!--<img
            class="footer-logo hide-dark"
            alt="CZ ECAV Prešov"
            width="200"
            height="75"
            src="./assets/logo-ecavpo-filled-1x.webp"
            srcset="./assets/logo-ecavpo-filled-2x.webp 2x"
          />-->
          <img
            class="footer-logo hide-light"
            alt="CZ ECAV Prešov"
            width="150"
            height="56"
            src="./assets/logo-ecavpo-wired-1x.webp"
            srcset="./assets/logo-ecavpo-wired-2x.webp 2x"
          />
        </a>
      </div>
      <div class="info">
        © <a routerLink="/">{{ currentYear }}</a
        >&nbsp;<a href="https://patmos.sk"
          >Cirkevný zbor Evanjelickej cirkvi augsburského vyznania na&nbsp;Slovensku Prešov</a
        >
        <!-- <small>
          | <a routerLink="/2024">2024</a> | <a routerLink="/2023">2023</a> |
          <a routerLink="/2022">2022</a> | <a routerLink="/2021">2021</a></small
        >-->
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
