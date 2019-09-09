import { SortItem } from '../classes/sort-item';
import { BehaviorSubject, interval } from 'rxjs';
import { SortData } from '../classes/sort-data';
import { SubSink } from 'subsink';
import { RandomNumService } from '../services/random-num.service';
import { OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { SortStatus } from '../classes/sort-status.enum';
import { takeWhile, tap, delay, skip } from 'rxjs/operators';

export abstract class SortComponent implements OnInit, OnDestroy {
  input: SortItem<number>[] = [];
  sampleSize = 100;
  speed = 200;
  // history of data
  history: Map<number, SortData>;
  stateId = 0;
  // protected model
  res: SortData = {
    data: [],
    sorted: 0
  };
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
    this.res = { data: this.input, sorted: 0 };
    this.history.set(this.stateId, { data: this.input, sorted: 0 });
    this.result$.next(this.history.get(this.stateId));
  }

  /*************************************************************************/
  /**************************** BUTTON HANDLERS ****************************/
  /*************************************************************************/
  runAll() {
    this.reset();

    // rerun sorting the model
    this.sort(this.input, this.speed);

    // TODO: start animation when done sorting
    let currState = 0;
    this.subs.sink = interval(this.speed / 2)
      .pipe(
        takeWhile(() => this.history.get(currState) != null),
        tap(() => {
          this.result$.next(this.history.get(currState));
          currState++;
        })
      )
      .subscribe();
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  protected sort(input: SortItem<number>[], speed: number) {
    throw new Error('Should override sort method');
  }
}
