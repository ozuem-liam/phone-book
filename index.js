const PhoneNumber = require("./model/phone.number");
const Trie = require("./model/trie");

const myTrie = new Trie();

class PhoneBook {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // add first phone number
  addFirst(data) {
    const newNode = new PhoneNumber(data, this.head);
    myTrie.insert(data.firstname);
    this.head = newNode;
    this.size++;
  }

  // add last phone number
  addLast(data) {
    let node = new PhoneNumber(data);
    myTrie.insert(data.firstname);
    let current;

    // If empty, make head
    if (!this.head) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
  }

  // add at Index
  addAt(data, index) {
    // If first index
    if (index === 0) return this.addFirst(data);

    const prev = this.findAt(index - 1);
    if (prev == null) return null;

    prev.next = new PhoneNumber(data, prev.next);
    this.size++;
  }
  // find at index
  findAt(index) {
    if (index == 0) {
      return this.head;
    }
    let current = this.head;
    let count = 0;

    while (current) {
      if (count == index) {
        return current;
      }
      count++;
      current = current.next;
    }

    return null;
  }

  // Remove head
  removeHead() {
    this.head = this.head.next;
    this.size--;
  }
  // Remove at Index
  removeAt(index) {
    if (index === 0) return this.removeHead();

    const prev = this.findAt(index - 1);
    if (prev == null) return null;

    prev.next = prev.next.next;
    this.size--;
  }
  // Clear list
  deleteList() {
    this.head = null;
    this.size = 0;
  }
  // Print list data
  printPhoneBook() {
    let current = this.head;

    while (current) {
      current = current.next;
    }
    return;
  }
}


PhoneBook.fromValues = function (...values) {
  const ll = new PhoneBook();
  for (let i = values.length - 1; i >= 0; i--) {
    ll.addFirst(values[i]);
  }
  return ll;
};

module.exports = PhoneBook;
