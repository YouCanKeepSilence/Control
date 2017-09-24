import { Component, OnInit } from '@angular/core';
import { WorklistService } from '../worklist.service';
import { Http, Response } from '@angular/http';
import {NgGrid, NgGridItem, NgGridConfig, NgGridItemConfig, NgGridItemEvent} from 'angular2-grid';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-worklist',
  templateUrl: './worklist.component.html',
  styleUrls: ['./worklist.component.css']
})

export class WorklistComponent implements OnInit {
    private cards: Card[] = [];                                       // list of cards of current user
    private cardForPopUp: Card = new Card;                            // buffer card for adding and changing in the modal window
    private currentCard: number;                                      // index of card, which copy place in the buffer
    private login: string;                                            // current login
    private username: string;                                         // current username
    private configs: NgGridItemConfig[] = [];                         // grid configs of all cards
    private addConfig: NgGridItemConfig;                              // grid config of last element
    private tableConfig: NgGridConfig = <NgGridConfig>{               // grid config of table
      'margins': [12, 5],
      'draggable': false,
      'resizable': true,
      'max_cols': 6,
      'max_rows': 10000,
      'visible_cols': 0,
      'visible_rows': 0,
      'min_cols': 1,
      'min_rows': 1,
      'col_width': 50,
      'row_height': 50,
      'cascade': 'up',
      'min_width': 0,
      'min_height': 0,
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

    ngOnInit() {}                                                     // don't remove

    checkForLogin(): boolean {                                        // check for authorization
      return Boolean(this.login);
    }

    authorization(login: string, pass: string) {                      // authorization of user
      const hash = Md5.hashStr(login + pass);
      this.worklistService.logIn(hash).subscribe(data => {
        if (data.success) {
          this.login = login;
          this.username = data.username;
          this.updateList(this.login);
          console.log('Hello ' + this.username);
        } else {
          console.log('Authorization failed');
        }
      });
    }

    updateConfigs() {                                                 // update configs of elements in the grid
      for (let i = 0; i < this.cards.length; i++) {
        this.configs.push(this.generateItemConfig(i));
      }
      this.addConfig = this.generateItemConfig(this.cards.length);
      console.log(this.addConfig);
    }

    generateItemConfig(element: number): NgGridItemConfig {           // generate config for the element
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
          'draggable': false,
          'resizable': false,
          'payload': null,
          'maxCols': 0,
          'minCols': 0,
          'maxRows': 0,
          'minRows': 0,
          'minWidth': 0,
          'minHeight': 0,
      };
    }

    updateList(login: string) {                                       // update card list using data from db
      this.worklistService.getCards(login).subscribe(data => {
        this.cards = data;
        for (let i = 0 ; i < this.cards.length; i++) {
          this.cards[i].date = new Date(this.cards[i].date);
        }
        this.login = login;
        this.updateConfigs();
      });
    }

    updatePopUp(index: number): void {                                // update data in the popUp
        this.cardForPopUp = new Card;
        this.cardForPopUp.copyCardInfo(this.cards[index]);
        // this.ca this.cards[index];
        this.currentCard = index;
    }

    getTotalTime(index: number): number {                             // count total time of the card
      let sum = 0;
      this.cards[index].works.forEach(element => {
        sum += Number(element.time);
      });
      return sum as number;
    }

    deleteCard(index: number): void {                                 // delete the card from the list
      this.worklistService.deleteCard(this.cards[index]._id).subscribe(data => {
        if (data.n === 1) {
          this.cards.splice(index , 1);
          this.updateConfigs();
        }
      });
    }

    deleteWork(index: number): void {                                 // remove the work from the card
      this.cardForPopUp.works.splice(index);
    }

    addWork(): void {                                                 // add a new work into the card
      this.cardForPopUp.works.push(new Work('', null));
    }

    applyCard(): void {                                               // send changings of the card into db and change in local if ok
      this.worklistService.updateCard(this.cardForPopUp).subscribe(data => {
        if (data.n === 1) {
          this.cards[this.currentCard] = this.cardForPopUp;
        }
      });
    }

    updateWorkTitle(index: number, newTitle: string) {                // update nameof the work into the buffer card
      this.cardForPopUp.works[index].title = newTitle;
    }

    updateWorkTime(index: number, newTime: number) {                  // обновляет время указанной работы модульной карте
      this.cardForPopUp.works[index].time = newTime;
    }

    updateCardDate(newDate: string) {                                 // обновляет дату в модульной карте
      this.cardForPopUp.date = new Date(newDate);
    }

    createNewCard() {                                                 // инициализирует модульную карту новой картой
      this.cardForPopUp = new Card;
      this.cardForPopUp.login = this.login;
      this.cardForPopUp.date = new Date(Date());
      this.cardForPopUp.works = [];
    }

    applyNewCard() {                                                  // отправляет новую карту в бд, и если все норм, добавляет в локалку
      this.worklistService.addCard(this.cardForPopUp).subscribe(data => {
        if (data.result.n === 1) {
          this.cardForPopUp._id = data.id;
          this.cards.push(this.cardForPopUp);
          this.updateConfigs();
        }
      });
    }
}

class Work {                                                          // класс работы, используется в карте
  public title: string;
  public time: number;

  constructor(n: string, h: number) {
    this.title = n;
    this.time = h;
  }
}

class Card {                                                         // класс карты
  public _id: string;
  public login: string;
  public date: Date;
  public works: Work[];

  constructor() {
    this.date = new Date;
  }

  copyCardInfo(card: Card) {
    this._id = card._id;
    this.login = card.login;
    this.date = new Date(card.date);
    // this.works = new Array<Work>(card.works);
    // this.works = Object.assign({}, card.works);
    // this.works = card.works;
    this.works = card.works.slice(0);
  }
}

// const CARDS: Card[] = [
//   {_id: 'kek1', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
//   works: [new Work('work1', 3), new Work('work2', 5)]},
//   {_id: 'kek2', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
//   works: [new Work('work1', 3), new Work('work2', 5)]},
//   {_id: 'kek3', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
//   works: [new Work('work1', 3), new Work('work2', 5)]},
//   {_id: 'kek4', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
//   works: [new Work('work1', 3), new Work('work2', 5)]},
//   {_id: 'kek5', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
//   works: [new Work('work1', 3), new Work('work2', 5)]},
//   {_id: 'kek6', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
//   works: [new Work('work1', 3), new Work('work2', 5)]},
//   {_id: 'kek7', login: 'cheburek', date: new Date('1995-12-17T03:24:00'), 
//   works: [new Work('work1', 3), new Work('work2', 5)]}
// ];
