const PhoneBook = require('../index');
const Trie = require('../model/trie');

const data3 = {
    firstname: 'uy', 
    lastname: "Ozuem",
    email: "oz@gmail.com",
    phone: "090423123666",
    date: new Date().getTime(),
  };
  const data2 = {
    firstname: 'gh', 
    lastname: "Williams",
    email: "oz@gmail.com",
    phone: "090423123423",
    date: new Date().getTime(),
  };

describe('#addFirst', () => {
    test('it adds the element to the beginning of the list', () => {
        const ll = new PhoneBook();
        ll.addFirst(data3)
        const oldHead = ll.head
        ll.addFirst(data2)

        expect(ll.head.data).toBe(data2)
        expect(ll.head.next).toBe(oldHead)
        expect(ll.size).toBe(2)
    })
})

describe('#addLast', () => {
    describe('add element as head if empty', () => {
        test('it adds the element as head of the list', () => {
            const ll = PhoneBook.fromValues();
            ll.addLast(data3)
            
            expect(ll.head.data).toBe(data3)
            expect(ll.head.next).toBeNull()
            expect(ll.size).toBe(1)
        })
    })
    describe('add element to the end', () => {
        test('it adds the element to the end of the list', () => {
            const ll = PhoneBook.fromValues(data3, data2);
            ll.addLast(data3)
            
            expect(ll.head.next.next.data).toBe(data3)
            expect(ll.size).toBe(3)
        })
    })
})

describe('#findByIndex', () => {
    describe('with index less than 0', () => {
        test('it returns null', () => {
            const ll = PhoneBook.fromValues(data3, data2);

            expect(ll.findAt(-1)).toBeNull();
        })
    })

    describe('with index greater than list size', () => {
        test('it returns null', () => {
            const ll = PhoneBook.fromValues(data3, data2);

            expect(ll.findAt(5)).toBeNull();
        })
    })

    describe('with index 0', () => {
        test('it returns the head', () => {
            const ll = PhoneBook.fromValues(data3, data2);

            expect(ll.findAt(0).data).toBe(data3);
        })
    })

    describe('with index in the middle', () => {
        test('it returns the element at that index', () => {
            const ll = PhoneBook.fromValues(data3, data2);

            expect(ll.findAt(1).data).toBe(data2);
        })
    })
})

describe('#insertAtIndex', () => {
    describe('with index less than 0', () => {
        test('it does not insert anything', () => {  
            const ll = PhoneBook.fromValues(data3, data2);
            ll.addAt(data3, -1)
            
            expect(ll.size).toBe(2)
        })
    })

    describe('with index greater than list length', () => {
        test('it does not insert anything', () => {  
            const ll = PhoneBook.fromValues(data3, data2);
            ll.addAt(data3, 5)

            expect(ll.size).toBe(2)
        })
    })

    describe('with index 0', () => {
        test('insert at the head', () => {  
            const ll = PhoneBook.fromValues(data3, data2);
            ll.addAt(data2, 0)

            expect(ll.head.data).toBe(data2);
            expect(ll.head.next.data).toBe(data3);
            expect(ll.size).toBe(3)
        })
    })

    describe('with index in the middle', () => {
        test('insert at the given index', () => {  
            const ll = PhoneBook.fromValues(data3, data2);
            ll.addAt(data2, 1)
            const node = ll.findAt(1)

            expect(node.data).toBe(data2)
            expect(node.next.data).toBe(data2)
            expect(ll.size).toBe(3)
        })
    })
})

describe('#removeHead', () => {
    test('removes the head', () => {
        const ll = PhoneBook.fromValues(data3, data2);
        ll.removeHead()

        expect(ll.head.data).toBe(data2)
        expect(ll.size).toBe(1)
    })
})

describe('#removeAtIndex', () => {
    describe('with index less than 0', () => {
        test('it does not remove anything', () => {  
            const ll = PhoneBook.fromValues(data3, data2);
            ll.removeAt(-1)
            
            expect(ll.size).toBe(2)
        })
    })

    describe('with index greater than list length', () => {
        test('it does not remove anything', () => {  
            const ll = PhoneBook.fromValues(data3, data2);
            ll.removeAt(5)
            
            expect(ll.size).toBe(2)
        })
    })

    describe('with index 0', () => {
        test('remove at the head', () => {  
            const ll = PhoneBook.fromValues(data3, data2, data3);
            ll.removeAt(0)

            expect(ll.head.data).toBe(data2);
            expect(ll.head.next.data).toBe(data3);
            expect(ll.size).toBe(2)
        })
    })

    describe('with index in the middle', () => {
        test('remove at the given index', () => {  
            const ll = PhoneBook.fromValues(data3, data2, data3, data2);
            ll.removeAt(2)
            const node = ll.findAt(1)

            expect(node.data).toBe(data2)
            expect(node.next.data).toBe(data2)
            expect(ll.size).toBe(3)
        })
    })
})

describe('#deleteAllList', () => {
    test('delete', () => {
        const ll = PhoneBook.fromValues(data3, data2);
        ll.deleteList()

        expect(ll.head).toBeNull()
        expect(ll.size).toBe(0)
    })
})

describe('Print the list', () => {
    test('it returns the whole list', () => {
        const ll = PhoneBook.fromValues(data3, data2);
        ll.printPhoneBook();

        expect(ll.head.data).toBe(data3)
        expect(ll.size).toBe(2)
    })
})


describe('#insertIntoTrie', () => {
    test('it adds the word to the trie', () => {
        const myTrie = new Trie();
        const node = myTrie.insert(data3.firstname)
        
        expect(node.isWordEnd).toBe(true)
    })
})

describe('#containedInTrie', () => {
    describe('does not contain the word', () => {
        test('it checks if word is not in the trie', () => {
            const myTrie = Trie.fromValues(data3.firstname);
            const isContain = myTrie.contains(data2.firstname)
            
            expect(isContain).toBe(false)
        })
    })

    describe('contains the word', () => {
        test('it checks if word in the trie', () => {
            const myTrie = Trie.fromValues(data3.firstname);
            const isContain = myTrie.contains(data3.firstname)
            
            expect(isContain).toBe(true)
        })
    })
})

describe('#startWithPrefixInTrie', () => {
    describe('if word does not have a prefix', () => {

        test('it checks if word does not start with the prefix in trie', () => {
            const myTrie = Trie.fromValues(data3.firstname);
            const startWithPrefix = myTrie.startWithPrefix(data3.firstname[1])
            
            expect(startWithPrefix).toBe(false)
        })
    })

    describe('if word has a prefix', () => {

        test('it checks if word starts with prefix in trie', () => {
            const myTrie = Trie.fromValues(data3.firstname);
            const startWithPrefix = myTrie.startWithPrefix(data3.firstname[0])
            
            expect(startWithPrefix).toBe(true)
        })
    })
})
