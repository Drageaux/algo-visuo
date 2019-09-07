import { Component, OnInit, OnDestroy } from '@angular/core';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortItem } from 'src/app/classes/sort-item';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { SortComponent } from '../sort-component';

/**
 * The selection sort algorithm sorts an array by repeatedly finding the minimum element
 * (considering ascending order) from unsorted part and putting it at the beginning.
 * The algorithm maintains two subarrays in a given array.
 * 1) The subarray which is already sorted.
 * 2) Remaining subarray which is unsorted.
 */
@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent extends SortComponent
  implements OnInit, OnDestroy {
  constructor(randomNumService: RandomNumService) {
    super(randomNumService);
  }

  /*************************************************************************/
  /************************** SELECTION SORT ONLY **************************/
  /*************************************************************************/
  sort(input: SortItem<number>[], iterationDuration = 300) {
    // ! input has nested objects, so changing that object even via
    // ! Object.assign would also cause side effects
    const currentResult = {
      data: JSON.parse(JSON.stringify(input)),
      sorted: 0
    };

    this.interval = setInterval(() => {
      if (currentResult.sorted >= input.length - 1) {
        clearInterval(this.interval);
      }
      const minInd =
        currentResult.sorted +
        this.selectMinInd(
          currentResult.data.slice(currentResult.sorted, input.length)
        );

      // highlight
      currentResult.data[minInd].status = SortStatus.SORTING;
      currentResult.data[currentResult.sorted].status = SortStatus.SORTING;
      this.res = currentResult;

      // swap
      const temp = currentResult.data[minInd];
      currentResult.data[minInd] = currentResult.data[currentResult.sorted];
      currentResult.data[currentResult.sorted] = temp;
      currentResult.data[currentResult.sorted].status = SortStatus.SORTED;

      currentResult.sorted++;
      this.res = currentResult;
    }, iterationDuration);
  }

  private selectMinInd(unsortedSubArr: SortItem<number>[]) {
    let minInd = 0;
    for (
      let unsortedInd = 0;
      unsortedInd < unsortedSubArr.length;
      unsortedInd++
    ) {
      if (unsortedSubArr[unsortedInd].value < unsortedSubArr[minInd].value) {
        minInd = unsortedInd;
      }
    }
    return minInd;
  }
}
