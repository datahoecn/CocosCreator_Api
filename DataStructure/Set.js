// 1.集合时一种包含不同元素的数据结构；
// 2.集合中的成员是无序的；
// 3.集合中不允许相同成员存在；
// 4.空集：不包含任何成员的集合；
// 5.全集：包含一切可能的成员；
// 7.集合相等：两个集合的成员完全相同；
// 8.子集：一个集合中所有的成员都属于另外一个集合；
// 9.并集：将两个集中中的成员进行合并，得到一个新集合；
// 10 交集：两个集合中共同存在的成员组成一个新的集合；
// 11 补集：属于一个集合而不属于另一个集合的成员组成的集合；

function Set() {
	this.dataStore = [];
	this.add = add;
	this.remove = remove;
	this.size = size;
	this.union = union; // 并集
	this.intersect = intersect; // 交集
	this.subset = subset; // 子集 以参数为父集
	this.difference = difference; // 补集 找出本集中与参数集中不同的成员
	this.show = show;
}

function add(data) {
	if (this.dataStore.indexOf(data) < 0) {
		this.dataStore.push(data);
		return true;
	}
	return false;
	
}

function remove(data) {
	var pos = this.dataStore.indexOf(data);
	if (pos > -1) {
		this.dataStore.splice(pos, 1);
		return true;
	}
	return false;
}

function size() {
	return this.dataStore.length;
}

function union(set) {
	var newSet = new Set();
	for (var i = 0; i < this.dataStore.length; i++) {
		newSet.add(this.dataStore[i]);
	}
	for (var i = 0; i < set.dataStore.length; i++) {
		if(newSet.dataStore.indexOf(set.dataStore[i]) < 0) {
			newSet.dataStore.push(set.dataStore[i]);
		}
	}
	return newSet;
}

function intersect(set) {
	var newSet = new Set();
	for (var i = 0; i < this.dataStore.length; i++) {
		if(this.dataStore.indexOf(set.dataStore[i]) > -1) {
			newSet.dataStore.push(this.dataStore[i]);
		}
	}
	return newSet;
}

function subset(set) {
	if(this.size() > set.size()) {
		return false;
	}
	for (var i = 0; i < this.dataStore.length; i++) {
		if(set.dataStore.indexOf(this.dataStore[i]) < 0) {
			return false;
		}
	}
	return true;
}

function difference(set) {
	var newSet = new Set();
	for (var i = 0; i < this.dataStore.length; i++) {
		if(set.dataStore.indexOf(this.dataStore[i]) < 0) {
			newSet.dataStore.push(this.dataStore[i]);
		}
	}
	return newSet;
}


function show() {
	return this.dataStore;
}



// var name_1 = new Set();
// name_1.add("David");
// name_1.add("Jennifer");
// name_1.add("Cynthia1");


// var name_2 = new Set();
// name_2.add("David");
// name_2.add("Jennifer");
// name_2.add("Cynthia");


// var newName = name_1.difference(name_2);
// console.log(newName.show())


