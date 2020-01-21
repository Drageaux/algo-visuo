import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortsComponent } from './sorts.component';
import { PipesModule } from '../pipes/pipes.module';
import { ControlsModule } from '../controls/controls.module';
import { GraphModule } from '../graph/graph.module';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SortsComponent
  }
];

@NgModule({
  declarations: [SortsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ControlsModule,
    GraphModule,
    PipesModule
  ]
})
export class SortsModule {}
