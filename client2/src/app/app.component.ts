import { Component } from '@angular/core';
import {CardsComponent} from './cards/cards.component';
import {CardService} from './card.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CardService]
})
export class AppComponent {
  title = 'cards';
}
