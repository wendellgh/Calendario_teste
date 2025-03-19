import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import localePtBr from '@fullcalendar/core/locales/pt-br'
import { log } from 'node:console';

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
      interactionPlugin,
      timeGridPlugin,
      listPlugin
    ],
    locale: localePtBr,
    contentHeight: 500,
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'

    },


    select: this.handleDateSelect.bind(this)

  })

  handleDateSelect(arg: any) {
    console.log("Chamada da Função handleDateSelect. Aqui criar um novo componente para abrir uma janela. Seria o Modal?")
  }

}
