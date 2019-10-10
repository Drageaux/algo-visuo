import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GraphsComponent
  }
];

@NgModule({
  declarations: [GraphsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class GraphsModule {}
