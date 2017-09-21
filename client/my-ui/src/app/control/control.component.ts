import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})

export class ControlComponent implements OnInit {
    public cards: Card[] = CARDS;
    constructor() { }
    ngOnInit() {

    }
    onSelect(card: Card): void {

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
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), works: [['work1', 3], ['work2', 2]]}
];
