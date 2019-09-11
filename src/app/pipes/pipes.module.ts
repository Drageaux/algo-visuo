import { NgModule } from '@angular/core';
import { EnumToArrayPipe } from './enum-to-array.pipe';

@NgModule({
  declarations: [EnumToArrayPipe],
  exports: [EnumToArrayPipe],
  imports: []
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: []
    };
  }
}
