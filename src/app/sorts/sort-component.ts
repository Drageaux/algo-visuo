import { SortItem } from '../classes/sort-item';
import { BehaviorSubject, interval } from 'rxjs';
import { SortData } from '../classes/sort-data';
import { SubSink } from 'subsink';
import { RandomNumService } from '../services/random-num.service';
import { OnDestroy, OnInit } from '@angular/core';
import { SortStatus } from '../classes/sort-status.enum';
import { takeWhile, tap, delay } from 'rxjs/operators';

export abstract class SortComponent implements OnInit, OnDestroy {
  input: SortItem<number>[] = [];
  sampleSize = 100;
  speed = 200;
  // observable that emits the protected model
  result$ = new BehaviorSubject<SortData>({
    data: [],
    sorted: 0
  });
  // protected model
  res: SortData = null;
  interval;
  // subscription cleaner
  subs = new SubSink();

  constructor(private randomNum: RandomNumService) {}

  ngOnInit() {
    this.sampleSize = 50;
    this.onChangeSampleSize();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    clearInterval();
  }

  /*************************************************************************/
  /************************** HELPER/CLEANUP CREW **************************/
  /*************************************************************************/
  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.subs.unsubscribe();
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
    this.result$.next({ data: this.input, sorted: 0 });
  }

  /*************************************************************************/
  /**************************** BUTTON HANDLERS ****************************/
  /*************************************************************************/
  runAll() {
    this.reset();

    // rerun sorting the model
    this.sort(this.input, this.speed);
    // grab the private model every rxjs interval
    this.subs.sink = interval(this.speed)
      .pipe(
        takeWhile(() => this.interval && this.res.sorted < this.input.length),
        tap(() => this.result$.next(this.res)),
        delay(this.speed / 2),
        tap(() => this.result$.next(this.res)),
        delay(this.speed / 2)
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
