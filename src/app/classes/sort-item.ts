import { SortStatus } from './sort-status.enum';

export interface SortItem<T> {
  value: T;
  status: SortStatus;
}
