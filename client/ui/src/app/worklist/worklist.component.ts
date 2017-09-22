import { Component, OnInit } from '@angular/core';
import { WorklistService } from '../worklist.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})

export class WorklistComponent implements OnInit {
    public cards: Card[] = CARDS;
    public cardForPopUp: Card = this.cards[0];

    constructor(private worklistService: WorklistService) {}

    ngOnInit() {}

    updateList(login: string) {
      this.worklistService.getCards(login).subscribe(data => {
        this.cards = data;
      });
    }

    updatePopUp(index: number): void {
        this.cardForPopUp = this.cards[index];
    }
}

class Work {
  public name: string;
  public hours: number;

  constructor(n: string, h: number) {
    this.name = n;
    this.hours = h;
  }
}

class Card {
  public id: string;
  public login: string;
  public owner: string;
  public date: Date;
  public works: Work[];
}

const CARDS: Card[] = [
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {id: 'kek', login: 'cheburek', owner: 'Pavlik', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]}
];
