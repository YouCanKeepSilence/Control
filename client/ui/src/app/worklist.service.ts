import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WorklistService {
  apiUrl = 'http://localhost:8080/api/card';
  constructor(private http: Http) {
    console.log('Worklist Service Initialized...');
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
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    // console.log('new info is ' + JSON.stringify(card));
    return this.http.put(this.apiUrl + '/' + card._id , JSON.stringify(card) , options).map((res: Response) => res.json());
  }
}
