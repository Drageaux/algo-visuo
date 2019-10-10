import { Injectable } from '@angular/core';
import { SearchBlock, SearchGrid } from '../classes/search-item';
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
  dijkstra(grid: SearchGrid, startNode, finishNode): SearchBlock[] {
    const visitedNodesInOrder: SearchBlock[] = [];
    startNode.distance = 0;
    // start node is 0 distance, so just start with that first
    const unvisitedNode = this.flattenGrid(grid, startNode);

    while (!!unvisitedNode.length) {
      this.sortNodesByDistance(unvisitedNode);
      const closestNode = unvisitedNode.shift();

      if (closestNode.status === SearchStatus.WALL) {
        // skip this loop if wall
        continue;
      } else if (closestNode.distance === Infinity) {
        // closest node is infinite distance, so we're stuck
        return visitedNodesInOrder;
      } else {
        switch (closestNode.status) {
          case SearchStatus.FINISH:
            visitedNodesInOrder.push(closestNode);
            return visitedNodesInOrder;
          // don't overwrite "status" of start node
          case SearchStatus.UNVISITED:
            closestNode.status = SearchStatus.VISITED;
            break;
          default:
            break;
        }
        visitedNodesInOrder.push(closestNode);
        this.updateUnvisitedNeighbors(closestNode, grid);
      }
    }
    return [];
  }

  // TODO: make more efficient with a different data structure
  private flattenGrid(
    grid: SearchGrid,
    moveToFront?: SearchBlock
  ): SearchBlock[] {
    const nodes = moveToFront ? [moveToFront] : [];
    for (const row of grid) {
      for (const node of row) {
        if (node !== moveToFront) {
          nodes.push(node);
        }
      }
    }
    console.log(nodes);
    return nodes;
  }

  // TODO: make more efficient data structure
  private sortNodesByDistance(unvisitedNodes: SearchBlock[]) {
    return unvisitedNodes.sort(
      (nodeA, nodeB) => nodeA.distance - nodeB.distance
    );
  }

  private updateUnvisitedNeighbors(block: SearchBlock, grid: SearchGrid) {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(block, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = block.distance + 1;
      neighbor.previousNode = block;
    }
    return unvisitedNeighbors;
  }

  private getUnvisitedNeighbors(block: SearchBlock, grid: SearchGrid) {
    const neighbors: SearchBlock[] = [];
    const { x, y } = block;

    // above
    if (y - 1 >= 0) {
      neighbors.push(grid[y - 1][x]);
    }
    // below
    if (y + 1 <= grid.length - 1) {
      neighbors.push(grid[y + 1][x]);
    }
    // left
    if (x - 1 >= 0) {
      neighbors.push(grid[y][x - 1]);
    }
    // right
    if (x + 1 <= grid[0].length - 1) {
      neighbors.push(grid[y][x + 1]);
    }
    // get only the ones without a node or not visited
    return neighbors.filter(
      b => b.status !== SearchStatus.VISITED && b.status !== SearchStatus.ORIGIN
    );
  }

  getNodesInShortestPathOrder(finishNode: SearchBlock): SearchBlock[] {
    const result = [];
    let currentNode = finishNode;
    while (!!currentNode) {
      result.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return result;
  }
}
