import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

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

  isVisible = false;
  dataInicial!: string;
  dataFinal!: string;


  transformData() {

  }



  public openModal() {
    this.isVisible = true;
    if (this.eventData && this.eventData.startStr) {
      this.dataInicial = this.eventData.startStr.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
      this.dataFinal = this.eventData.endStr.replace(/^(\d{4})-(\d{2})-(\d{2})$/, '$3/$2/$1');
    }
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