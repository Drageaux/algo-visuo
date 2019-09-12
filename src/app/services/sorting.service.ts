import { Injectable } from '@angular/core';
import { SortItem } from '../classes/sort-item';
import { SortData } from '../classes/sort-data';
import { SortStatus } from '../classes/sort-status.enum';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  constructor() {}
  /*************************************************************************/
  /***************************** SELECTION SORT ****************************/
  /*************************************************************************/
  selectionSort(input: SortItem<number>[], history: Map<number, SortData>) {
    // ! input has nested objects, so changing that object even via
    // ! Object.assign would also cause side effects
    const currentResult = {
      data: this.deepCopy(input),
      sorted: 0
    };

    while (currentResult.sorted < input.length) {
      // 1. select swap target
      const minInd =
        currentResult.sorted +
        this.selectMinInd(
          currentResult.data.slice(currentResult.sorted, input.length)
        );

      // 2. highlight preswap
      currentResult.data[minInd].status = SortStatus.SORTING;
      currentResult.data[currentResult.sorted].status = SortStatus.SORTING;
      this.pushState(currentResult, history);

      // 3. swap
      const temp = currentResult.data[minInd];
      currentResult.data[minInd] = currentResult.data[currentResult.sorted];
      currentResult.data[currentResult.sorted] = temp;

      // 4. finalize highlight postswap
      currentResult.data[minInd].status = SortStatus.UNSORTED;
      currentResult.data[currentResult.sorted].status = SortStatus.SORTED;
      currentResult.sorted++;
      this.pushState(currentResult, history);
    }
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

  /*************************************************************************/
  /****************************** BUBBLE SORT ******************************/
  /*************************************************************************/
  bubbleSort(input: SortItem<number>[], history: Map<number, SortData>) {
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
          this.pushState(currentResult, history);

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
          this.pushState(currentResult, history);
        } else if (k === currentResult.data.length - j - 1) {
          currentResult.data[k].status = SortStatus.SORTED;
          this.pushState(currentResult, history);
        }
      }

      currentResult.data[
        currentResult.data.length - currentResult.sorted - 1
      ].status = SortStatus.SORTED;
      currentResult.sorted += 1;
      this.pushState(currentResult, history);

      // optimize: break loop if it didn't swap by inner loop
      if (!swapped) {
        break;
      }
    }

    // ! last iteration is needed for our own highlighting purpose
    // assuming everything worked
    currentResult.data.forEach(x => (x.status = SortStatus.SORTED));
    currentResult.sorted = currentResult.data.length;
    this.pushState(currentResult, history);

    return;
  }

  /*************************************************************************/
  /***************************** INSERTION SORT ****************************/
  /*************************************************************************/
  insertionSort(input: SortItem<number>[], history: Map<number, SortData>) {
    const currentResult: SortData = {
      data: this.deepCopy(input),
      sorted: 0
    };

    currentResult.data[0].status = SortStatus.SORTED;
    currentResult.sorted++;
    for (let a = 1; a < currentResult.data.length; a++) {
      let temp = currentResult.data[a];
      temp.status = SortStatus.SORTING;
      this.pushState(currentResult, history);
      let b = a - 1;

      while (b >= 0 && currentResult.data[b].value > temp.value) {
        currentResult.data[b + 1] = currentResult.data[b];
        b--;
      }

      // at this point, if b is decremented all the way to -1
      // temp is inserted at the beginning
      currentResult.data[b + 1] = temp;

      // highlighting twice for visibility
      temp.status = SortStatus.SORTING;
      this.pushState(currentResult, history);

      temp.status = SortStatus.SORTED;
      currentResult.sorted++;
      this.pushState(currentResult, history);
      this.printArray(currentResult.data);
    }
  }

  /*************************************************************************/
  /******************************* MERGE SORT ******************************/
  /*************************************************************************/
  testMerge = [];
  step = 0;
  mergeSort(input: SortItem<number>[], history: Map<number, SortData>) {
    const currRes: SortData = {
      data: this.deepCopy(input),
      sorted: 0
    };

    this.printArray(currRes.data);
    this.recurSortForMergeSort(currRes.data, 0, currRes.data.length - 1);
    console.log(this.testMerge);
  }

  private recurSortForMergeSort(arr: SortItem<number>[], left, right) {
    if (left < right) {
      const mid: number = Math.floor((left + right) / 2);
      console.log('mid:', mid);

      this.step++;
      console.log(
        this.step,
        `from left ${left} to mid ${mid}`,
        this.returnSortItemArray(arr.slice(left, mid + 1))
      );
      this.recurSortForMergeSort(arr, left, mid);

      this.step++;
      console.log(
        this.step,
        `from mid + 1 ${mid + 1} to right ${right}`,
        this.returnSortItemArray(arr.slice(mid + 1, right + 1))
      );
      this.recurSortForMergeSort(arr, mid + 1, right);

      console.log('MERGE');
      this.mergeForMergeSort(arr, left, mid, right);
    }
  }

  private mergeForMergeSort(arr: SortItem<number>[], left, mid, right) {}

  /*************************************************************************/
  /**************************** HELPER FUNCTIONS ***************************/
  /*************************************************************************/
  deepCopy(srcObj) {
    return JSON.parse(JSON.stringify(srcObj));
  }

  pushState(sData: SortData, history: Map<number, SortData>) {
    history.set(history.size, this.deepCopy(sData));
  }

  printArray(arr: SortItem<number>[], wStatus = false) {
    console.log(this.returnSortItemArray(arr, wStatus));
  }

  returnSortItemArray(arr: SortItem<number>[], wStatus = false) {
    return arr.map(x => x.value + `${wStatus ? '|' + x.status : ''}`);
  }
}
