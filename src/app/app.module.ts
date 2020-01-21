import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomNumService } from './services/random-num.service';
import { SortsModule } from './sorts/sorts.module';
import { GraphsModule } from './graphs/graphs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SortsModule,
    GraphsModule
  ],
  providers: [RandomNumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
