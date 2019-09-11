import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortItem } from 'src/app/classes/sort-item';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { SortsComponent } from '../sorts.component';

/**
 * The selection sort algorithm sorts an array by repeatedly finding the minimum element
 * (considering ascending order) from unsorted part and putting it at the beginning.
 * The algorithm maintains two subarrays in a given array.
 * 1) The subarray which is already sorted.
 * 2) Remaining subarray which is unsorted.
 */
@Component({
  selector: 'app-selection',
  templateUrl: '../sort-component.html',
  styleUrls: ['../sort-component.scss']
})
export class SelectionComponent {
  title = 'Selection Sort';

  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {}
}
