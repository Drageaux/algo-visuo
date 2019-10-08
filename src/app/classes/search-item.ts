import { SearchStatus } from './search-status.enum';

export interface SearchItem {
  status: SearchStatus;
}

export interface SearchItem2D extends SearchItem {
  x: number;
  y: number;
}
