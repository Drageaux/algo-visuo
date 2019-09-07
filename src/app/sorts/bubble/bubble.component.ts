import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SortComponent } from '../sort-component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortStatus } from 'src/app/classes/sort-status.enum';

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
    this.res.data = input;
    console.log([...this.res.data].map(x => x.value));
    let count = 0;

    // originally O(n^2) because looping n times per n elements
    for (let j = 0; j < this.res.data.length; j++) {
      console.log('index', j);
      // why this.res.data.length - j - 1?
      // because the largest has already bubbled to the last place
      for (let k = 0; k < this.res.data.length - j - 1; k++) {
        console.log(
          this.res.data[k].value + ' vs ' + this.res.data[k + 1].value
        );

        // 1. select swap target
        if (this.res.data[k].value > this.res.data[k + 1].value) {
          console.log('should swap');
          // 2. highlight preswap
          this.res.data[k].status = SortStatus.SORTING;
          this.res.data[k + 1].status = SortStatus.SORTING;

          // 2a. cloning to trigger change detection

          // 3. swap
          const temp = this.res.data[k];
          this.res.data[k] = this.res.data[k + 1];
          this.res.data[k + 1] = temp;
          console.log([...this.res.data]);
        }

        // 4. finalize highlight postswap
        if (k + 1 === this.res.data.length - j - 1) {
          console.log('hit the end');
          this.res.data[k + 1].status = SortStatus.SORTED;
        }
        // if (j )

        // 4a. cloning to trigger change detection
        count++;
      }
    }
    console.log('count:', count, 'result:', this.res);

    return;
  }

  swap(a, b) {}
}
