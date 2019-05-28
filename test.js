var  array  =  [1,  2,  3,  4];
var newArray = array.map(function(item, i, array) {
	console.log(item, i, array, this);
	return item + this.a;
}, {a: 1})
console.log(newArray);