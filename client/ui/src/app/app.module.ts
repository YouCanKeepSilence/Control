import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WorklistComponent } from './worklist/worklist.component';
import { HttpModule } from '@angular/http';

import { NgGridModule } from 'angular2-grid';

@NgModule({
  declarations: [
    AppComponent,
    WorklistComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
