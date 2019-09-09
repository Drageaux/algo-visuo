import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SortComponent } from '../sort-component';
import { SortItem } from 'src/app/classes/sort-item';
import { RandomNumService } from 'src/app/services/random-num.service';
import { SortStatus } from 'src/app/classes/sort-status.enum';
import { SortData } from 'src/app/classes/sort-data';

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
    const currentResult = {
      data: JSON.parse(JSON.stringify(input)),
      sorted: 0
    };
    this.history.set(this.stateId, currentResult);
    // console.log([...currentResult.data].map(x => x.value));
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
    for (let j = 0; j < currentResult.data.length; j++) {
      let swapped = false;
      // why result.length - j - 1?
      // because the largest has already bubbled to the last place
      for (
        let k = 0;
        k < currentResult.data.length - this.res.sorted - 1;
        k++
      ) {
        // 1. select swap target
        if (currentResult.data[k].value > currentResult.data[k + 1].value) {
          // 2. highlight preswap
          currentResult.data[k].status = SortStatus.SORTING;
          currentResult.data[k + 1].status = SortStatus.SORTING;

          // 2a. cloning to trigger change detection
          this.pushState(currentResult);

          // 3. swap
          const temp = currentResult.data[k];
          currentResult.data[k] = currentResult.data[k + 1];
          currentResult.data[k + 1] = temp;
          // console.log([...currentResult.data]);
          this.res.data = [...currentResult.data];
          swapped = true;
          this.pushState(currentResult);
        }

        // 4. finalize highlight postswap
        if (k + 1 === currentResult.data.length - j - 1) {
          console.log('hit the end');
          currentResult.data[k + 1].status = SortStatus.SORTED;
          this.pushState(currentResult);
        } else if (k === currentResult.data.length - j - 1) {
          currentResult.data[k].status = SortStatus.SORTED;
          this.pushState(currentResult);
        }

        // 4a. cloning to trigger change detection
        count++;

        // break out of the inner loop if it didn't swap on first run
        // if (!swapped) {
        //   break;
        // }
      }

      console.log(this.res.data.length - this.res.sorted - 1);
      // currentResult.data[this.res.data.length - this.res.sorted - 1].status =
      //   SortStatus.SORTED;
      // currentResult.sorted += 1;
      // this.pushState(currentResult);
    }
    console.log('count:', count, 'result:', currentResult.data);

    console.log(this.history);
    return;
  }

  swap(a, b) {}

  pushState(sData: SortData) {
    this.stateId++;
    this.history.set(this.stateId, {
      data: [...sData.data],
      sorted: sData.sorted
    });
  }
}
