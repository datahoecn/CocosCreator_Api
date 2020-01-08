function dKnapsack(capacity, size, value, n) {
	var k = [];
	for (var i = 0; i <= n; i++) {
		k[i] = [];
		for (var w = 0; w <= capacity; w++) {
			if (i == 0 || w == 0) {
				k[i][w] = 0;
			} else if (size[i - 1] <= w) {
				k[i][w] = max(value[i - 1] + k[i - 1][w - size[i - 1]], k[i - 1][w]);
			} else {
				k[i][w] = k[i - 1][w];
			}

		}
		console.log(k[i]);
	}
	console.log(k[n][capacity]);
}

// 背包问题
function max(a, b) {
	return (a > b) ? a : b;
}

var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
dKnapsack(capacity, size, value, n);