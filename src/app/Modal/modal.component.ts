import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { INITIAL_EVENTS, } from '../event-utils';

import { EventosService} from '../evento.service';


@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  constructor(private eventosService: EventosService) { }

  ngOnInit() {

  }

  @Input() eventData!: any; //Posso criar uma classe e depois tipar para essa classe???
  @Input() calendarApi!: any;


  allDay: boolean = false;
  isVisible = false;
  dataInicial!: string;
  dataFinal!: string;
  title2!: string;
  e_teste!:any;

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
  }


  save() {
    // Verifica se o evento atual existe no INITIAL_EVENTS
    const eventIndex = INITIAL_EVENTS.findIndex(event => event.id === this.eventData.id);
    if (eventIndex !== -1) {
      // Atualiza o título e o estado allDay no INITIAL_EVENTS
      INITIAL_EVENTS[eventIndex].title = this.title2;
    }

    // Busca o evento no FullCalendar
    const calendarEvent = this.calendarApi.getEvents().find((event: any) => event.id === this.eventData.id);
    if (calendarEvent) {
      calendarEvent.setProp('title', this.title2);
      calendarEvent.setProp('allDay', this.allDay);

    } else {
      console.warn("Evento não encontrado no FullCalendar para o ID:", this.eventData.id);
    }

    
    this.eventosService.addEventos(calendarEvent).subscribe((events => {this.e_teste.push(events)}));
    
    
    
    this.title2 = '';
    this.meunome();
    this.closeModal();
    
    this.calendarApi.refetchEvents();
  }

  cancel() {
    console.log("Cancelando");
  }

  meunome() {
    this.envio.emit(this.title2)
  }

}