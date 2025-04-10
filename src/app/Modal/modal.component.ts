import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { INITIAL_EVENTS, } from '../event-utils';


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
    this.calendarApi = false;

    localStorage.setItem('events', JSON.stringify(INITIAL_EVENTS));
    this.calendarApi.get;

    //Aqui os titulos ainda estão diferentes!
    console.log(" Vindo do New Event: " + this.calendarApi.title)
    console.log(" Vindo do Event to Save: " + this.eventData.title)

  }


  save() {
    // Verifica se o evento atual existe no INITIAL_EVENTS
    const eventIndex = INITIAL_EVENTS.findIndex(event => event.id === this.eventData.id);
    if (eventIndex !== -1) {
      // Atualiza o título do evento correspondente
      INITIAL_EVENTS[eventIndex].title = this.title2;
      INITIAL_EVENTS[eventIndex].allDay = this.allDay;


      console.log(INITIAL_EVENTS)
    }

 console.log( this.calendarApi.getEvents()); // Obtém todos os eventos
    // const calendarEvent = events.find((event) => event.id === this.eventData.id); // Filtra pelo ID
    // if (calendarEvent) {
    //   console.log("Atualizando evento no FullCalendar...");
    //   calendarEvent.setProp('title', this.title2); // Atualiza o título no calendário
    //   calendarEvent.setProp('allDay', this.allDay); // Atualiza o estado allDay no calendário
    // } else {
    //   console.warn("Evento não encontrado no FullCalendar para o ID:", this.eventData.id);
    // }
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