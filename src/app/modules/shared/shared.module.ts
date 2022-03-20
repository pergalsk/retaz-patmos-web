import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CalendarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [CalendarComponent, FooterComponent],
})
export class SharedModule {}
