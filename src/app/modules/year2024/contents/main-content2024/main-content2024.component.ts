import { Component } from '@angular/core';
import { SvgHandsSoilComponent } from '../../svg/svg-hands-soil/svg-hands-soil.component';
import { ContentBoxComponent } from '../../../shared/components/content-box/content-box.component';

@Component({
    selector: 'app-main-content2024',
    templateUrl: './main-content2024.component.html',
    styleUrls: ['./main-content2024.component.scss'],
    standalone: true,
    imports: [ContentBoxComponent, SvgHandsSoilComponent]
})
export class MainContent2024Component {

}
