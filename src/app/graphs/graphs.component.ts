import { Component, OnInit, HostBinding } from '@angular/core';
import { SearchGrid, SearchBlock } from '../classes/search-item';
import { SearchStatus } from '../classes/search-status.enum';
import { PathingService } from '../services/pathing.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  useAnimation
  // ...
} from '@angular/animations';

const START_NODE_ROW = 10;
const START_NODE_COL = 3;
const END_NODE_ROW = 10;
const END_NODE_COL = 15;

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
  animations: [
    trigger('status', [
      state(
        'visited',
        style({
          backgroundColor: 'rgba(0, 190, 218, 0.75)'
        })
      ),
      transition('* => visited', [
        animate(
          '1.5s 0s ease-out',
          keyframes([
            style({
              transform: 'scale(0.3)',
              backgroundColor: 'rgba(0, 0, 66, 0.75)',
              borderRadius: '50%',
              offset: 0
            }),
            style({
              transform: 'scale(0.7)',
              backgroundColor: 'rgba(17, 104, 217, 0.75)',
              offset: 0.4
            }),
            style({
              transform: 'scale(1.2)',
              backgroundColor: 'rgba(0, 217, 159, 0.75)',
              offset: 0.75
            }),
            style({
              transform: 'scale(1)',
              backgroundColor: 'rgba(0, 190, 218, 0.75)',
              borderRadius: '0',
              offset: 1
            })
          ])
        )
      ]),
      state(
        'highlighted',
        style({
          transform: 'scale(1)',
          backgroundColor: 'rgb(255, 254, 106)',
          offset: 1
        })
      ),
      transition('* => highlighted', [
        animate(
          '1.5s',
          keyframes([
            style({
              transform: 'scale(0.6)',
              backgroundColor: 'rgb(255, 254, 106)'
            }),
            style({
              transform: 'scale(1.2)',
              backgroundColor: 'rgb(255, 254, 106)'
            }),
            style({
              transform: 'scale(1)',
              backgroundColor: 'rgb(255, 254, 106)'
            })
          ])
        )
      ])
    ])
  ]
})
export class GraphsComponent implements OnInit {
  cols = 50;
  rows = 50;
  data: SearchGrid = [];
  eSearchStatus = SearchStatus;

  constructor(private pathService: PathingService) {}

  ngOnInit() {
    for (let y = 0; y < this.rows; y++) {
      const row = [];
      for (let x = 0; x < this.cols; x++) {
        row.push({
          x,
          y,
          distance: Infinity,
          status: SearchStatus.UNVISITED
        } as SearchBlock);
      }
      this.data.push(row);
    }

    // test
    this.data[START_NODE_ROW][START_NODE_COL].status = SearchStatus.ORIGIN;
    this.data[END_NODE_ROW][END_NODE_COL].status = SearchStatus.FINISH;
    for (let i = 5; i < 15; i++) {
      this.data[i][7].status = SearchStatus.WALL;
    }
  }

  findPath() {
    const startNode = this.data[START_NODE_ROW][START_NODE_COL];
    const finishNode = this.data[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = this.pathService.dijkstra(
      this.data,
      startNode,
      finishNode
    );
    this.animateDijkstra(visitedNodesInOrder);
  }

  animateDijkstra(visitedBlocks: SearchBlock[]) {
    const interval = 50;
    for (let i = 0; i < visitedBlocks.length; i++) {
      const block = visitedBlocks[i];

      // batching so it doesn't update 1 by 1
      const batchAmount = 2;
      const timerAmount = interval * batchAmount * Math.floor(i / batchAmount);
      setTimeout(() => {
        block.animated = true;
      }, timerAmount);
    }

    setTimeout(() => {
      const shortestPathNodes = this.pathService.getNodesInShortestPathOrder(
        this.data[END_NODE_ROW][END_NODE_COL]
      );

      this.animateShortestPath(shortestPathNodes);
    }, interval * visitedBlocks.length);
  }

  animateShortestPath(shortestPathNodes: SearchBlock[]) {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      const block = shortestPathNodes[i];
      // reset color for visualization
      block.animated = false;
      block.status =
        block.status === SearchStatus.VISITED
          ? SearchStatus.HIGHLIGHTED
          : block.status;
      setTimeout(() => {
        block.animated = true;
      }, 20 * i);
    }
  }

  onBlockClick(block: SearchBlock) {
    console.log(`x: ${block.x} y: ${block.y}`);
  }
}
