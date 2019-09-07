import { Component, OnInit, OnDestroy } from '@angular/core';
import { SortComponent } from '../sort-component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent extends SortComponent
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
