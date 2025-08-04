import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgxResourceTimelineModule } from 'ngx-resource-timeline';

import { Item, Period, Section, Events, NgxResourceTimelineService } from 'ngx-resource-timeline';
import moment from 'moment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskEstado } from './task-estado';

@Component({
  selector: 'app-kanbam',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatCardModule, MatDividerModule, NgxResourceTimelineModule, MatToolbarModule],
  templateUrl: './kanbam.component.html',
  styleUrls: ['./kanbam.component.css']
})
export class KanbamComponent implements OnInit {

  events: Events = new Events();
  periods: Period[] = [];
  sections: Section[] = [];
  items: Item[] = [];

  constructor(private service: NgxResourceTimelineService) { }


  ngOnInit(): void {
    this.events.SectionClickEvent = (section) => console.log('Section clicked:', section);
    this.events.ItemClicked = (item) => console.log('Item clicked:', item);
    this.events.ItemDropped = (item) => console.log('Item dropped:', item);

    this.periods = [
      {
        name: '3 days',
        timeFramePeriod: 60 * 3,
        timeFrameOverall: 60 * 24 * 3,
        timeFrameHeaders: ['Do MMM', 'HH'],
        classes: 'period-3day'
      },
      {
        name: '1 week',
        timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        classes: '',
        timeFrameOverall: 1440 * 7,
        timeFramePeriod: 1440,
      },
      {
        name: '2 week',
        timeFrameHeaders: ['MMM YYYY', 'DD(ddd)'],
        classes: '',
        timeFrameOverall: 1440 * 14,
        timeFramePeriod: 1440,
      }
    ];

    this.sections = [
      { name: 'A', id: 1 },
      { name: 'B', id: 2 },
      { name: 'C', id: 3 },
      { name: 'D', id: 4 },
      { name: 'E', id: 5 }
    ];

    this.items = [
      {
        id: 1,
        sectionID: 1,
        name: 'Item 1',
        start: moment().startOf('day'),
        end: moment().add(5, 'days').endOf('day'),
        classes: ''
      },
      {
        id: 2,
        sectionID: 3,
        name: 'Item 2',
        start: moment().startOf('day'),
        end: moment().add(4, 'days').endOf('day'),
        classes: ''
      },
      {
        id: 3,
        sectionID: 1,
        name: 'Item 3',
        start: moment().add(1, 'days').startOf('day'),
        end: moment().add(3, 'days').endOf('day'),
        classes: ''
      }
    ];
  }

  addItem() {
    this.service.itemPush({
      id: 4,
      sectionID: 5,
      name: 'Item 4',
      start: moment().startOf('day'),
      end: moment().add(3, 'days').endOf('day'),
      classes: ''
    });
  }

  popItem() {
    this.service.itemPop();
  }

  removeItem() {
    this.service.itemRemove(4);
  }

  // TENTANDO USAR O CDK ====================================

  addTarefa(){
    this.todo.push({ id: 89, title: "tarefa 55", state: "todo", descricao: "Olá mundo" });
  }

  todo: TaskEstado[] = [
    { id: 1, title: 'Tarefa 1', state: 'todo', descricao: "O está sendo feito" },
    { id: 2, title: 'Tarefa 2', state: 'todo', descricao: "O está sendo feito" },
    { id: 3, title: 'Tarefa 3', state: 'todo', descricao: "O está sendo feito" }
  ];

  doing: TaskEstado[] = [
    { id: 4, title: 'Tarefa 4', state: 'doing', descricao: "O está sendo feito" }
  ];

  done: TaskEstado[] = [
    { id: 5, title: 'Tarefa 5', state: 'done', descricao: "O está sendo feito" },
    {id:6, title:'Criando direto no Code', state: 'done', descricao: "O está sendo feito"}
  ];

  drop(event: CdkDragDrop<TaskEstado[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('Drop event:', event);
    } else {
      const task = event.previousContainer.data[event.previousIndex];

      // Atualiza o estado de acordo com o container destino
      if (event.container.id === 'todoList') task.state = 'todo';
      else if (event.container.id === 'doingList') task.state = 'doing';
      else if (event.container.id === 'doneList') task.state = 'done';

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}




