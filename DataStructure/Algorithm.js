
// 冒泡排序
function bubbleSort(arr) {
	for (var outer = arr.length; outer > 1; outer--) {
		for (var inner = 0; inner < outer; inner++) {
			if (arr[inner] > arr[inner + 1]) {
				swap(arr, inner, inner + 1)
			}
		}
	}
}

// 选择排序
function selectionSort(arr) {
	var min;
	for (var outer = 0; outer < arr.length - 1; outer++) {
		min = outer;
		for (var inner = outer + 1; inner < arr.length; inner++) {
			if (arr[inner] < arr[min]) {
				min = inner;
			}
		}
		swap(arr, outer, min);
	}
}

// 插入排序
function insertionSort(arr) {
	var inner, temp;
	for (var outer = 1; outer < arr.length; outer++) {
		temp = arr[outer];
		inner = outer;
		while (inner > 0 && arr[inner - 1] >= temp) {
			arr[inner] = arr[inner - 1];
			inner--;
		}
		arr[inner] = temp;
	}
}

function swap(arr, index1, index2) {
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}


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