import { Component } from '@angular/core';
import { SvgPrayKneesComponent } from '../../svg/svg-pray-knees/svg-pray-knees.component';
import { ContentBoxComponent } from '../../../shared/components/content-box/content-box.component';

@Component({
    selector: 'app-main-content2023',
    templateUrl: './main-content2023.component.html',
    styleUrls: ['./main-content2023.component.scss'],
    standalone: true,
    imports: [ContentBoxComponent, SvgPrayKneesComponent],
})
export class MainContent2023Component {}
