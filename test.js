function add() {
	var _args = [].slice.call(arguments);
	var adder = function() {
		var _adder = function() {
			_args.push(...arguments);
			return _adder;
		}
		_adder.toString = function() {
			return _args.reduce(function(a,b) {
				return a + b;
			}) 
		}
		return _adder;
	}
	return adder(..._args);
}
var a = add(1)(2)(3)(4);
console.log(a + 10)