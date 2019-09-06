import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { SortData } from 'src/app/classes/sort-data';
import { SubSink } from 'subsink';
import { SortComponentInterface } from '../sort-component-interface';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { takeWhile, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent extends SortComponentInterface
  implements OnInit, OnDestroy {
  constructor(private randomNumService: RandomNumService) {
    super(randomNumService);
  }

  /*************************************************************************/
  /**************************** BUBBLE SORT ONLY ***************************/
  /*************************************************************************/
  sort(input: SortItem<number>[], speed: number) {
    throw new Error('Method not implemented.');
  }
}
