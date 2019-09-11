import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SortsComponent } from '../sorts.component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { SortData } from 'src/app/classes/sort-data';

@Component({
  selector: 'app-bubble',
  templateUrl: '../sort-component.html',
  styleUrls: ['../sort-component.scss']
})
export class BubbleComponent extends SortsComponent {
  title = 'Bubble Sort';

  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {
    super(randomNumService, cd);
  }

  /*************************************************************************/
  /****************************** BUBBLE SORT ******************************/
  /*************************************************************************/
  sort(input: SortItem<number>[]) {
    const currentResult: SortData = {
      data: this.deepCopy(input),
      sorted: 0
    };

    // originally O(n^2) because looping n times per n elements
    // ! has to highlight so many times;
    // ! uncertainty of "sorted" status makes it so
    for (let j = 0; j < currentResult.data.length; j++) {
      let swapped = false;
      // why result.length - j - 1?
      // because the largest has already bubbled to the last place
      for (
        let k = 0;
        k < currentResult.data.length - currentResult.sorted - 1;
        k++
      ) {
        // 1. select swap target
        if (currentResult.data[k].value > currentResult.data[k + 1].value) {
          // 2. highlight preswap
          currentResult.data[k].status = SortStatus.SORTING;
          currentResult.data[k + 1].status = SortStatus.SORTING;
          this.pushState(currentResult);

          // 3. swap
          const temp = currentResult.data[k];
          currentResult.data[k] = currentResult.data[k + 1];
          currentResult.data[k + 1] = temp;
          currentResult.data[k].status = SortStatus.UNSORTED;
          currentResult.data[k + 1].status = SortStatus.UNSORTED;
          swapped = true;
        }

        // 4. finalize highlight postswap
        if (k + 1 === currentResult.data.length - j - 1) {
          currentResult.data[k + 1].status = SortStatus.SORTED;
          this.pushState(currentResult);
        } else if (k === currentResult.data.length - j - 1) {
          currentResult.data[k].status = SortStatus.SORTED;
          this.pushState(currentResult);
        }
      }

      currentResult.data[
        currentResult.data.length - currentResult.sorted - 1
      ].status = SortStatus.SORTED;
      currentResult.sorted += 1;
      this.pushState(currentResult);

      // optimize: break loop if it didn't swap by inner loop
      if (!swapped) {
        break;
      }
    }

    // ! last iteration is needed for our own highlighting purpose
    // assuming everything worked
    currentResult.data.forEach(x => (x.status = SortStatus.SORTED));
    currentResult.sorted = currentResult.data.length;
    this.pushState(currentResult);

    return;
  }
}
