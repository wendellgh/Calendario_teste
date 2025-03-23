import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { INITIAL_EVENTS, createEventId } from '../event-utils';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {


  constructor() { }

  ngOnInit() {
  }


  isVisible = false;


  public openModal(selectInfo: DateSelectArg) {
    this.isVisible = true;
    const title = prompt('');
    console.log("Modal aberto");

    const calendarApi = selectInfo.view.calendar;
    calendarApi.addEvent({
      id: createEventId(),
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay

    })



    // closeModal() {
    //   this.isVisible = false;
    //   console.log("Modal fechado");
    // }

    // save() {
    //   console.log("Salvando dados");
    // }

    //   cancel() {
    //   console.log("Cancelando");
    // }

  }
}