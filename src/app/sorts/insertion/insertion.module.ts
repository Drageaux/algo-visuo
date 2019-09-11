import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertionComponent } from './insertion.component';
import { ControlsModule } from 'src/app/controls/controls.module';
import { GraphModule } from 'src/app/graph/graph.module';

@NgModule({
  declarations: [InsertionComponent],
  imports: [CommonModule, ControlsModule, GraphModule]
})
export class InsertionModule {}
