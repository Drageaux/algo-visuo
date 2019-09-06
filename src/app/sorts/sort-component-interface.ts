import { SortItem } from '../classes/sort-item';

export declare interface SortComponentInterface {
  runAll(): void;
  stop(): void;
  sortInBackground(input: SortItem<any>[], speed: number): void;
}
