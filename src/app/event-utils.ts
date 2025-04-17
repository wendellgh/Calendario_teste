import { EventInput } from '@fullcalendar/core';
import { EventosService } from './evento.service';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today


export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: '2025-04-27'
  },
  {
    id: createEventId(),
    title: 'Criar Template',
    start: '2025-04-13',
   
  },
  {
    id: createEventId(),
    title: 'Eventos?',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  },
  {
    id: createEventId(),
    title: 'Meu Teste',
    start:'2025-04-11',
    end:'2025-04-12'
  },
  {
    id: createEventId(),
    title: 'Wendell M.',
    start:'2025-04-30',
    end:'2025-04-30'
  },
  {
    "id": "56",
    "allDay": true,
    "title": "sada",
    "start": "2025-04-14",
    "end": "2025-04-15"
  },
  {
    "id": "69",
    "allDay": true,
    "title": "asdddddddddddd",
    "start": "2025-04-22",
    "end": "2025-04-23"
  }
];

export function createEventId() {
  return String(eventGuid++);
}





