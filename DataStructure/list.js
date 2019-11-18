//列表：一组有序的数据，列表中的数据项称为元素（可以是任意数据类型）

function list() {
	this.listSize = 0;
	this.pos = 0;
	this.dataStore = [];
	this.clear = clear;
	this.find = find;
	this.toString = toString;
	this.insert = insert;
	this.append = append;
	this.remove = remove;
	this.front = front;
	this.end = end;
	this.prev =prev;
	this.next = next;
	this.hasNext;
	this.hasPrev;
	this.length = length;
	this.currPos = currPos;
	this.moveTo = moveTo;
	this.getElement = getElement;
	this.contains = contains;
}

// 添加元素
function append(element) {
	this.dataStore[this.listSize++] = element;
}

// 查找元素位置
function find(element) {
	for (var i = 0; i < this.dataStore.length; ++i) {
		if(this.dataStore[i] == element) {
			return i;
		}
	}
	return -1;
}
// 删除元素
function remove(element) {
	var 
}

