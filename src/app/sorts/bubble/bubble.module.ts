import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleComponent } from './bubble.component';
import { ControlsModule } from 'src/app/controls/controls.module';
import { GraphModule } from 'src/app/graph/graph.module';

@NgModule({
  declarations: [BubbleComponent],
  imports: [CommonModule, ControlsModule, GraphModule]
})
export class BubbleModule {}
