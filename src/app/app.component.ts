import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
import localePtBr from '@fullcalendar/core/locales/pt-br'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FullCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Calendario_teste';
  calendarVisible = true;
  calendarOptions = signal<CalendarOptions>({
    initialView: 'dayGridMonth',
    plugins: [
      dayGridPlugin,
      interactionPlugin
    ],
    locale: localePtBr,
    contentHeight: 500,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right:'timeGridWeek, timeGridDay'
      
    },

  })

  handleDateClick() {
    alert('date click! ')
  }

}
