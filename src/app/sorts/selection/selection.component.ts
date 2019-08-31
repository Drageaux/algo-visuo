import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
export class SelectionComponent implements OnInit {
  @Input() input = [64, 25, 12, 22, 11];
  result = new BehaviorSubject<number[]>(this.input);
  numbersSorted = 0;
  constructor() {}

  ngOnInit() {}

  onStep() {
    const arr = Object.assign([], this.result.value);
    if (this.numbersSorted >= arr.length) {
      return;
    }

    const minInd =
      this.numbersSorted +
      this.selectMinInd(arr.slice(this.numbersSorted, arr.length));

    // swap
    const temp = arr[minInd];
    arr[minInd] = arr[this.numbersSorted];
    arr[this.numbersSorted] = temp;
    this.numbersSorted++;
    this.result.next(arr);
  }

  selectMinInd(unsortedSubArr: number[]) {
    let minInd = 0;
    for (
      let unsortedInd = 0;
      unsortedInd < unsortedSubArr.length;
      unsortedInd++
    ) {
      if (unsortedSubArr[unsortedInd] < unsortedSubArr[minInd]) {
        minInd = unsortedInd;
      }
    }
    return minInd;
  }

  private sort(arr: number[]) {
    const result = arr;
    const n = result.length;

    for (let i = 0; i < n - 1; i++) {
      const minInd = this.selectMinInd(result.slice(i + 1, n));

      // swap
      const temp = result[minInd];
      result[minInd] = result[i];
      result[i] = temp;
    }
    return result;
  }
}
