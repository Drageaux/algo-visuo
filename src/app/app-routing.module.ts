import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectionComponent } from './sorts/selection/selection.component';

const routes: Routes = [
  {
    path: 'sorts/selection',
    component: SelectionComponent
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
