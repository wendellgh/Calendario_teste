import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { INITIAL_EVENTS,  } from '../event-utils';

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
    console.log("Modal fechado");
    console.log(INITIAL_EVENTS)
  
  }


  save() {
    // Verifica se o evento atual existe no INITIAL_EVENTS
    const eventIndex = INITIAL_EVENTS.findIndex(event => event.id === this.eventData.id);
    if (eventIndex !== -1) {
      // Atualiza o título do evento correspondente
      INITIAL_EVENTS[eventIndex].title = this.title2;

      console.log(`Evento com ID ${this.eventData.id} atualizado com o título: ${this.title2}`);
    } else {
      console.warn(`Evento com ID ${this.eventData.id} não encontrado.`);
    }

    console.log(this.title2 + " dps")
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