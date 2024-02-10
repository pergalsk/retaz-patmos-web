import { Component } from '@angular/core';
import { PanelMenuItem } from '../../components/panel-menu/panel-menu.component';
import { CalendarSignupComponent } from '../../../shared/components/calendar-signup/calendar-signup.component';
import { SelectiveContentComponent } from '../../components/selective-content/selective-content.component';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-page-year2021',
    templateUrl: './page-year2021.component.html',
    styleUrls: ['./page-year2021.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        SelectiveContentComponent,
        CalendarSignupComponent,
    ],
})
export class PageYear2021Component {
  year: string = '2021';
  overrides = {
    '2021-04-02': {
      title: 'Veľký piatok',
      highlighted: true,
    },
  };

  panelContentIndex = 0;

  panelMenuItems: PanelMenuItem[] = [
    {
      title: 'Návrat k Bohu celým srdcom',
      subtitle: 'Modlitebná téma | 17.2. - 21.2.',
    },
    {
      title: 'Služby v našom zbore',
      subtitle: 'Modlitebná téma | 22.2. - 28.2.',
    },
    {
      title: 'Misijné zameranie',
      subtitle: 'Modlitebná téma | 1.3. - 7.3.',
    },
    {
      title: 'Vykupujte čas!',
      subtitle: 'Modlitebná téma | 8.3. - 14.3.',
    },
    {
      title: 'Vrchnosti',
      subtitle: 'Modlitebná téma | 15.3. - 21.3.',
    },
    {
      title: 'Vzťahy',
      subtitle: 'Modlitebná téma | 22.3. - 28.3.',
    },
    {
      title: 'Obživenie',
      subtitle: 'Modlitebná téma | 29.3. - 2.4.',
    },
  ];

  selectPanelContent(menuItemSelectedId: number): void {
    this.panelContentIndex = menuItemSelectedId;
  }
}
