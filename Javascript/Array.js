判断二个数组是否相等
使用toString

javaScript 中数组也是对象
var objects = [1, "joe", true, null];


Array 对象
	properties
		constructor 返回创建数组对象的原型函数
		length 		设置或返回数组元素的个数
		prototype 	允许你向数组对象添加属性或方法
	method
		Array.from([1, 2, 3], x => x * 10)  通过给定的对象中创建一个数组
		Array.isArray(obj)					判断对象是否为数组

		array.valueOf()						返回数组对象的原始值。
		array.toString()					把数组转换为字符串，并返回结果。
		array.includes(searchElement)		判断一个数组是否包含一个指定的值
		array.fill(value, start, end)		将一个固定值替换数组的元素。

		array.shift()						删除并返回数组的第一个元素
		array.pop()							删除数组的最后一个元素,返回删除的元素

		array.push(item1, item2, ..., itemX)添加一个或多个元素，并返回新的长度
		array.unshift(item1,item2, ..., itemX)		向数组的开头添加一个或更多元素，并返回新的长度
		array.splice(index,howmany,item1,.....,itemX)()	从数组中添加或删除元素。

		array.indexOf(item,start)			返回它所在的位置
		array.lastIndexOf(item,start)		返回它最后出现的位置
		array.find(function(curValue))		返回第一个符合条件的元素
		array.findIndex(function(curValue))	返回第一个符合条件的元素索引

		array.reverse()						反转数组的元素顺序
		array.join(separator)				把数组的所有元素合并成一个字符串, separator分隔符进行分隔的
		
		array.sort(sortfunction)			对数组的元素进行排序。
		array.sort();						按字符串类型，进行排序

		array.slice(start, end)				选取数组的的一部分，并返回一个新数组。
		array1.concat(array2,array3,...,arrayX)		返回一个新数组，可以连接单个值，也可以连接数组
		array.copyWithin(target, start, end)		复制到指定目标索引位置, 元素复制的起始位置, 停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数

		array.every(function(curValue){})	是否符合指定条件,有一个元素不满足,剩余的元素不会再进行检测
		array.filter(function(curValue))	返回符合条件的新数组
		array.some(function(curValue))		检测数组元素中是否有元素符合指定条件。

		array.forEach(function(curValue))	数组每个元素都执行一次回调函数
		array.map(function(curValue))		通过指定函数处理数组的每个元素，并返回处理后的数组

		array.reduce(function(total, curValue))将数组元素计算为一个值（从左到右）
		// 第一次计算，如果initialValue赋值了，prev = initialValue，cur是第一个元素
					//否则 prev 是第一个元素，cur是第二个元素
		// 后面计算，prev 是 return 值
		// index 是索引值，arr 是计算的数组
		// sum 是最后计算的 return 值
		var sum = arr.reduce(function(prev, cur, index, arr) {
		    console.log(prev, cur, index);
		    return prev + cur;
		}, initialValue)
		array.reduceRight(function(total, curValue))将数组元素计算为一个值（从右到左）
		

冒泡排序，每次找出最大值
	function bubbleSort(arr) {
		for (var outer = arr.length; outer > 1; outer--) {
			for (var inner = 0; inner < outer; inner++) {
				if (arr[inner] > arr[inner + 1]) {
					swap(arr, inner, inner + 1)
				}
			}
		}
	}

选择排序，每次找出最小值
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

插入排序
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


如果查找的位置不在前20%，移动位置
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

用二分查找数据，需要提前排好序
	function binSearch(arr, data) {
		var upperBound = arr.length - 1;
		var lowerBound = 0;
		while (lowerBound <= upperBound) {
			var min = Math.floor((upperBound + lowerBound) / 2);
			if (arr[min] < data) {
				lowerBound = min + 1;
			} else if (arr[min] > data) {
				upperBound = min - 1;
			} else {
				return min;
			}
		}
		return -1;
	}

