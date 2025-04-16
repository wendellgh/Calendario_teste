import { Component, signal, ViewChild, viewChild, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import localePtBr from '@fullcalendar/core/locales/pt-br'

import { ModalComponent } from './Modal/modal.component';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { EventosService, Evento } from './evento.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FullCalendarModule, ModalComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  @ViewChild(ModalComponent) modalComponent!: ModalComponent;

  constructor(private changeDetector: ChangeDetectorRef, private eventosService: EventosService) { }
   eventos: Evento[] = []
   TEST_EVT: EventInput[] = [];

  ngOnInit() {
    this.eventosService.getEventos().subscribe(data => {
      this.eventos = data;
      console.log('Eventos carregados:', this.eventos);
    });
  }

  
  eventsList = INITIAL_EVENTS;

  title = 'Calendario_teste';
  calendarVisible = true;
  nomeRecebido: string = "";


  currentEvents = signal<EventApi[]>([]);
  eventsPromise = Promise<EventInput[]>;

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
    events: this.TEST_EVT,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventChange(arg) {

    },


  })

  handleDateSelect(selectInfo: DateSelectArg) {

    const calendarApi = selectInfo.view.calendar;

    const newEvent = calendarApi.addEvent({
      id: createEventId(),
      title: this.nomeRecebido || '',
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay
    })

    const eventToSave = {
      id: newEvent?.id || '',
      title: newEvent?.title || this.nomeRecebido,
      start: newEvent?.startStr,
      end: newEvent?.endStr,
      allDay: newEvent?.allDay
    };

    calendarApi.refetchEvents()
    // INITIAL_EVENTS.push(eventToSave);
    this.TEST_EVT.push(eventToSave);
    this.modalComponent.eventData = eventToSave;
    this.modalComponent.calendarApi = calendarApi;

    this.modalComponent.openModal();
    //Ajustar para só salvar o evento ao final, acho que ajustando o event.click;

  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      console.log(clickInfo.event.id)
      clickInfo.event.remove();
    }
  }

  recebedofilho(nome: string) {
    this.nomeRecebido = nome;
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();

  }


}
