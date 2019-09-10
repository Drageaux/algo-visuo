import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionModule } from './sorts/selection/selection.module';
import { RandomNumService } from './services/random-num.service';
import { BubbleModule } from './sorts/bubble/bubble.module';
import { InsertionModule } from './sorts/insertion/insertion.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectionModule,
    BubbleModule,
    InsertionModule
  ],
  providers: [RandomNumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
