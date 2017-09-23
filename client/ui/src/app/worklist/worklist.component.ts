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
    private cards: Card[] = CARDS;                                    // список карту текущего пользователя
    private cardForPopUp: Card = this.cards[0];                       // буферная карта для добавления и изменения в модульном окне
    private currentCard: number;                                      // индекс карты, копия которой лежит в буфере
    private login: string;                                            // текущий логин
    private configs: NgGridItemConfig[] = [];                         // grid концигурации всех карт
    private addConfig: NgGridItemConfig;                              // grid концигурация элемента Add ard
    private tableConfig: NgGridConfig = <NgGridConfig>{               // конфигурация grid таблицы
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

    ngOnInit() {}                                                     // ругается, если удалить

    checkForLogin(): boolean {                                        // проверяет, залогинен ли пользователь
      return Boolean(this.login);
    }

    authorization(login: string, pass: string) {                      // авторизации пользователя
      const hash = Md5.hashStr(login + pass);
      this.worklistService.logIn(hash).subscribe(date => {
        // if (true) {      //END ME
        //   this.login = login;
        // }
      });
    }

    updateConfigs() {                                                 // обновляет конфигурацию элементов в сетке
      for (let i = 0; i < this.cards.length; i++) {
        this.configs.push(this.generateItemConfig(i));
      }
      this.addConfig = this.generateItemConfig(this.cards.length);
      console.log(this.addConfig);
    }

    generateItemConfig(element: number): NgGridItemConfig {           // генерирует концигурацию для заданного элемента
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

    updateList(login: string) {                                       // обновляет список карт, дергая из данные из бд
      this.worklistService.getCards(login).subscribe(data => {
        this.cards = data;
        for (let i = 0 ; i < this.cards.length; i++) {
          this.cards[i].date = new Date(this.cards[i].date);
        }
        this.login = login;
        this.updateConfigs();
      });
    }

    updatePopUp(index: number): void {                                // обновляет данные во всплывающем окне
        this.cardForPopUp = this.cards[index];
        this.currentCard = index;
    }

    getTotalTime(index: number): number {                             // подсчитывает суммарное время заданной карты
      let sum = 0;
      this.cards[index].works.forEach(element => {
        sum += Number(element.time);
      });
      return sum as number;
    }

    deleteCard(index: number): void {                                 // удаляет карту из массива карт
      this.worklistService.deleteCard(this.cards[index]._id).subscribe(data => {
        if (data.n === 1) {
          this.cards.splice(index , 1);
          this.updateConfigs();
        }
      });
    }

    deleteWork(index: number): void {                                 // удаляет из заданной карты указанную работу
      this.cardForPopUp.works.splice(index);
    }

    addWork(): void {                                                 // добавляет в карту новую работу
      this.cardForPopUp.works.push(new Work('', null));
    }

    applyCard(): void {                                               // отправляет изменения карты в бд и, если все норм, меняет на локалке
      this.worklistService.updateCard(this.cardForPopUp).subscribe(data => {
        if (data.n === 1) {
          this.cards[this.currentCard] = this.cardForPopUp;
        }
      });
    }

    updateWorkTitle(index: number, newTitle: string) {                // обновляет название указанной работы в модульной карте
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
