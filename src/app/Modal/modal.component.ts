import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { INITIAL_EVENTS, } from '../event-utils';
import { log } from 'console';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  constructor() { }

  ngOnInit() {

  }

  @Input() eventData!: any; //Posso criar uma classe e depois tipar para essa classe???
  @Input() calendarApi!: any;


  allDay: boolean = false;
  isVisible = false;
  dataInicial!: string;
  dataFinal!: string;
  title2!: string;

  @Output() envio = new EventEmitter<string>();


  public openModal() {
    this.isVisible = true;

    if (this.eventData && this.eventData.start) {
      this.dataInicial = this.eventData.start.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
      this.dataFinal = this.eventData.end.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
    }

    this.meunome();

  }

  closeModal() {
    this.isVisible = false;

    localStorage.setItem('events', JSON.stringify(INITIAL_EVENTS));

    //Aqui os titulos ainda estão diferentes!
    console.log(" Vindo do New Event: " + this.calendarApi.title)
    console.log(" Vindo do Event to Save: " + this.eventData.title)
    console.log(INITIAL_EVENTS)


  }


  save() {
    // Verifica se o evento atual existe no INITIAL_EVENTS
    const eventIndex = INITIAL_EVENTS.findIndex(event => event.id === this.eventData.id);
    if (eventIndex !== -1) {
      // Atualiza o título e o estado allDay no INITIAL_EVENTS
      INITIAL_EVENTS[eventIndex].title = this.title2;
      console.log(this.allDay)

      console.log("Evento atualizado no INITIAL_EVENTS:", INITIAL_EVENTS[eventIndex]);
    }

    // Busca o evento no FullCalendar
    const calendarEvent = this.calendarApi.getEvents().find((event: any) => event.id === this.eventData.id);
    if (calendarEvent) {
      console.log("Atualizando evento no FullCalendar...");
      calendarEvent.setProp('title', this.title2); // Atualiza o título no calendário
      calendarEvent.setProp('allDay', this.allDay)
      console.log(this.calendarApi)

      // // Converte as datas para o formato correto
      // const startDate = new Date(this.dataInicial.split('/').reverse().join('-'));
      // let endDate = new Date(this.dataFinal.split('/').reverse().join('-'));

      // // Ajusta a data de fim para eventos allDay
      // if (this.allDay) {
      //   // Incrementa 1 dia na data de fim para eventos allDay
      //   endDate.setDate(endDate.getDate() + 1);
      //   calendarEvent.setDates(startDate, endDate, { allDay: true });
      // } else {
      //   // Mantém as datas originais para eventos que não são allDay
      //   calendarEvent.setDates(startDate, endDate, { allDay: false });
      // }
    } else {
      console.warn("Evento não encontrado no FullCalendar para o ID:", this.eventData.id);
    }

    // Re-renderiza os eventos no calendário
    this.calendarApi.refetchEvents();

    // Reseta o título para vazio após salvar
    this.title2 = '';
    this.meunome();
    this.closeModal();
  }

  cancel() {
    console.log("Cancelando");
  }

  meunome() {
    this.envio.emit(this.title2)
  }

}