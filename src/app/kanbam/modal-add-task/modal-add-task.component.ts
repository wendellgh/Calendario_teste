import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MeuTeste } from './meu-teste';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-modal-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DragDropModule, MatCardModule,MatDividerModule],
  templateUrl: './modal-add-task.component.html',
  styleUrl: './modal-add-task.component.css'
})
export class ModalAddTaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  public adicioandoTask!: FormGroup;

  ngOnInit(): void {
    this.adicioandoTask = this.formBuilder.group({
      id: [],
      titulo: [''],
      descricao: ['']
    });
  }

  public submitForm() {
    const { id, titulo, estado, descricao} = this.adicioandoTask.value;


    this.addObjeto.push({ id, titulo, estado: 'todo', descricao })

    console.log()
    this.adicioandoTask.reset()


  }


  addObjeto: MeuTeste[] = [
    { id: 1, titulo: 'Criação do novo modelo', estado: 'todo', descricao: "Implements@WM" }
  ];

   fazendo: MeuTeste[] = [
    { id: 2, titulo: 'OKOK', estado: 'doing', descricao: "Fazendo" }
  ];



  drop(event: CdkDragDrop<MeuTeste[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log('Drop event:', event);
      } else {
        const task = event.previousContainer.data[event.previousIndex];
  
        // Atualiza o estado de acordo com o container destino
        if (event.container.id === 'todoList') task.estado = 'todo';
        else if (event.container.id === 'doingList') task.estado = 'doing';
        else if (event.container.id === 'doneList') task.estado = 'done';
  
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }

}

/*
 id: number;
    title: string;
    state: 'todo' | 'doing' | 'done';
    descricao: string;
*/ 