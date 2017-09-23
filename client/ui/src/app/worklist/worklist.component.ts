import { Component, OnInit } from '@angular/core';
import { WorklistService } from '../worklist.service';
import { Http, Response } from '@angular/http';

import {NgGrid, NgGridItem, NgGridConfig, NgGridItemConfig, NgGridItemEvent} from 'angular2-grid';

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})

export class WorklistComponent implements OnInit {
    public cards: Card[] = CARDS;
    public cardForPopUp: Card = this.cards[0];
    public currentCard: number;
    public login: string;
    public configs: NgGridItemConfig[] = [];
    public addConfig: NgGridItemConfig;
    public tableConfig: NgGridConfig = <NgGridConfig>{
      'margins': [10],
      'draggable': false,
      'resizable': true,
      'max_cols': 4,
      'max_rows': 10000,
      'visible_cols': 0,
      'visible_rows': 0,
      'min_cols': 1,
      'min_rows': 1,
      'col_width': 50,
      'row_height': 50,
      'cascade': 'up',
      'min_width': 50,
      'min_height': 50,
      'fix_to_grid': false,
      'auto_style': true,
      'auto_resize': true,
      'maintain_ratio': false,
      'prefer_new': false,
      'zoom_on_drag': false,
      'limit_to_screen': true
    };

    constructor(private worklistService: WorklistService) {
      this.updateConfigs();
    }

    updateConfigs() {
      for (let i = 0; i < this.cards.length; i++) {
        this.configs.push(this.generateItemConfig(i));
      }
      this.addConfig = this.generateItemConfig(this.cards.length);
      console.log(this.addConfig);
    }

    generateItemConfig(element: number): NgGridItemConfig {
      const column = (element % this.tableConfig.max_cols) + 1;
      const row = ((element - column) / this.tableConfig.max_cols) + 1;
      return {
          'col': column,
          'row': row,
          'sizex': 1,
          'sizey': 1,
          'dragHandle': null,
          'resizeHandle': null,
          'borderSize': 15,
          'fixed': false,
          'draggable': true,
          'resizable': true,
          'payload': null,
          'maxCols': 0,
          'minCols': 0,
          'maxRows': 0,
          'minRows': 0,
          'minWidth': 0,
          'minHeight': 0,
      };
    }

    ngOnInit() {}

    updateList(login: string) {
      this.worklistService.getCards(login).subscribe(data => {
        this.cards = data;
        for (let i = 0 ; i < this.cards.length; i++) {
          this.cards[i].date = new Date(this.cards[i].date);
        }
        this.updateConfigs();
      });
    }

    updatePopUp(index: number): void {
        this.cardForPopUp = this.cards[index];
        this.currentCard = index;
    }

    getSummaryTime(index: number): number {
      let sum = 0;
      this.cards[index].works.forEach(element => {
        sum += Number(element.time);
      });
      return sum as number;
    }

    deleteCard(index: number): void {
      this.worklistService.deleteCard(this.cards[index]._id).subscribe(data => {
        if (data.n === 1) {
          this.cards.splice(index , 1);
        }
      });
    }

    deleteWork(index: number): void {
      this.cardForPopUp.works.splice(index);
    }

    addWork(): void {
      this.cardForPopUp.works.push(new Work('', null));
    }

    applyCard(): void {
      this.worklistService.updateCard(this.cardForPopUp).subscribe(data => {
        if (data.n === 1) {
          this.cards[this.currentCard] = this.cardForPopUp;
        }
      });
    }

    updateWorkTitle(index: number, newTitle: string) {
      this.cardForPopUp.works[index].title = newTitle;
    }

    updateWorkTime(index: number, newTime: number) {
      this.cardForPopUp.works[index].time = newTime;
    }

    updateCardDate(newDate) {
      this.cardForPopUp.date = newDate;
      console.log(newDate);
    }

    createNewCard() {
      this.cardForPopUp = new Card;
      this.cardForPopUp.login = this.login;
      this.cardForPopUp.date = new Date(2000, 1, 1);
      this.cardForPopUp.works = [];
    }
}

class Work {
  public title: string;
  public time: number;

  constructor(n: string, h: number) {
    this.title = n;
    this.time = h;
  }
}

class Card {
  public _id: string;
  public login: string;
  public date: Date;
  public works: Work[];
}

const CARDS: Card[] = [
  {_id: 'kek1', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {_id: 'kek2', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {_id: 'kek3', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {_id: 'kek4', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {_id: 'kek5', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {_id: 'kek6', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]},
  {_id: 'kek7', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
  works: [new Work('work1', 3), new Work('work2', 5)]}
];
