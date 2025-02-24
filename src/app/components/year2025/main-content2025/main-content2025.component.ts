import { Component } from '@angular/core';
import { ContentBoxComponent } from '@components/content-box/content-box.component';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { Quote, QuotesComponent } from '@components/quotes/quotes.component';
// import { SvgHandsSoilComponent } from '../svg-hands-soil/svg-hands-soil.component';

@Component({
  selector: 'app-main-content2025',
  templateUrl: './main-content2025.component.html',
  styleUrls: ['./main-content2025.component.scss'],
  standalone: true,
  imports: [ContentBoxComponent, /*SvgHandsSoilComponent,*/ NgbCarousel, NgbSlide, QuotesComponent],
})
export class MainContent2025Component {
  quotes: Quote[] = [
    {
      text:
        'Modlitba je dosahovanie neviditeľného; pôst je opustenie všetkého viditeľného a dočasného. Pôst pomáha vyjadriť, ' +
        'prehĺbiť a potvrdiť rozhodnutie, že sme pripravení obetovať čokoľvek, dokonca aj seba samých, aby sme dosiahli to, ' +
        'o čo sa usilujeme pre Božie kráľovstvo.',
      caption: 'Andrew Murray',
    },
    {
      text: 'Pôst ťa pripravuje na nové pomazanie.',
      caption: 'Jentezen Franklin',
    },
    {
      text:
        'Cieľom pôstu je do určitej miery uvoľniť väzby, ktoré nás viažu k svetu hmotných vecí a k celému nášmu okoliu, ' +
        'aby sme mohli všetky svoje duchovné sily sústrediť na neviditeľné a večné veci.',
      caption: 'Ole Hallesby',
    },
    {
      text:
        'Ak neprežívame silné túžby po zjavení Božej slávy, nie je to preto, že sme sa už poriadne napili a sme uspokojení. ' +
        'Je to preto, že sme sa veľmi dlho sýtili pri stole sveta. Naša duša je preplnená malými vecami, až nezostalo žiadne ' +
        'miesto na tie veľké. Ak sme preplnení tým, čo ponúka svet, potom by pôst mohol vyjadriť alebo dokonca rozmnožiť ' +
        'náš hlad po Bohu.',
      caption: 'John Piper',
    },
  ];
}
