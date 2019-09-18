import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortsComponent } from './sorts/sorts.component';
import { TreesComponent } from './trees/trees.component';

const routes: Routes = [
  {
    path: 'sorts',
    component: SortsComponent
  },
  {
    path: 'trees',
    component: TreesComponent
  },
  {
    path: '**',
    redirectTo: 'trees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
