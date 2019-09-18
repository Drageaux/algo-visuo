import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomNumService } from './services/random-num.service';
import { SortsModule } from './sorts/sorts.module';
import { TreesModule } from './trees/trees.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SortsModule, TreesModule],
  providers: [RandomNumService],
  bootstrap: [AppComponent]
})
export class AppModule {}
