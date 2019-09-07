import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionModule } from './sorts/selection/selection.module';
import { RandomNumService } from './services/random-num.service';
import { BubbleModule } from './sorts/bubble/bubble.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SelectionModule, BubbleModule],
  providers: [RandomNumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
