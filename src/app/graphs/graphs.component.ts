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
          '1.5s',
          keyframes([
            style({
              transform: 'scale(0.3)',
              backgroundColor: 'rgba(0, 0, 66, 0.75)',
              borderRadius: '100%',
              offset: 0
            }),
            style({
              backgroundColor: 'rgba(17, 104, 217, 0.75)',
              offset: 0.5
            }),
            style({
              transform: 'scale(1.2)',
              backgroundColor: 'rgba(0, 217, 159, 0.75)',
              offset: 0.75
            }),
            style({
              transform: 'scale(1)',
              backgroundColor: 'rgba(0, 190, 218, 0.75)',
              offset: 1
            })
          ])
        )
      ]),
      transition('* => highlighted', [
        animate(
          '1.5s',
          keyframes([
            style({
              transform: 'scale(0.6)',
              backgroundColor: 'rgb(255, 254, 106)',
              offset: 0
            }),
            style({
              transform: 'scale(1.2)',
              backgroundColor: 'rgb(255, 254, 106)',
              offset: 0.5
            }),
            style({
              transform: 'scale(1)',
              backgroundColor: 'rgb(255, 254, 106)',
              offset: 1
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
    // const performAnimation: FrameRequestCallback = i => {
    //   const request = requestAnimationFrame(() => performAnimation(i));

    //   const block = visitedBlocks[i];

    //   block.status =
    //     block.status === SearchStatus.UNVISITED
    //       ? SearchStatus.VISITED
    //       : block.status;
    // };

    for (let i = 0; i < visitedBlocks.length; i++) {
      const block = visitedBlocks[i];
      setTimeout(() => {
        block.animated = true;
      }, 30 * i);
    }

    setTimeout(() => {
      const shortestPathNodes = this.pathService.getNodesInShortestPathOrder(
        this.data[END_NODE_ROW][END_NODE_COL]
      );

      this.animateShortestPath(shortestPathNodes);
    }, 30 * visitedBlocks.length);
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
