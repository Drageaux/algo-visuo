export class Node<T> {
  key: T;
  left: Node<T>;
  right: Node<T>;

  constructor(item: T) {
    this.key = item;
    this.left = null;
    this.right = null;
  }
}
