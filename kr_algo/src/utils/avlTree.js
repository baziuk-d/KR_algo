class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rotateRight(y) {
    const x = y.left;
    const T = x.right;

    x.right = y;
    y.left = T;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T = y.left;

    y.left = x;
    x.right = T;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insert(node, value) {
    if (!node) {
      return new AVLNode(value);
    }

    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    } else {
      return node;
    }

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    const balance = this.getBalanceFactor(node);

    if (balance > 1 && value < node.left.value) {
      return this.rotateRight(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this.rotateLeft(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  remove(node, value) {
    if (!node) return node;

    if (value < node.value) {
      node.left = this.remove(node.left, value);
    } else if (value > node.value) {
      node.right = this.remove(node.right, value);
    } else {
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        const minValueNode = this.getMinValueNode(node.right);
        node.value = minValueNode.value;
        node.right = this.remove(node.right, minValueNode.value);
      }
    }

    if (!node) return node;

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    const balance = this.getBalanceFactor(node);

    if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
      return this.rotateRight(node);
    }

    if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
      return this.rotateLeft(node);
    }

    if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  searchValue(value, node = this.root, path = []) {
    if (!node) return null;

    path.push(node.value);

    if (value === node.value) {
      return node;
    } else if (value < node.value) {
      return this.searchValue(value, node.left, path);
    } else {
      return this.searchValue(value, node.right, path);
    }
  }

  insertValue(value) {
    this.root = this.insert(this.root, value);
  }

  removeValue(value) {
    this.root = this.remove(this.root, value);
  }
}

export default AVLTree;
