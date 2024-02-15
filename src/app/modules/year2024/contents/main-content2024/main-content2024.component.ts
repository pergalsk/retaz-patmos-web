import { Component } from '@angular/core';
import { SvgHandsSoilComponent } from '../../svg/svg-hands-soil/svg-hands-soil.component';
import { ContentBoxComponent } from '@shared/components/content-box/content-box.component';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-content2024',
  templateUrl: './main-content2024.component.html',
  styleUrls: ['./main-content2024.component.scss'],
  standalone: true,
  imports: [ContentBoxComponent, SvgHandsSoilComponent, NgbCarousel, NgbSlide],
})
export class MainContent2024Component {}
