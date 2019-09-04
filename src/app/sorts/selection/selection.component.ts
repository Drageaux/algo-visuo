import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { BehaviorSubject, Observable, of, empty, interval } from 'rxjs';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortItem } from 'src/app/classes/sort-item';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import {
  delay,
  takeUntil,
  takeWhile,
  tap,
  map,
  repeat,
  expand,
  switchMap
} from 'rxjs/operators';
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
  speed = 200;
  result = new BehaviorSubject<{ data: SortItem<number>[]; sorted: number }>({
    data: [],
    sorted: 0
  });
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
    this.result.next({ data: this.input, sorted: 0 });
  }

  runAll() {
    // console.time(`selection sort from index "${startIndex}"`);
    // while (this.numbersSorted < this.input.length) {
    //   this.onStep();
    // }
    // console.timeEnd(`selection sort from index "${startIndex}"`);
    const speed = this.speed;

    // not exactly sure why delay with speed "/ 2" would still catch up with speed
    interval(speed)
      .pipe(
        takeWhile(
          () => this.result.value.sorted < this.result.value.data.length
        ),
        map(() => this.result.value),
        map(({ data: arr, sorted }) => {
          const minInd =
            sorted + this.selectMinInd(arr.slice(sorted, arr.length));

          // highlight
          arr[minInd].status = SortStatus.SORTING;
          arr[sorted].status = SortStatus.SORTING;
          this.result.next({ data: arr, sorted });
          return { arr, sorted, minInd };
        }),
        delay(speed / 2),
        map(({ arr, sorted, minInd }) => {
          // swap
          const temp = arr[minInd];
          arr[minInd] = arr[sorted];
          arr[sorted] = temp;
          arr[sorted].status = SortStatus.SORTED;
          const newSorted = sorted + 1;
          this.result.next({ data: arr, sorted: newSorted });
          return this.result.value;
        }),
        delay(speed / 2)
      )
      .subscribe(x => console.log(x));
  }

  onStep() {
    const arr = Object.assign([], this.result.value);
    if (this.result.value.sorted >= arr.length) {
      return;
    }

    const minInd =
      this.result.value.sorted +
      this.selectMinInd(arr.slice(this.result.value.sorted, arr.length));

    // highlight
    arr[minInd].status = SortStatus.SORTING;
    arr[this.result.value.sorted].status = SortStatus.SORTING;
    this.result.next(arr);

    // swap
    const temp = arr[minInd];
    arr[minInd] = arr[this.result.value.sorted];
    arr[this.result.value.sorted] = temp;
    arr[this.result.value.sorted].status = SortStatus.SORTED;

    this.result.next({ data: arr, sorted: this.result.value.sorted + 1 });
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
