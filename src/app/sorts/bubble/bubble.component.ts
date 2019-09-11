import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SortsComponent } from '../sorts.component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { SortData } from 'src/app/classes/sort-data';

@Component({
  selector: 'app-bubble',
  templateUrl: '../sort-component.html',
  styleUrls: ['../sort-component.scss']
})
export class BubbleComponent extends SortsComponent {
  title = 'Bubble Sort';

  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {
    super(randomNumService, cd);
  }
}
