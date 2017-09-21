import { Component, OnInit } from '@angular/core';
import {CardService} from '../card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards;
  _login = 'Demigod';
  constructor(private _cardServece: CardService) {
  }

  ngOnInit() {
    this.cards = this._cardServece.getCards(this._login);
    console.log(this.cards);
    /*this.cards = [
    {
        login : 'Demigod',
        owner : 'Egor Bogdanov',
        works : [
          {'title' : 'Frontend' , 'time' : 2},
          {'title' : 'Backend' , 'time' : 5},
          {'title' : 'Mongodb' , 'time' : 1}
        ]
    },
    {
      login : 'Befezdow',
      owner : 'Evgenii Simakov',
      works : [
        {'title' : 'Frontend' , 'time' : 3},
        {'title' : 'Backend' , 'time' : 5}
      ]
    }
  ];*/
  }
}
