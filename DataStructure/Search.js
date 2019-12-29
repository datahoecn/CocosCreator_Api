
// 如果查找的位置不在前20%，移动位置
function seqSearch(arr, data) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == data) {
			if(i > (arr.length * 0.2)) {
				swap(arr, i, 0);
			}
			return true;
		}
	}
	return false;
}

function swap(arr, index, index1) {
	var temp = arr[index];
	arr[index] = arr[index1];
	arr[index1] = temp;
}

// 用二分查找数据，需要提前排好序
function binSearch(arr, data) {
	var upperBound = arr.length - 1;
	var lowerBound = 0;
	while (lowerBound <= upperBound) {
		var min = Math.floor((upperBound + lowerBound) / 2);
		if (arr[mid] < data) {
			lowerBound = mid + 1;
		} else if (arr[mid] > data) {
			upperBound = mid - 1;
		} else {
			return mid;
		}
	}
	return -1;
}

function insertionsort(arr) {
	var temp, inner;
	for (var outer = 1; outer < arr.length; outer++) {
		temp = arr[outer];
		inner = outer;
		while (inner > 0 && (arr[inner - 1] > temp)) {
			arr[inner] = arr[inner - 1];
			inner--;
		}
		arr[inner] = temp;

	}
}

// function setData() {
// 	var dataStore = [];
// 	for (var i = 0; i < 100; i++) {
// 		dataStore[i] = Math.floor(Math.random() * (100 + 1));
// 	}

// 	var restr = "";
// 	for (var i = 0; i < dataStore.length; i++) {
// 		restr += dataStore[i] + " ";
// 		if (i % 10 == 9) {
// 			restr += "\n";
// 		}
// 	}

// 	console.log(restr);

// 	insertionsort(dataStore);
// 	restr = "";
// 	for (var i = 0; i < dataStore.length; i++) {
// 		restr += dataStore[i] + " ";
// 		if (i % 10 == 9) {
// 			restr += "\n";
// 		}
// 	}
// 	console.log(restr)
// }

// setData();