import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortData } from 'src/app/classes/sort-data';
import { SubSink } from 'subsink';
import { SortComponentInterface } from '../sort-component-interface';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent
  implements SortComponentInterface, OnInit, OnDestroy  {
  input: SortItem<number>[] = [];
  sampleSize = 100;
  speed = 200;
  result$ = new BehaviorSubject<SortData>({
    data: [],
    sorted: 0
  });
  res: SortData = null;
  interval;
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

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.subs.unsubscribe();
  }

  onChangeSampleSize() {
    // preserve this order
    this.input = this.randomNum.generate(this.sampleSize).map(x => ({
      value: x,
      status: SortStatus.UNSORTED
    }));
    this.reset();
    this.result$.next({ data: this.input, sorted: 0 });
  }

  runAll() {
    this.reset();

    // rerun sorting the model
    this.sortInBackground(this.input, this.speed);
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
}
