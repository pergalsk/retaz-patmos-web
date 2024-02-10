import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NgxCalendarModule } from 'projects/ngx-calendar/src/lib/calendar.module';
import { PageYear2024Component } from './pages/page-year2024/page-year2024.component';
import { MainContent2024Component } from './contents/main-content2024/main-content2024.component';
import { SvgHandsSoilComponent } from './svg/svg-hands-soil/svg-hands-soil.component';

@NgModule({
    imports: [CommonModule, SharedModule, NgxCalendarModule, PageYear2024Component, MainContent2024Component, SvgHandsSoilComponent],
    exports: [PageYear2024Component],
})
export class Year2024Module {}
