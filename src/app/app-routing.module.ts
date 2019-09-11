import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionComponent } from './sorts/selection/selection.component';
import { BubbleComponent } from './sorts/bubble/bubble.component';
import { InsertionComponent } from './sorts/insertion/insertion.component';

const routes: Routes = [
  {
    path: 'sorts/selection',
    component: SelectionComponent
  },
  {
    path: 'sorts/bubble',
    component: BubbleComponent
  },
  {
    path: 'sorts/insertion',
    component: InsertionComponent
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
