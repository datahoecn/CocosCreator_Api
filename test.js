function foo() {
	var a = 20;
	function bar() {
		a = 30;
		console.log(a);

	}
	bar();
}
foo()