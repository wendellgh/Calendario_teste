import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-add-task.component.html',
  styleUrl: './modal-add-task.component.css'
})
export class ModalAddTaskComponent implements OnInit{

  constructor(private formBuilder: FormBuilder){}
  
  public adicioandoTask!: FormGroup;

  ngOnInit(): void {  
    this.adicioandoTask = this.formBuilder.group({
      primeiraEntrada: ['']
    });
  }

    public submitForm() {
    console.log(this.adicioandoTask.value);
    console.log(this.adicioandoTask.value.primeiraEntrada);


  }

}
