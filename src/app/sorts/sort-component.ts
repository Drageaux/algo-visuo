import { SortItem } from '../classes/sort-item';
import { BehaviorSubject, interval } from 'rxjs';
import { SortData } from '../classes/sort-data';
import { SubSink } from 'subsink';
import { RandomNumService } from '../services/random-num.service';
import { OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { SortStatus } from '../classes/sort-status.enum';
import { takeWhile, tap, delay, skip, map } from 'rxjs/operators';

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

    const initData = {
      data: this.deepCopy([...this.input]),
      sorted: 0
    };

    this.history.set(0, this.deepCopy(initData));

    const test = this.history.get(0);
    for (let i = 0; i < initData.data.length; i++) {
      console.log(`is same object? ${this.input[i] === test[i]}`);
    }
    this.result$.next(this.history.get(0));
  }

  deepCopy(srcObj) {
    return JSON.parse(JSON.stringify(srcObj));
  }

  pushState(sData: SortData) {
    this.stateId++;
    this.history.set(this.stateId, this.deepCopy(sData));
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
        map(() => this.history.get(currState)),
        takeWhile(x => x != null),
        tap(x => {
          this.result$.next(x);
          console.log(this.history);
          currState++;
        })
      )
      .subscribe(x => console.log(x.data.map(v => v.value)));
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  protected sort(input?: SortItem<number>[], speed?: number) {
    throw new Error('Should override sort method');
  }
}
