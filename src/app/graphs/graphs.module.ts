import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphsComponent } from './graphs.component';
import { AnimatedBlockComponent } from './animated-block/animated-block.component';

@NgModule({
  declarations: [GraphsComponent, AnimatedBlockComponent],
  imports: [CommonModule]
})
export class GraphsModule {}
