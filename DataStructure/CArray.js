function CArray(numElements) {
	this.dataStore = [];
	this.pos = 0;
	this.numElements = numElements;
	this.insert = insert;
	this.toString = toString;
	this.clear = clear;
	this.setData = setData;
	this.swap = swap;
	for (var i = 0; i < numElements; i++) {
		this.dataStore[i] = i;
	}

	this.bubbleSort = bubbleSort;
	this.selectionSort = selectionSort;
	this.insertionSort = insertionSort;
}

function setData() {
	for (var i = 0; i < this.numElements; i++) {
		this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
	}
}

function clear() {
	for (var i = 0; i < this.numElements; i++) {
		this.dataStore[i] = 0;
	}
}

function insert(element) {
	this.dataStore[this.pos++] = element;
}

function toString() {
	var restr = "";
	for (var i = 0; i < this.dataStore.length; i++) {
		restr += this.dataStore[i] + " ";
		if (i % 10 == 9) {
			restr += "\n";
		}
	}
	return restr;
}

function swap(arr, index1, index2) {
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}

var numElements = 100;
var myNums = new CArray(numElements);
myNums.setData();
console.log(myNums.toString());


// 冒泡排序
function bubbleSort() {
	var numElements = this.dataStore.length;
	var temp;
	for (var outer = numElements; outer > 1; outer--) {
		for (var inner = 0; inner < outer; inner++) {
			if (this.dataStore[inner] > this.dataStore[inner + 1]) {
				swap(this.dataStore, inner, inner + 1)
			}
		}
	}
}

// myNums.bubbleSort();
// myNums.selectionSort();
myNums.insertionSort();
console.log(myNums.toString());


// 选择排序

function selectionSort() {
	var numElements = this.dataStore.length;
	var min, temp;
	for (var outer = 0; outer < numElements - 1; outer++) {
		min = outer;
		for (var inner = outer + 1; inner < numElements; inner++) {
			if (this.dataStore[inner] < this.dataStore[min]) {
				min = inner;
			}
		}
		swap(this.dataStore, outer, min);
	}
}

// 插入排序
function insertionSort() {
	var numElements = this.dataStore.length;
	var inner, temp;
	for (var outer = 1; outer < numElements; outer++) {
		temp = this.dataStore[outer];
		inner = outer;
		while (inner > 0 && this.dataStore[inner - 1] >= temp) {
			this.dataStore[inner] = this.dataStore[inner - 1];
			inner--;
		}
		this.dataStore[inner] = temp;
	}
}