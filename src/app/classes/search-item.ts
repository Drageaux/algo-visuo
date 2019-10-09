import { SearchStatus } from './search-status.enum';

export type SearchGrid = SearchBlock<Node>[][];

export interface SearchBlock<T> {
  item?: T;
  x: number;
  y: number;
}

export interface Node {
  status: SearchStatus;
}
