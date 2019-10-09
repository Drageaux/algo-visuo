import { SearchStatus } from './search-status.enum';

export type SearchGrid = SearchBlock[][];

export interface SearchBlock {
  x: number;
  y: number;
  status: SearchStatus;
  previousNode?: SearchBlock;
  distance: number;
}
