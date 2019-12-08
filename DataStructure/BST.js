// 1.二叉树进行查找非常快，增加或删除元素也非常快；
// 2.叶子节点：没有子节点的节点；
// 3.二叉树的子节点不超过两个；

function Node(data,left,right) {
	this.data = data;
	this.count = 1;
	this.left = left;
	this.right = right;
	this.show = show;
}

function show() {
	return this.data;
}

function BST() {
	this.root = null;
	this.insert = insert;
	// this.inOrder = inOrder;
	// this.preOrder = preOrder;
	// this.postOrder = postOrder;
	this.getMin = getMin;
	this.getMax = getMax;
	this.find = find;
	this.remove = remove;
	this.update = update;
}

function insert(data) {
	var newNode = new Node(data,null,null);
	if (this.root) {
		var current = this.root;
		while (true) {
			if (data < current.data) {
				if(current.left) {
					current = current.left;
				} else {
					current.left = newNode;
					break;
				}
			} else {
				if(current.right) {
					current = current.right;
				} else {
					current.right = newNode;
					break;
				}
			}
		}
	} else {
		this.root = newNode;
	}
}

// 中序遍历
function inOrder(node) {
	if(node) {
		inOrder(node.left);
		console.log(node.show());
		inOrder(node.right);
	}
}

// 先序遍历
function preOrder(node) {
	if(node) {
		console.log(node.show());
		preOrder(node.left);
		preOrder(node.right);
	}
}

// 后序遍历
function postOrder(node) {
	if(node) {
		postOrder(node.left);
		postOrder(node.right);
		console.log(node.show());
	}
}

function getMin() {
	var current = this.root;
	while (current.left) {
		current = current.left;
	}
	return current.data;
}

function getMax() {
	var current = this.root;
	while (current.right) {
		current = current.right;
	}
	return current.data;
}

function find(data) {
	var current = this.root;
	while (current) {
		if (current.data == data) {
			return current;
		} else if (current.data > data) {
			current = current.left;
		} else {
			current = current.right;
		}
	}
	return null;
}

function remove(data) {
	this.root = removeNode(this.root, data);
}

function removeNode(node,data) {
	if (!node) {
		return null;
	}
	if (data == node.data) {
		if (!node.left && !node.right) {
			return null;
		}
		if (!node.left) {
			return node.right;
		}
		if (!node.right) {
			return node.left;
		}
		var tempNode = getSmallest(node.right);
		node.data = tempNode.data;
		node.right = removeNode(node.right, tempNode.data);
		return node;
	} else if (data < node.data) {
		node.left = removeNode(node.left, data);
		return node;
	} else {
		node.right = removeNode(node.right, data);
		return node;
	}
}

function getSmallest(node) {
	while (node.left) {
		node = node.left;
	}
	return node;
}

function update(data) {
	var node = this.find(data);
	node.count++;
	return node;
	
	
}

// var nums = new BST();
// nums.insert(23);
// nums.insert(45);
// nums.insert(16);
// nums.insert(37);
// nums.insert(3);
// nums.insert(99);
// nums.insert(22);
// inOrder(nums.root);
// console.log("=========================");
// preOrder(nums.root);
// console.log("=========================");
// postOrder(nums.root);

// console.log(nums.getMax());
// console.log(nums.getMin());

// console.log(nums.find(16));


// nums.remove(23)
// inOrder(nums.root);

var arr = [1,2,3,4,5,6,7,8,9,10,1,2,3,1];


var bst = new BST();
for (var i = 0; i < arr.length; i++) {
	let node = bst.find(arr[i]);
	if(node){
		bst.update(arr[i]);
	}else{
		bst.insert(arr[i]);
	}
}

// inOrder(bst.root);
console.log(bst.find(5).count);





