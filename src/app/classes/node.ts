export class Node {
  key: number;
  left: Node;
  right: Node;

  public Node(item: number) {
    this.key = item;
    this.left = null;
    this.right = null;
  }
}
