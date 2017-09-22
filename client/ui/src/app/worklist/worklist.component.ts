import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})

export class WorklistComponent implements OnInit {
    public cards: Card[] = CARDS;
    public cardForPopUp: Card = this.cards[0];

    constructor() { }

    ngOnInit() {

    }

    updatePopUp(index: number): void {
        this.cardForPopUp = this.cards[index];
    }
}

class Card {
  public id: string;
  public login: string;
  public owner: string;
  public date: Date;
  public works: [string, number][];
}

const CARDS: Card[] = [
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]},
  {id: 'kek', login: 'cheburek', owner: 'Dmitriy', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]},
  {id: 'kek', login: 'cheburek', owner: 'Andrew', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]},
  {id: 'kek', login: 'cheburek', owner: 'Alexey', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]},
  {id: 'kek', login: 'cheburek', owner: 'Evgeniy', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]}
];
