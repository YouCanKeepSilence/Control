import { Component, OnInit } from '@angular/core';
import {CardService} from '../card.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  cards;
  _login = 'Demigod';
  constructor(private _cardServece: CardService) {
    this._cardServece.getCards(this._login).subscribe(data => {
      this.cards = data;
    });
  }

  deleteCard(id) {
    this._cardServece.deleteCard(id).subscribe(data => {
      console.log(data);
      if (data.n === 1) {
        for (let i = 0; i < this.cards.length; i++) {
          if (id === this.cards[i]._id) {
            this.cards.splice( i , 1);
          }
        }
      }
    });
  }
  logIn(authInfo) {
    this._cardServece.logIn(authInfo).subscribe(data => {
      if (data.success) {
        console.log('Hello ' + data.username);
      } else {
        console.log('Auth failed for ' + authInfo);
      }
    });
  }
  addCard(card) {
    this._cardServece.addCard(card).subscribe(data => {
      if (data.result.n === 1) {
        console.log('Card added');
        card._id = data.id;
        this.cards.push(card);
      }
    });
  }
}
