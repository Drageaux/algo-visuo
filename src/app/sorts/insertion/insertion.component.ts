import { Component, ChangeDetectorRef } from '@angular/core';
import { SortComponent } from '../sort-component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortData } from 'src/app/classes/sort-data';

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

    for (let j = 0; j < currentResult.data.length; j++) {
      // let key = j;
      let k = j - 1;

      console.log('k', currentResult.data[k], 'j', currentResult.data[j]);
      while (
        k >= 0 &&
        currentResult.data[k].value > currentResult.data[j].value
      ) {
        currentResult.data[k + 1] = currentResult.data[k];
        k--;
        this.printArray(currentResult.data);
      }
      currentResult.data[k + 1] = currentResult.data[j];
    }
  }
}
