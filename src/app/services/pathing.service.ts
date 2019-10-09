import { Injectable } from '@angular/core';
import { SearchGrid, SearchBlock, Node } from '../classes/search-item';
import { SearchStatus } from '../classes/search-status.enum';

// reserved for service DFS, BFS, Dijkstra and some other graphs
@Injectable({
  providedIn: 'root'
})
export class PathingService {
  constructor() {}

  /*************************************************************************/
  /******************************** DIJKSTRA *******************************/
  /*************************************************************************/
  dijkstra(grid: SearchGrid, startNode, finishNode) {
    console.log(grid);
    this.flattenGrid(grid);
    return [];
  }

  flattenGrid(grid: SearchGrid): SearchBlock<Node>[] {
    const allUnvisitedBlocks = grid.reduce((acc, val) => acc.concat(val), []);
    this.animateDijkstra(allUnvisitedBlocks);
    return [];
  }

  animateDijkstra(visitedBlocks) {
    for (let i = 0; i < visitedBlocks.length; i++) {
      setTimeout(() => {
        const block = visitedBlocks[i];
        if (block && block.item) {
          block.item.status = SearchStatus.VISITED;
        } else {
          block.item = { status: SearchStatus.VISITED };
        }
      }, 10 * i);
    }
  }
}
