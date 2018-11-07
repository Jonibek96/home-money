import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {EventModel} from '../model/event-model';

@Injectable()
export class EventsService {
  constructor(private http: HttpClient) {
  }

  addEvent(events: EventModel): Observable<any> {
    return this.http.post(`http://localhost:3000/events`, events);
  }

  getEvents(): Observable<any> {
    return this.http.get(`http://localhost:3000/events`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/events/${id}`);
  }

}
