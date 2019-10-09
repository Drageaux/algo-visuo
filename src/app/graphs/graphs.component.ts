import { Component, OnInit } from '@angular/core';
import { SearchGrid, Node, SearchBlock } from '../classes/search-item';
import { SearchStatus } from '../classes/search-status.enum';
import { PathingService } from '../services/pathing.service';

const START_NODE_ROW = 10;
const START_NODE_COL = 3;
const END_NODE_ROW = 10;
const END_NODE_COL = 11;

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
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
        row.push({ item: null, x, y } as SearchBlock<Node>);
      }
      this.data.push(row);
    }

    // test
    this.data[START_NODE_ROW][START_NODE_COL].item = {
      status: SearchStatus.ORIGIN
    };
    this.data[END_NODE_ROW][END_NODE_COL].item = {
      status: SearchStatus.FINISH
    };
  }

  findPath() {
    const startNode = this.data[START_NODE_ROW][START_NODE_COL];
    const finishNode = this.data[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = this.pathService.dijkstra(
      this.data,
      startNode,
      finishNode
    );
  }

  onBlockClick(block: SearchBlock<Node>) {
    console.log(`x: ${block.x} y: ${block.y}`);
  }
}
