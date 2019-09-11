import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortsComponent } from './sorts.component';
import { PipesModule } from '../pipes/pipes.module';
import { ControlsModule } from '../controls/controls.module';
import { GraphModule } from '../graph/graph.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SortsComponent],
  imports: [CommonModule, FormsModule, ControlsModule, GraphModule, PipesModule]
})
export class SortsModule {}
