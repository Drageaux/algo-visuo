import { Component, ChangeDetectorRef } from '@angular/core';
import { SortComponent } from '../sort-component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';

@Component({
  selector: 'app-insertion',
  templateUrl: '../sort-component.html',
  styleUrls: ['../sort-component.scss']
})
export class InsertionComponent extends SortComponent {
  title = 'Insertion Sort';

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
