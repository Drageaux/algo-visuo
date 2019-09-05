import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ViewChild,
  HostListener,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortItem } from 'src/app/classes/sort-item';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { delay, takeWhile, tap, map } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { SortData } from 'src/app/classes/sort-data';

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
export class SelectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() input: SortItem<number>[] = [];
  sampleSize = 100;
  speed = 200;
  eSortStatus = SortStatus;
  @ViewChild('graph', { static: false }) graphEl;
  barWidth = '1px';
  result$ = new BehaviorSubject<SortData>({
    data: [],
    sorted: 0
  });

  private subs = new SubSink();
  // model
  private res: SortData = null;
  private interval;

  constructor(
    private randomNum: RandomNumService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sampleSize = 50;
    this.onChangeSampleSize();
  }

  @HostListener('window:resize') onResize() {
    // guard against resize before view is rendered
    if (this.graphEl) {
      this.barWidth =
        this.graphEl.nativeElement.clientWidth / this.sampleSize + 'px';
      this.cd.detectChanges();
    }
  }

  ngAfterViewInit() {
    this.onResize();
  }

  reset() {
    this.removeRunningIntervals();
    this.onResize();
  }

  removeRunningIntervals() {
    clearInterval(this.interval);
    this.interval = null;
    this.subs.unsubscribe();
  }

  onChangeSampleSize() {
    this.input = this.randomNum.generate(this.sampleSize).map(x => ({
      value: x,
      status: SortStatus.UNSORTED
    }));
    this.reset();
    this.result$.next({ data: this.input, sorted: 0 });
  }

  runAll() {
    this.reset();

    const speed = this.speed;
    // rerun sorting the model
    this.sortInBackground(this.input, speed);
    // grab the private model every rxjs interval
    this.subs.sink = interval(speed)
      .pipe(
        takeWhile(() => this.interval && this.res.sorted < this.input.length),
        tap(() => this.result$.next(this.res)),
        delay(speed / 2),
        tap(() => this.result$.next(this.res)),
        map(() => this.res),
        delay(speed / 2)
      )
      .subscribe();
  }

  private sortInBackground(
    input: SortItem<number>[],
    iterationDuration = 300,
    from = 0
  ) {
    // ! input has nested objects, so changing that object even via
    // ! Object.assign would also cause side effects
    const currentResult = {
      data: JSON.parse(JSON.stringify(input)),
      sorted: from
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

  stop() {
    clearInterval(this.interval);
    this.interval = null;
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    clearInterval();
  }
}
