import { Component, Input } from '@angular/core';
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

  @Input() Teste!: any

  isVisible = false;


  public openModal() {
    this.isVisible = true;

    console.log("Modal aberto");
    console.log(this.Teste);

  }

  closeModal() {
    this.isVisible = false;
    console.log("Modal fechado");
  }

  save() {
    console.log("Salvando dados");
  }

  cancel() {
    console.log("Cancelando");
  }
}