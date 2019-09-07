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
  // protected model
  res: SortData = {
    data: [],
    sorted: 0
  };
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
    this.res = { data: this.input, sorted: 0 };
  }

  /*************************************************************************/
  /**************************** BUTTON HANDLERS ****************************/
  /*************************************************************************/
  runAll() {
    this.reset();

    // rerun sorting the model
    this.sort(this.input, this.speed);
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
  }

  protected sort(input: SortItem<number>[], speed: number) {
    throw new Error('Should override sort method');
  }
}
