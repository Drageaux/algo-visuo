import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {
    super(randomNumService, cd);
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
    this.res = currentResult;

    let ready = true;
    this.interval = setInterval(() => {
      // ! need to skip if not finished with timed async logic
      if (!ready) {
        return;
      }
      ready = false;

      if (currentResult.sorted >= input.length - 1) {
        clearInterval(this.interval);
      }
      // 1. select swap target
      const minInd =
        currentResult.sorted +
        this.selectMinInd(
          currentResult.data.slice(currentResult.sorted, input.length)
        );

      // 2. highlight preswap
      currentResult.data[minInd].status = SortStatus.SORTING;
      currentResult.data[currentResult.sorted].status = SortStatus.SORTING;

      // 2a. cloning to trigger change detection
      this.res.data = [...currentResult.data];

      setTimeout(() => {
        // 3. swap
        const temp = currentResult.data[minInd];
        currentResult.data[minInd] = currentResult.data[currentResult.sorted];
        currentResult.data[currentResult.sorted] = temp;

        // 4. finalize highlight postswap
        currentResult.data[minInd].status = SortStatus.UNSORTED;
        currentResult.data[currentResult.sorted].status = SortStatus.SORTED;

        // 4a. cloning to trigger change detection
        currentResult.sorted++;
        this.res.data = [...currentResult.data];
        this.res.sorted = currentResult.sorted;
        ready = true;
      }, iterationDuration / 2);
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
