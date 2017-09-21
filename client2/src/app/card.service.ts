import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CardService {
  apiUrl = 'http://localhost:8080/api/card';
  constructor(private http: Http) {
    console.log('Card Service Initialized...');
}

  getCards(login) {
    console.log('get all cards for login ' + login);
    const headers = new Headers();
    const AskUrl = 'http://localhost:8080/api/cards/' + login;
    return this.http.get(AskUrl, {'headers' : headers}).map((res: Response) => res.json());
  }

  deleteCard(id) {
    console.log('delete card by id ' + id);
    return this.http.delete(this.apiUrl + '/' + id).map((res: Response) => res.json());
  }

  updateCard(card) {
    console.log('new info is ' + card);
    return this.http.put(this.apiUrl + '/' + card._id , JSON.stringify(card)).map((res: Response) => res.json());
  }
}
