import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EventInput } from '@fullcalendar/core/index.js';

// export interface Evento {
//   id: number;
//   title: string;
//   start: string;
//   end: string;
//   allDay: boolean;
// }

@Injectable({
  providedIn: 'root'
})


export class EventosService {
  private apiUrl = 'http://localhost:3000/eventos'
  
  constructor(private http: HttpClient) { }

  getEventos(): Observable<EventInput[]>{
    return this.http.get<EventInput[]>(this.apiUrl);
  }
  
  addEventos(evt: EventInput):Observable<EventInput[]>{
    return this.http.post<EventInput[]>(`${this.apiUrl}`, evt);
  }
}
