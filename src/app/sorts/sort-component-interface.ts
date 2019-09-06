import { SortItem } from '../classes/sort-item';
import { BehaviorSubject } from 'rxjs';
import { SortData } from '../classes/sort-data';
import { SubSink } from 'subsink';

export declare interface SortComponentInterface {
  input: SortItem<number>[];
  sampleSize: number;
  speed: number;
  // observable that emits the protected model
  result$: BehaviorSubject<SortData>;
  // protected model
  res: SortData;
  interval;
  // subscription cleaner
  subs: SubSink;

  /*************************************************************************/
  /************************* INPUT CHANGE DETECTION ************************/
  /*************************************************************************/
  onChangeSampleSize();

  /*************************************************************************/
  /**************************** BUTTON HANDLERS ****************************/
  /*************************************************************************/
  runAll(): void;
  stop(): void;
}
