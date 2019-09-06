import { SortItem } from '../classes/sort-item';
import { BehaviorSubject } from 'rxjs';
import { SortData } from '../classes/sort-data';
import { SubSink } from 'subsink';
import { RandomNumService } from '../services/random-num.service';
import { OnDestroy, OnInit } from '@angular/core';
import { SortStatus } from '../classes/sort-status.enum';

export abstract class SortComponentInterface implements OnInit, OnDestroy {
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
    console.log('Should replace with fancy sorting algorithms');
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
