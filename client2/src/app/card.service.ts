import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CardService {

  constructor(private http: Http) {
    console.log('Card Service Initialized...');
}

  getCards(login: string) {
    console.log('get all cards');
    return this.http.get('api/cards/' + login).
      map(res => res.json());
  }
}
