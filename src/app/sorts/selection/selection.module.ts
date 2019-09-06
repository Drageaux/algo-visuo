import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectionComponent } from './selection.component';
import { GraphModule } from 'src/app/graph/graph.module';

@NgModule({
  declarations: [SelectionComponent],
  imports: [CommonModule, FormsModule, GraphModule]
})
export class SelectionModule {}
