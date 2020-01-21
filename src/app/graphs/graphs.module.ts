import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs.component';
import { Routes, RouterModule } from '@angular/router';
import { ControlsModule } from '../controls/controls.module';

const routes: Routes = [
  {
    path: '',
    component: GraphsComponent
  }
];

@NgModule({
  declarations: [GraphsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ControlsModule]
})
export class GraphsModule {}
