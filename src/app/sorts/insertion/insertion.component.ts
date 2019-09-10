import { Component, ChangeDetectorRef } from '@angular/core';
import { SortComponent } from '../sort-component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';

@Component({
  selector: 'app-insertion',
  templateUrl: './insertion.component.html',
  styleUrls: ['./insertion.component.scss']
})
export class InsertionComponent extends SortComponent {
  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {
    super(randomNumService, cd);
  }

  /*************************************************************************/
  /***************************** INSERTION SORT ****************************/
  /*************************************************************************/
  protected sort(input: SortItem<number>[]): void {
    throw new Error('Method not implemented.');
  }
}
