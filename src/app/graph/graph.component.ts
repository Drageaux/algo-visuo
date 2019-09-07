import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { SortItem } from '../classes/sort-item';
import { SortStatus } from '../classes/sort-status.enum';
import { BehaviorSubject } from 'rxjs';
import { SortData } from '../classes/sort-data';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges {
  constructor(private cd: ChangeDetectorRef) {}
  // ! destructured the data and sort properties to trigger change detection
  // ! because a nested object won't
  @Input() data: SortItem<number>[]; // required
  @Input() sorted: number; // required
  @Input() sampleSize: number; // required
  @ViewChild('graph', { static: false }) graphEl;
  barWidth = '1px';

  eSortStatus = SortStatus;

  count = 0;

  ngOnInit() {}

  @HostListener('window:resize') onResize() {
    // guard against resize before view is rendered
    if (this.graphEl) {
      // -1 to make sure bars don't get crunched up and overflow
      this.barWidth =
        (this.graphEl.nativeElement.clientWidth - 1) / this.sampleSize + 'px';
      this.cd.detectChanges();
    }
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.onResize();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.sampleSize) {
      this.onResize();
    }
    if (simpleChanges.data) {
      this.count++;
      console.log(this.count, simpleChanges.data);
    }
  }
}
