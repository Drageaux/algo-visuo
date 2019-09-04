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

  // TODO: secured model
  private res = null;
  private interval;

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

  // TODO: controller should only fetch model at intervals
  runAll() {
    // if (this)
    // console.time(`selection sort from index "${startIndex}"`);
    // while (this.numbersSorted < this.input.length) {
    //   this.onStep();
    // }
    // console.timeEnd(`selection sort from index "${startIndex}"`);

    const speed = 300;

    this.sortInBackground(this.input, 300);
    // not exactly sure why delay with speed "/ 2" would still catch up with speed
    interval(speed)
      .pipe(
        takeWhile(() => this.interval && this.res.sorted < this.input.length),
        tap(() => this.result.next(this.res)),
        delay(speed / 2),
        tap(() => this.result.next(this.res)),
        map(() => this.res),
        delay(speed / 2)
      )
      .subscribe(x => console.log(this.input));
  }

  sortInBackground(
    input: SortItem<number>[],
    iterationDuration = 300,
    from = 0
  ) {
    clearInterval(this.interval);
    this.interval = null;
    console.log('clearing', this.interval);

    // ! input has nested objects, so changing that object even via
    // ! Objectassign would also cause side effects
    const currentResult = {
      data: JSON.parse(JSON.stringify(input)),
      sorted: from
    };

    this.interval = setInterval(() => {
      if (currentResult.sorted >= input.length) {
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

  pause() {
    clearInterval(this.interval);
    this.interval = null;
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
