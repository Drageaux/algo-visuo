import { Injectable } from '@angular/core';
import { SortItem } from '../classes/sort-item';
import { SortData } from '../classes/sort-data';
import { SortStatus } from '../classes/sort-status.enum';
import { HistoryMap } from '../classes/history-map';
import { SortNumberArray } from '../classes/sort-number-array';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  constructor() {}
  /*************************************************************************/
  /***************************** SELECTION SORT ****************************/
  /*************************************************************************/
  selectionSort(input: SortNumberArray, history: HistoryMap) {
    const res = this.initResult(input);

    while (res.sorted < input.length) {
      // 1. select swap target
      const minInd =
        res.sorted +
        this.selectMinInd(res.data.slice(res.sorted, input.length));

      // 2. highlight preswap
      res.data[minInd].status = SortStatus.SORTING;
      res.data[res.sorted].status = SortStatus.SORTING;
      this.pushState(res, history);

      // 3. swap
      const temp = res.data[minInd];
      res.data[minInd] = res.data[res.sorted];
      res.data[res.sorted] = temp;

      // 4. finalize highlight postswap
      res.data[minInd].status = SortStatus.UNSORTED;
      res.data[res.sorted].status = SortStatus.SORTED;
      res.sorted++;
      this.pushState(res, history);
    }
  }

  private selectMinInd(unsortedSubArr: SortNumberArray) {
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
  bubbleSort(input: SortNumberArray, history: HistoryMap) {
    const res: SortData = this.initResult(input);

    // originally O(n^2) because looping n times per n elements
    // ! has to highlight so many times;
    // ! uncertainty of "sorted" status makes it so
    for (let j = 0; j < res.data.length; j++) {
      let swapped = false;
      // why result.length - j - 1?
      // because the largest has already bubbled to the last place
      for (let k = 0; k < res.data.length - res.sorted - 1; k++) {
        // 1. select swap target
        if (res.data[k].value > res.data[k + 1].value) {
          // 2. highlight preswap
          res.data[k].status = SortStatus.SORTING;
          res.data[k + 1].status = SortStatus.SORTING;
          this.pushState(res, history);

          // 3. swap
          const temp = res.data[k];
          res.data[k] = res.data[k + 1];
          res.data[k + 1] = temp;
          res.data[k].status = SortStatus.UNSORTED;
          res.data[k + 1].status = SortStatus.UNSORTED;
          swapped = true;
        }

        // 4. finalize highlight postswap
        if (k + 1 === res.data.length - j - 1) {
          res.data[k + 1].status = SortStatus.SORTED;
          this.pushState(res, history);
        } else if (k === res.data.length - j - 1) {
          res.data[k].status = SortStatus.SORTED;
          this.pushState(res, history);
        }
      }

      res.data[res.data.length - res.sorted - 1].status = SortStatus.SORTED;
      res.sorted += 1;
      this.pushState(res, history);

      // optimize: break loop if it didn't swap by inner loop
      if (!swapped) {
        break;
      }
    }

    // ! last iteration is needed for our own highlighting purpose
    // assuming everything worked
    res.data.forEach(x => (x.status = SortStatus.SORTED));
    res.sorted = res.data.length;
    this.pushState(res, history);

    return;
  }

  /*************************************************************************/
  /***************************** INSERTION SORT ****************************/
  /*************************************************************************/
  insertionSort(input: SortNumberArray, history: HistoryMap) {
    const res: SortData = this.initResult(input);

    res.data[0].status = SortStatus.SORTED;
    res.sorted++;
    for (let a = 1; a < res.data.length; a++) {
      let temp = res.data[a];
      temp.status = SortStatus.SORTING;
      this.pushState(res, history);
      let b = a - 1;

      while (b >= 0 && res.data[b].value > temp.value) {
        res.data[b + 1] = res.data[b];
        b--;
      }

      // at this point, if b is decremented all the way to -1
      // temp is inserted at the beginning
      res.data[b + 1] = temp;

      // highlighting twice for visibility
      temp.status = SortStatus.SORTING;
      this.pushState(res, history);

      temp.status = SortStatus.SORTED;
      res.sorted++;
      this.pushState(res, history);
    }
  }

  /*************************************************************************/
  /******************************* MERGE SORT ******************************/
  /*************************************************************************/

  mergeSort(input: SortNumberArray, history: HistoryMap) {
    const res: SortData = this.initResult(input);

    this.recurSortForMergeSort(res.data, 0, res.data.length - 1, history);
    this.printArray(res.data, true);
  }

  /**
   * Recursively halves the array into 1-item arrays,
   * then sorts and merges those arrays into 1.
   *
   * @param arr
   * @param left
   * @param right
   * @param history - history map passed in to help track new states
   */
  private recurSortForMergeSort(
    arr: SortNumberArray,
    left: number,
    right: number,
    history: Map<number, SortData>
  ) {
    if (left < right) {
      const mid: number = Math.floor((left + right) / 2);

      this.recurSortForMergeSort(arr, left, mid, history);
      this.recurSortForMergeSort(arr, mid + 1, right, history);

      this.mergeForMergeSort(arr, left, mid, right, history);
    }
  }

  /**
   *
   * @param arr - original array reference
   * @param left - leftmost boundary
   * @param mid - middle boundary
   * @param right - rightmost boundary
   * @param history - new state will be set here for highlighting
   */
  private mergeForMergeSort(
    arr: SortNumberArray,
    left: number,
    mid: number,
    right: number,
    history: HistoryMap
  ) {
    console.log('merging', left, mid, right);

    // find size of 2 sub arrs to be merged
    const nL = mid - left + 1;
    const nR = right - mid;

    const arrL: SortNumberArray = [];
    const arrR: SortNumberArray = [];
    for (let i = 0; i < nL; i++) {
      arrL[i] = arr[left + i];
      arrL[i].status = SortStatus.SORTING;
    }

    for (let i = 0; i < nR; i++) {
      arrR[i] = arr[mid + i + 1];
      arrR[i].status = SortStatus.SORTING;
    }
    this.pushState({ data: arr, sorted: 0 }, history);

    // curr ind of sub arrs
    let l = 0,
      r = 0;
    // curr ind of merged sub arr, starting from left
    let m = left;
    // making sure to move smallest values from each sub arr forward
    // stop if finished with 1 sub arr
    while (l < nL && r < nR) {
      if (arrL[l].value <= arrR[r].value) {
        arr[m] = arrL[l];
        arr[m].status = SortStatus.SORTED;
        l++;
      } else {
        arr[m] = arrR[r];
        arr[m].status = SortStatus.SORTED;
        r++;
      }
      m++;
    }

    // because the above loop checks ind of sub arrs simultaneously
    // and interrupts when only 1 completes
    // this piece of code will finish overwriting unsorted items
    while (l < nL) {
      arr[m] = arrL[l];
      arr[m].status = SortStatus.SORTED;
      l++;
      m++;
    }
    while (r < nR) {
      arr[m] = arrR[r];
      arr[m].status = SortStatus.SORTED;
      r++;
      m++;
    }
    this.pushState({ data: arr, sorted: 0 }, history);
  }

  /*************************************************************************/
  /**************************** HELPER FUNCTIONS ***************************/
  /*************************************************************************/

  /**
   * Return a copy of the original obj so that
   * changes to the new obj doesn't modify the original
   *
   * @param srcObj - source object to copy from
   */
  deepCopy(srcObj) {
    return JSON.parse(JSON.stringify(srcObj));
  }

  /**
   * Set the state at the "end" of this map
   * Precondition - map size has never been reduced
   *
   * @param sData - new state
   * @param history - history map that holds states
   */
  pushState(sData: SortData, history: HistoryMap) {
    history.set(history.size, this.deepCopy(sData));
  }

  /**
   * Create a new initial instance of the sort data from an array.
   */
  initResult(input: SortNumberArray): SortData {
    // ! input has nested objects, so changing that object
    // ! even via Object.assign would also cause side effects
    return {
      data: this.deepCopy(input),
      sorted: 0
    };
  }

  printArray(arr: SortNumberArray, wStatus = false): void {
    console.log(this.returnSortItemArray(arr, wStatus));
  }

  /**
   * Convert the number array with sort status to readable form.
   *
   * @param arr - array to return
   * @param wStatus - with status or not e.g. `value` or `value|status`
   */
  returnSortItemArray(arr: SortNumberArray, wStatus = false): string[] {
    return arr.map(x => x.value + `${wStatus ? '|' + x.status : ''}`);
  }
}
