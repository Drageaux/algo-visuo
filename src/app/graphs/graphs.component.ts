import { Component, OnInit } from '@angular/core';
import { SearchItem, SearchItem2D } from '../classes/search-item';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  cols = 50;
  rows = 50;
  data: SearchItem2D[][] = [];

  constructor() {}

  ngOnInit() {
    for (let y = 0; y < this.rows; y++) {
      const row = [];
      for (let x = 0; x < this.cols; x++) {
        row.push({ status: null, x, y });
      }
      this.data.push(row);
    }
  }

  onBlockClick(item: SearchItem2D) {
    console.log(`x: ${item.x} y: ${item.y}`);
  }
}
