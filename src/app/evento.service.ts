import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
  id: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

@Injectable({
  providedIn: 'root'
})


export class EventosService {
  private apiUrl = 'http://localhost:3000/eventos'
  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.apiUrl);
  }
}
