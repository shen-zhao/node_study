//单向链表

//节点
function Node(element) {
    this.element = element; //当前节点的元素
    this.next = null        //下一个节点链接
}

function LinkedList() {
    this.head = new Node('head');
    this.find = find;
    this.findPrev = findPrev;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
}

function insert(newNode, relative) {
    newNode = new Node(newNode);
    relNode = this.find(relative);
    newNode.next = relNode.next;
    relNode.next = newNode;
    return newNode;
}

function find(item) {
    var cur = this.head;
    while(cur) {
        if (cur.element === item) {
            return cur;
        }
        cur = cur.next;
    }
}

function findPrev(item) {
    var cur = this.head;
    while(cur) {
        if (cur.next && cur.next.element === item) {
            return cur
        }
        cur = cur.next;
    }
}

function remove(item) {
    var pre = this.findPrev(item);
    if (pre) {
        pre.next = pre.next.next;
    }
}

function display() {
    var cur = this.head;
    while(cur) {
        console.log(cur);
        cur = cur.next
    }
}

var linked_list = new LinkedList();

linked_list.insert('item1', 'head')
linked_list.insert('item2', 'item1')
linked_list.insert('item3', 'item2')
linked_list.display();
