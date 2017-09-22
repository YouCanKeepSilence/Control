import { Component } from '@angular/core';
import { WorklistService } from './worklist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WorklistService]
})
export class AppComponent {
  title = 'app';
}
