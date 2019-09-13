import { SortItem } from './sort-item';

export interface SortData {
  data: SortItem<number>[];
  sorted: number;
}
