var a = [0, 1, 2, 3, 4, 5];
var b = [0, 1];
for (var i = 2; i < 10 + 1; i++) {
	b[i] = b[i - 1] + b[i - 2];
}
console.log(b)

function recurFib(n) {
	if(n < 2) {
		return n;
	} else {
		return recurFib(n - 1) + recurFib(n - 2);
	}
}

console.log(recurFib(10))