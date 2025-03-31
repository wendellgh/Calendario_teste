import { Component, Input,Output , EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { INITIAL_EVENTS } from '../event-utils';

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

  @Input() eventData!: any;
  @Output() onClose = new EventEmitter<string>();

  isVisible = false;
  dataInicial!: string;
  dataFinal!: string;
  title: string ='';

  public openModal() {
    this.isVisible = true;
    if (this.eventData && this.eventData.startStr) {
      this.dataInicial = this.eventData.startStr.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
      this.dataFinal = this.eventData.endStr.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
    }

    this.title = this.eventData?.title || '';
  
  }

  closeModal() {
    this.isVisible = false;
    this.onClose.emit(this.title);
    console.log("Modal fechado");
    console.log(INITIAL_EVENTS)
  }


  save() {
     
    this.closeModal();
  }

  cancel() {
    console.log("Cancelando");
  }
}