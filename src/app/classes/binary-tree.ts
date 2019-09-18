import { Node } from './node';

export class BinaryTree<T> {
  root: Node<T>;

  constructor(key?: T) {
    this.root = key ? new Node<T>(key) : null;
  }
}
