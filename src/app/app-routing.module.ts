import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortsComponent } from './sorts/sorts.component';
import { GraphsComponent } from './graphs/graphs.component';

const routes: Routes = [
  {
    path: 'graphs',
    component: GraphsComponent
  },
  {
    path: 'sorts',
    component: SortsComponent
  },
  {
    path: '**',
    redirectTo: 'sorts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
