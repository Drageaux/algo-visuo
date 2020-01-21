import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'graphs',
    loadChildren: () =>
      import('./graphs/graphs.module').then(mod => mod.GraphsModule)
  },
  {
    path: 'sorts',
    loadChildren: () =>
      import('./sorts/sorts.module').then(mod => mod.SortsModule)
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
