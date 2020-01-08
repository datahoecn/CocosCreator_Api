// 动态规划实列
// 动态规划从底部开始解决问题
var arr = [0, 1, 1, 2, 3, 5, 8, 13]; // 前两项相加得第三项
function recurFib(n) {
	if (n < 2) {
		return n;
	} else {
		return recurFib(n - 1) + recurFib(n - 2);
	}
}

console.log(recurFib(10));

function dynFib(n) {
	var val = [];
	for (var i = 0; i <= n; i++) {
		val[i] = 0;
	}
	if(n == 1 || n == 2) {
		return 1;
	} else {
		val[1] = 1;
		val[2] = 2;
		for (var i = 3; i < n; i++) {
			val[i] = val[i-1] + val[i-2];
		}
		return val[n-1];
	}
}

console.log(dynFib(10));

function iterFib(n) {
	var last = 1;
	var nextLast = 1;
	var result = 1;
	for (var i = 2; i < n; i++) {
		result = last + nextLast;
		nextLast = last;
		last = result;
	}
	return result;
}

console.log(iterFib(10));

// 寻找最长公共子串
function lcs(word1, word2) {
	var max = 0;
	var index = 0;
	var lcsarr = new Array(word1.length);
	for (var i = 0; i < word1.length; i++) {
		lcsarr[i] = new Array(word2.length);
		for (var j = 0; j < word2.length; j++) {
			if(word1[i] == word2[j]) {
				if(i > 0 && j > 0) {
					lcsarr[i][j] = lcsarr[i-1][j-1] + 1;
				} else {
					lcsarr[i][j] = 1;
				}
			} else {
				lcsarr[i][j] = 0;
			}
			if(max < lcsarr[i][j]) {
				max = lcsarr[i][j];
				index = i;
			}
		}
	}
	var str = "";
	if(max == 0) {
		return "";
	} else {
		for (var i = index - max + 1; i <= index; i++) {
			str += word1[i];
		}
		return str;
	}
}
console.log(lcs("dddddddddddddddddsqqqqqqqqqqqqq", "ddsqq"));


// 背包问题
function max(a, b) {
	return (a > b) ? a : b;
}

function knapsack(capacity, size, value, n) {
	if (n == 0 || capacity == 0) {
		return 0;
	}
	if (size[n - 1] > capacity) {
		return knapsack(capacity, size, value, n - 1);
	} else {
		return max(value[n - 1] + knapsack(capacity - size[n - 1], size, value, n - 1), knapsack(capacity, size, value, n - 1));
	}
}
var value = [4, 5, 10, 11, 13];
var size = [3, 4, 7, 8, 9];
var capacity = 16;
var n = 5;
console.log(knapsack(capacity, size, value, n));


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

dKnapsack(capacity, size, value, n);



