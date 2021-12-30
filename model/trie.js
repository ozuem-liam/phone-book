class Node {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      let charToInsert = word[i];
      if (!(charToInsert in current.children)) {
        current.children[charToInsert] = new Node();
      }

      current = current.children[charToInsert];
    }

    current.isWordEnd = true;
    return current;
  }

  contains(word) {
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      let charToFind = word[i];
      if (!(charToFind in current.children)) {
        return false;
      }

      current = current.children[charToFind];
    }

    return current.isWordEnd;
  }

  startWithPrefix(prefix) {
    let current = this.root;

    for (let i = 0; i < prefix.length; i++) {
      let charToFind = prefix[i];
      if (!(charToFind in current.children)) {
        return false;
      }

      current = current.children[charToFind];
    }

    return true;
  }
}

Trie.fromValues = function (...values) {
  const myTrie = new Trie();
  for (let i = values.length - 1; i >= 0; i--) {
    myTrie.insert(values[i]);
  }
  return myTrie;
};

module.exports = Trie;
