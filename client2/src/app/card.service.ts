import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CardService {
  constructor(private http: Http) {
    console.log('Card Service Initialized...');
}

  getCards(login: string) {
    console.log('get all cards for login ' + login);
    const headers = new Headers();
    headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');
    const AskUrl = 'http://localhost:8080/api/cards/' + login;
    return this.http.get(AskUrl , {}).map((res: Response) => res.json());
  }
}
