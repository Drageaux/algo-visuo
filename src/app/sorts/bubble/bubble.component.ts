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
    this.res.sorted = 0;
    let result = this.res.data;
    console.log([...result].map(x => x.value));
    let count = 0;

    let ready = true;
    this.interval = setInterval(() => {
      // ! need to skip if not finished with timed async logic
      if (!ready) {
        return;
      }
      ready = false;
    }, speed);

    // originally O(n^2) because looping n times per n elements
    for (let j = 0; j < result.length; j++) {
      console.log('index', j);
      // why result.length - j - 1?
      // because the largest has already bubbled to the last place
      for (let k = 0; k < result.length - this.res.sorted - 1; k++) {
        // console.log(result[k].value + ' vs ' + result[k + 1].value);
        console.log(`sorted: ${this.res.sorted}`);

        // 1. select swap target
        if (result[k].value > result[k + 1].value) {
          console.log('should swap');
          // 2. highlight preswap
          result[k].status = SortStatus.SORTING;
          result[k + 1].status = SortStatus.SORTING;

          // 2a. cloning to trigger change detection
          this.res.data = [...result];

          // 3. swap
          const temp = result[k];
          result[k] = result[k + 1];
          result[k + 1] = temp;
          console.log([...result]);
          this.res.data = [...result];
        }

        // 4. finalize highlight postswap
        if (k + 1 === result.length - j - 1) {
          console.log('hit the end');
        }

        // 4a. cloning to trigger change detection
        count++;
      }

      console.log(this.res.data.length - this.res.sorted - 1);
      result[this.res.data.length - this.res.sorted - 1].status =
        SortStatus.SORTED;
      this.res.sorted++;
    }
    console.log('count:', count, 'result:', result);

    return;
  }

  swap(a, b) {}
}
