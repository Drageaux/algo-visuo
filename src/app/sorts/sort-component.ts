import { SortItem } from '../classes/sort-item';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { SortData } from '../classes/sort-data';
import { SubSink } from 'subsink';
import { RandomNumService } from '../services/random-num.service';
import { OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { SortStatus } from '../classes/sort-status.enum';
import { takeWhile, tap, map, switchMap } from 'rxjs/operators';

export abstract class SortComponent implements OnInit, OnDestroy {
  title = '';
  input: SortItem<number>[] = [];
  sampleSize = 100;
  speed = 200;
  period$ = new BehaviorSubject<number>(this.speed);
  // history of data
  history: Map<number, SortData>;
  stateId = 0;
  // protected model
  result$ = new BehaviorSubject<SortData>(null);
  interval;
  // subscription cleaner
  subs = new SubSink();

  constructor(
    private randomNum: RandomNumService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sampleSize = 50;
    this.onChangeSampleSize();
  }

  ngOnDestroy() {
    this.reset();
  }

  /*************************************************************************/
  /************************** HELPER/CLEANUP CREW **************************/
  /*************************************************************************/
  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.subs.unsubscribe();
    this.history = new Map();
    this.stateId = 0;

    const initData = {
      data: this.deepCopy(this.input),
      sorted: 0
    };
    this.history.set(0, initData);
    this.result$.next(this.history.get(0));
  }

  deepCopy(srcObj) {
    return JSON.parse(JSON.stringify(srcObj));
  }

  pushState(sData: SortData) {
    this.stateId++;
    this.history.set(this.stateId, this.deepCopy(sData));
  }

  printArray(arr: SortItem<number>[], wStatus = false) {
    console.log(arr.map(x => x.value + `${wStatus ? '|' + x.status : ''}`));
  }

  /*************************************************************************/
  /************************* INPUT CHANGE DETECTION ************************/
  /*************************************************************************/
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
          this.result$.next(x);
          currState++;
        })
      )
      .subscribe();
    this.period$.next(this.speed);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  protected sort(input: SortItem<number>[]) {
    throw new Error('Should override sort method');
  }
}
