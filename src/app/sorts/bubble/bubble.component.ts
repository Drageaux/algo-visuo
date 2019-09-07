import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  constructor(randomNumService: RandomNumService, cd: ChangeDetectorRef) {
    super(randomNumService, cd);
  }

  ngOnInit() {
    this.sampleSize = 10;
    this.onChangeSampleSize();
  }

  /*************************************************************************/
  /**************************** BUBBLE SORT ONLY ***************************/
  /*************************************************************************/
  sort(input: SortItem<number>[], speed: number) {
    let result = this.input;
    console.log([...result]);

    // originally O(n^2) because looping n times per n elements
    for (let i = 0; i < result.length; i++) {
      console.log(result[i]);
      // not sure why result.length - i - 1
      for (let j = 0; j < result.length - 1; j++) {
        console.log(result[j].value + ' vs ' + result[j + 1].value);
        if (result[j].value > result[j + 1].value) {
          console.log('should swap');
          const temp = result[j];
          result[j] = result[j + 1];
          result[j + 1] = temp;
          console.log([...result]);
        }
      }
    }
    console.log(result);

    return;
  }

  swap(a, b) {}
}
