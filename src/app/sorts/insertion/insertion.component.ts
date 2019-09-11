import { Component, ChangeDetectorRef } from '@angular/core';
import { SortsComponent } from '../sorts.component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortData } from 'src/app/classes/sort-data';
import { SortStatus } from 'src/app/classes/sort-status.enum';

@Component({
  selector: 'app-insertion',
  templateUrl: '../sort-component.html',
  styleUrls: ['../sort-component.scss']
})
export class InsertionComponent extends SortsComponent {
  title = 'Insertion Sort';

  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {
    super(randomNumService, cd);
  }

  /*************************************************************************/
  /***************************** INSERTION SORT ****************************/
  /*************************************************************************/
  protected sort(input: SortItem<number>[]): void {
    const currentResult: SortData = {
      data: this.deepCopy(input),
      sorted: 0
    };

    currentResult.data[0].status = SortStatus.SORTED;
    for (let a = 1; a < currentResult.data.length; a++) {
      let temp = currentResult.data[a];
      temp.status = SortStatus.SORTING;
      this.pushState(currentResult);
      let b = a - 1;

      console.log('a', currentResult.data[a], 'b', currentResult.data[b]);
      while (b >= 0 && currentResult.data[b].value > temp.value) {
        currentResult.data[b + 1] = currentResult.data[b];
        b--;
      }

      // by this time, if b is decremented all the way to -1
      // temp is inserted at the beginning
      currentResult.data[b + 1] = temp;

      // highlighting twice for visibility
      temp.status = SortStatus.SORTING;
      this.pushState(currentResult);
      temp.status = SortStatus.SORTED;
      this.pushState(currentResult);
      this.printArray(currentResult.data);
    }
  }
}
