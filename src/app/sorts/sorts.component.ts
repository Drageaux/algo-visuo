import { environment } from './../../environments/environment';
import { SortType } from '../classes/sort-type.enum';
import { SortItem } from '../classes/sort-item';
import { BehaviorSubject, interval } from 'rxjs';
import { SortData } from '../classes/sort-data';
import { SubSink } from 'subsink';
import { RandomNumService } from '../services/random-num.service';
import { OnDestroy, OnInit, ChangeDetectorRef, Component } from '@angular/core';
import { SortStatus } from '../classes/sort-status.enum';
import { takeWhile, tap, map, switchMap } from 'rxjs/operators';
import { SortingService } from '../services/sorting.service';

@Component({
  selector: 'app-sorts',
  templateUrl: './sorts.component.html',
  styleUrls: ['./sorts.component.scss']
})
export class SortsComponent implements OnInit, OnDestroy {
  // need to declare
  env = environment;
  eSortType = SortType;
  // select sort type
  currSortType: string = SortType.SELECTION;
  // shared resources among sorts
  input: SortItem<number>[] = [];
  sampleSize = 100;
  speed = 200;
  period$ = new BehaviorSubject<number>(this.speed);
  // history of data
  history: Map<number, SortData>;
  stateId = 0;
  // protected model
  result$ = new BehaviorSubject<SortData>(null);
  // subscription cleaner
  subs = new SubSink();

  constructor(
    public sortingService: SortingService,
    private randomNum: RandomNumService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (!this.env.production) {
      this.sampleSize = 10;
      this.speed = 500;
      this.currSortType = SortType.MERGE;
    }
    this.onChangeSampleSize();
  }

  ngOnDestroy() {
    this.reset();
  }

  /*************************************************************************/
  /************************** HELPER/CLEANUP CREW **************************/
  /*************************************************************************/
  reset() {
    this.subs.unsubscribe();
    this.history = new Map();
    this.stateId = 0;

    const initData = {
      data: this.sortingService.deepCopy(this.input),
      sorted: 0
    };
    this.history.set(0, initData);
    this.result$.next(this.history.get(0));
  }

  /*************************************************************************/
  /************************* INPUT CHANGE DETECTION ************************/
  /*************************************************************************/
  onSortTypeChange($event: SortType) {
    this.currSortType = $event;
    this.reset();
  }

  onChangeSampleSize() {
    // preserve this order
    this.input = this.randomNum.generate(this.sampleSize).map(x => ({
      value: x,
      status: SortStatus.UNSORTED
    }));
    this.reset();
  }

  /*************************************************************************/
  /**************************** BUTTON HANDLERS ****************************/
  /*************************************************************************/
  runAll() {
    this.reset();

    // rerun sorting the model
    this.sort(this.input);
    console.log(this.history.size);

    // TODO: start animation when done sorting
    let currState = 0;
    this.subs.sink = this.period$
      .pipe(
        switchMap(speed => interval(speed / 2)),
        map(() => this.history.get(currState)),
        takeWhile(x => x != null),
        tap(x => {
          this.history.delete(currState);
          this.result$.next(x);
          currState++;
        })
      )
      .subscribe();
    this.period$.next(this.speed);
  }

  /**
   * Stop animations and background processes
   */
  stop() {
    this.subs.unsubscribe();
  }

  protected sort(input: SortItem<number>[]) {
    switch (this.currSortType) {
      case SortType.SELECTION:
        this.sortingService.selectionSort(input, this.history);
        break;
      case SortType.BUBBLE:
        this.sortingService.bubbleSort(input, this.history);
        break;
      case SortType.INSERTION:
        this.sortingService.insertionSort(input, this.history);
        break;
      case SortType.MERGE:
        this.sortingService.mergeSort(input, this.history);
        break;
      default:
        throw new Error('Sort type not implemented yet.');
        break;
    }
  }
}
