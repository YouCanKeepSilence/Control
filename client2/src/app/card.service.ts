import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CardService {
  apiUrl = 'http://localhost:8080/api/card';
  logInUrl = 'http://localhost:8080/api/login';

  constructor(private http: Http) {
    console.log('Card Service Initialized...');
}

  getCards(login) {
    console.log('get all cards for login ' + login);
    // const headers = new Headers();
    const AskUrl = 'http://localhost:8080/api/cards/' + login;
    return this.http.get(AskUrl/*, {'headers' : headers}*/).map((res: Response) => res.json());
  }

  deleteCard(id) {
    console.log('delete card by id ' + id);
    return this.http.delete(this.apiUrl + '/' + id).map((res: Response) => res.json());
  }

  updateCard(card) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    console.log('new info is ' + card);
    return this.http.put(this.apiUrl + '/' + card._id , card , options)
    .map((res: Response) => res.json());
  }

  addCard(card) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    console.log('new card is ' + card);
    return this.http.post(this.apiUrl , JSON.stringify(card) , options).map((res: Response) => res.json());
  }

  logIn(authInfo) {
    const headers = new Headers();
    headers.append('content-type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.logInUrl , JSON.stringify(authInfo) , options).map((res: Response) => res.json());
  }
}
