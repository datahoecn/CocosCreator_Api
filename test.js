var arr = [];
for (let i = 0; i < 100; i++) {
	arr.push(Math.floor(Math.random() * 100));
}

function show(arr) {
	var str = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			str += arr[i * 10 + j] + " ";
		}
		str += "\n"
	}
	console.log(str);
}

show(arr);

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

insertionSort(arr);
show(arr);