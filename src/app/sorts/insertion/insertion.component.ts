import { Component, ChangeDetectorRef } from '@angular/core';
import { SortsComponent } from '../sorts.component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortData } from 'src/app/classes/sort-data';
import { SortStatus } from 'src/app/classes/sort-status.enum';

@Component({
  selector: 'app-insertion',
  templateUrl: '../sort-component.html',
  styleUrls: ['../sort-component.scss']
})
export class InsertionComponent extends SortsComponent {
  title = 'Insertion Sort';

  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {
    super(randomNumService, cd);
  }
}
