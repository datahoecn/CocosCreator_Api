// 1.散列是一种常用的数据存储技术，可以快速插入、删除、取用；
// 2.散列使用的数据结构是散列表；
// 3.通过一个散列函数将键映射为一个数字，这个数字范围是0到散列表的长度；

// 如果数组的大小是待存储数据个数的1.5倍，使用开链法
// 如果数组的大小是待存储数据的两倍及两倍以上时，使用线性探测法

// 开链法

const H = 37;
const LENG = 137;
function HashTable() {
	this.table = new Array(LENG);
	this.betterHash = betterHash; // 散列函数
	this.buildChains = buildChains;
	this.showDistro = showDistro;
	this.put = put;
	this.get = get;
}

function betterHash(string) {
	var total = 0;
	for(var i = 0; i < string.length; ++i) {
		total += H * total + string.charCodeAt(i);
	}
	total = total % LENG;
	// 多余的一部分
	// if (total < 0) {
	// 	console.log(total);
	// 	total += this.table.length - 1;
	// }
	return parseInt(total);
}

function buildChains() {
	for (var i = 0; i < this.table.length; i++) {
		this.table[i] = new Array();
	}
}

function showDistro() {
	for (var i = 0; i < LENG; ++i) {
		if(this.table[i][0] != undefined) {
			console.log(i + ": " + this.table[i]);
		}
	}
}

function put(key, data) {
	var pos = this.betterHash(key);
	var index = 0;
	if (this.table[pos][index] == undefined){
		this.table[pos][index] = key;
		this.table[pos][index+1] = data;
	} else {
		index += 2;
		while (this.table[pos][index] != undefined) {
			index += 2;
		}
		this.table[pos][index] = key;
		this.table[pos][index+1] = data;
	}
}

function get(key) {
	var index = 0;
	var pos = this.betterHash(key);
	if(this.table[pos][index] == key) {
		return this.table[pos][index+1];
	} else {
		index += 2;
		while (this.table[pos][index] != key) {
			index += 2;
		}
		return this.table[pos][index+1];
	}
	return undefined;
}

// var someNames = ["David", "Jennifer", "Donnie", "Raymond",
// 				"Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
// var hTable = new HashTable();
// hTable.buildChains();
// for (var i = 0; i < someNames.length; i++) {
// 	hTable.put(someNames[i], someNames[i]);
// }
// hTable.showDistro();
// console.log(hTable.get("Jonathan"));


// 线性探测法

const H = 37;
const LENG = 137;
function HashTable() {
	this.table = new Array(LENG);
	this.values = [];
	this.betterHash = betterHash; // 散列函数
	this.buildChains = buildChains;
	this.showDistro = showDistro;
	this.put = put;
	this.get = get;
}

function betterHash(string) {
	var total = 0;
	for(var i = 0; i < string.length; ++i) {
		total += H * total + string.charCodeAt(i);
	}
	total = total % LENG;
	// 多余的一部分
	// if (total < 0) {
	// 	console.log(total);
	// 	total += this.table.length - 1;
	// }
	return parseInt(total);
}

function buildChains() {
	for (var i = 0; i < this.table.length; i++) {
		this.table[i] = new Array();
	}
}

function showDistro() {
	for (var i = 0; i < LENG; ++i) {
		if(this.table[i] != undefined) {
			console.log(i + ": " + this.table[i]);
		}
	}
}

function put(key, data) {
	var pos = this.betterHash(key);
	if (this.table[pos] == undefined) {
		this.table[pos] = key;
		this.values[pos] = data;
	} else {
		pos++;
		while (this.table[pos] != undefined) {
			pos++;
		}
		this.table[pos] = key;
		this.values[pos] = data;
	}
}

function get(key) {
	var pos = this.betterHash(key);
	while (this.table[pos] != undefined) {
		if (this.table[pos] == key) {
			return this.values[pos];
		}
		pos++;
	}
	return undefined;
}


// var someNames = ["David", "Jennifer", "Donnie", "Raymond",
// 				"Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
// var hTable = new HashTable();
// for (var i = 0; i < someNames.length; i++) {
// 	hTable.put(someNames[i], someNames[i]);
// }
// hTable.showDistro();
// console.log(hTable.get("Jonathan"));