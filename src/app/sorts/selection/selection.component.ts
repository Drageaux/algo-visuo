import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortItem } from 'src/app/classes/sort-item';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { delay, takeUntil, takeWhile, tap, map, repeat } from 'rxjs/operators';
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
  @Input() input: SortItem<number>[] = [];
  sampleSize = 100;
  result = new BehaviorSubject<SortItem<number>[]>([]);
  res;
  numbersSorted = 0;
  eSortStatus = SortStatus;
  constructor(
    private randomNum: RandomNumService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sampleSize = 50;
    this.input = this.randomNum.generate(this.sampleSize).map(x => ({
      value: x,
      status: SortStatus.UNSORTED
    }));
    this.result.next(this.input);
  }

  runAll() {
    const startIndex = this.numbersSorted;
    // console.time(`selection sort from index "${startIndex}"`);
    // while (this.numbersSorted < this.input.length) {
    //   this.onStep();
    // }
    // console.timeEnd(`selection sort from index "${startIndex}"`);
    this.res = of(this.result.value)
      .pipe(
        repeat(this.sampleSize),
        map(arr => {
          const minInd =
            this.numbersSorted +
            this.selectMinInd(arr.slice(this.numbersSorted, arr.length));

          // highlight
          arr[minInd].status = SortStatus.SORTING;
          arr[this.numbersSorted].status = SortStatus.SORTING;
          this.result.next(arr);
          return { arr, minInd };
        }),
        delay(200),
        map(({ arr, minInd }) => {
          // swap
          const temp = arr[minInd];
          arr[minInd] = arr[this.numbersSorted];
          arr[this.numbersSorted] = temp;
          arr[this.numbersSorted].status = SortStatus.SORTED;
          this.numbersSorted++;
          this.result.next(arr);
          return arr;
        }),
        delay(200)
      )
      .subscribe(x => console.log(x));
  }

  onStep() {
    const arr = Object.assign([], this.result.value);
    if (this.numbersSorted >= arr.length) {
      return;
    }

    const minInd =
      this.numbersSorted +
      this.selectMinInd(arr.slice(this.numbersSorted, arr.length));

    // highlight
    arr[minInd].status = SortStatus.SORTING;
    arr[this.numbersSorted].status = SortStatus.SORTING;
    this.result.next(arr);

    // swap
    const temp = arr[minInd];
    arr[minInd] = arr[this.numbersSorted];
    arr[this.numbersSorted] = temp;
    arr[this.numbersSorted].status = SortStatus.SORTED;
    this.numbersSorted++;
    this.result.next(arr);
  }

  selectMinInd(unsortedSubArr: SortItem<number>[]) {
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

  private sort(arr: SortItem<number>[]) {
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
