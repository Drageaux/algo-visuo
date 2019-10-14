import { switchMap, map, takeWhile, tap } from 'rxjs/operators';
import { BehaviorSubject, interval } from 'rxjs';
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
import { SubSink } from 'subsink';

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
              backgroundColor: 'rgba(0, 217, 159, 0.75)',
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
  // need declare
  eSearchStatus = SearchStatus;
  // shared resources among graph path finders
  input: SearchGrid = [];
  cols = 50;
  rows = 50;
  speed = 50;
  speed$ = new BehaviorSubject<number>(50);
  // history of data
  history: Map<number, SearchGrid> = new Map();
  stateId = 0;
  // protected model
  result$ = new BehaviorSubject<SearchGrid>([]);
  // subscription cleaner
  subs = new SubSink();

  constructor(private pathService: PathingService) {}

  ngOnInit() {
    this.input = [];
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
      this.input.push(row);
    }

    // test
    this.input[START_NODE_ROW][START_NODE_COL].status = SearchStatus.ORIGIN;
    this.input[END_NODE_ROW][END_NODE_COL].status = SearchStatus.FINISH;
    for (let i = 5; i < 15; i++) {
      this.input[i][7].status = SearchStatus.WALL;
    }
    this.result$.next(this.input);
  }

  findPath() {
    this.ngOnInit();
    const startNode = this.input[START_NODE_ROW][START_NODE_COL];
    const finishNode = this.input[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = this.pathService.dijkstra(
      this.input,
      startNode,
      finishNode
    );
    console.log(this.history.size);
    this.animateDijkstra(visitedNodesInOrder);
  }

  animateDijkstra(visitedBlocks: SearchBlock[]) {
    const duration = 50;
    for (let i = 0; i < visitedBlocks.length; i++) {
      // const block = visitedBlocks[i];
      // const timerAmount = duration * i;
      // setTimeout(() => {
      //   block.animated = true;
      // }, timerAmount);
    }

    let currState = 0;
    this.subs.sink = this.speed$
      .pipe(
        tap(x => console.log(10000 / (x * 2))),
        switchMap(speed => interval(1000 / (speed * 2))),
        map(() => visitedBlocks[currState]),
        takeWhile(x => x != null),
        tap(x => {
          // this.history.delete(currState);
          // console.log(x);

          x.animated = true;
          currState++;
        })
      )
      .subscribe();

    setTimeout(() => {
      const shortestPathNodes = this.pathService.getNodesInShortestPathOrder(
        this.input[END_NODE_ROW][END_NODE_COL]
      );

      this.animateShortestPath(shortestPathNodes);
    }, 1 * visitedBlocks.length);
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
