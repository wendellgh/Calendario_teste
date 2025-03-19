import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  public openModal() {
    this.isVisible = true; 
    console.log("Modal aberto");
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
