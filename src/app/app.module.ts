import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectionModule } from './sorts/selection/selection.module';
import { RandomNumService } from './services/random-num.service';
import { BubbleModule } from './sorts/bubble/bubble.module';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { SortsModule } from './sorts/sorts.module';

@NgModule({
  declarations: [AppComponent, EnumToArrayPipe],
  imports: [BrowserModule, AppRoutingModule, SortsModule],
  providers: [RandomNumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
