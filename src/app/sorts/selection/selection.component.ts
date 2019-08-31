import { Component, OnInit, Input } from '@angular/core';

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
  @Input() arr = [64, 25, 12, 22, 11];
  constructor() {}

  ngOnInit() {
    console.log(this.sort(this.arr));
  }

  private sort(arr: number[]) {
    const result = Object.assign([], arr);
    const n = result.length;

    for (let i = 0; i < n - 1; i++) {
      let minInd = i;
      for (let unsortedInd = i + 1; unsortedInd < n; unsortedInd++) {
        if (result[unsortedInd] < result[minInd]) {
          minInd = unsortedInd;
        }
      }

      // swap
      const temp = result[minInd];
      result[minInd] = result[i];
      result[i] = temp;
    }
    return result;
  }
}
