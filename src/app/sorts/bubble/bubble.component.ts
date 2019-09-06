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
export class BubbleComponent implements SortComponentInterface, OnInit {
  input: SortItem<number>[];
  sampleSize = 100;
  speed = 200;
  result$ = new BehaviorSubject<SortData>({
    data: [],
    sorted: 0
  });
  res: SortData = null;
  interval;
  subs = new SubSink();

  constructor() {}

  ngOnInit() {}
  
  onChangeSampleSize() {
    throw new Error("Method not implemented.");
  }
  runAll(): void {
    throw new Error("Method not implemented.");
  }
  stop(): void {
    throw new Error("Method not implemented.");
  }
}
