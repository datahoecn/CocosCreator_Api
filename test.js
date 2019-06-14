function f1() {
	var n = 999;
	nAdd = function() {
		n += 1;
	}

	return function f2() {
		console.log(n);
	}
}

var result = f1();
result();
nAdd();