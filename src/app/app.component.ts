import { Component, signal, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import localePtBr from '@fullcalendar/core/locales/pt-br'

import { ModalComponent } from './Modal/modal.component';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FullCalendarModule, ModalComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  events = INITIAL_EVENTS;

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

  handleDateSelect(selectInfo: DateSelectArg) {
    if (this.modalComponent) {
      const title1 = 'WEndelllll';
      const calendarApi = selectInfo.view.calendar;

      const newEvent = calendarApi.addEvent({
        id: createEventId(),
        title: title1,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })

      const eventToSave = {
        id: newEvent?.id || '',
        title: newEvent?.title || 'Novo Evento',
        start: newEvent?.startStr,
        end: newEvent?.endStr,
        allDay: newEvent?.allDay
      };

      INITIAL_EVENTS.push(eventToSave);

      // Salva o array atualizado no localStorage
      localStorage.setItem('events', JSON.stringify(INITIAL_EVENTS));

      console.log(typeof(eventToSave))
      console.log(typeof(newEvent))


      this.modalComponent.eventData = newEvent;

      this.modalComponent.openModal();

    } else {
      console.warn("ModalComponent não foi encontrado")
    }

  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
}
