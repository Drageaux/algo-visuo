import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ControlsComponent],
  imports: [CommonModule, FormsModule],
  exports: [ControlsComponent]
})
export class ControlsModule {}
