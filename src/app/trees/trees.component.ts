import { Component, OnInit } from '@angular/core';
import { BinaryTree } from '../classes/binary-tree';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.scss']
})
export class TreesComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const tree = new BinaryTree<number>();
    console.log(tree);
  }
}
