import { Component, ChangeDetectorRef } from '@angular/core';
import { SortComponent } from '../sort-component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortData } from 'src/app/classes/sort-data';
import { SortStatus } from 'src/app/classes/sort-status.enum';

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
    const currentResult: SortData = {
      data: this.deepCopy(input),
      sorted: 0
    };

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
      this.printArray(currentResult.data);
    }
  }
}
