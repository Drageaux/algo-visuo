import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionComponent } from './sorts/selection/selection.component';
import { BubbleComponent } from './sorts/bubble/bubble.component';
import { InsertionComponent } from './sorts/insertion/insertion.component';
import { SortsComponent } from './sorts/sorts.component';

const routes: Routes = [
  {
    path: 'sorts',
    component: SortsComponent
  },
  {
    path: '**',
    redirectTo: 'sorts/selection'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
