判断二个数组是否相等
使用toString

function New(func) {
	var res = {};
	if(func.prototype !== null) {
		res.__proto__ = func.prototype;
	}
	var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
	if((typeof ret === "object" || typeof ret === "function") && ret !== null) {
		return ret;
	}
	return res;
}

javaScript 中数组也是对象
var objects = [1, "joe", true, null];


浅复制: 当把一个数组赋给另外一个数组时，只是为被赋值的数组增加了一个新的应用
var a = [1,2,3,4];
var b= a;
b[0] = 4;//a 与 b 相互影响
b = [4,2,3,4];// a 与 b 相互不影响

push		arr.push(1);
unshift		arr.unshift(1，2);				在数组的开头添加元素
pop			arr.pop();						删除末尾元素，返回删除元素
shift		arr.shift();					删除第一个元素，返回删除元素
length		arr[arr.length] = 1;			增加元素
isArray		Array.isArray(objects)			判断是否是数组
indexof		array.indexOf("name");			查找元素，查到返回索引值，否则返回 -1
lastIndexOf()	array.lastIndexOf("name"); 	逆方向查找元素，查不到返回 -1
join		var str = array.join("");		连接数组元素为一个字符串，可以指定连接字符
toString	var str = array.toString();		数组转化为字符串
concat		var array3 = array1.concat(array2);	连接二个数组，返回一个新数组；
splice		var arr2 = arr1.splice(3, 4); 	起始索引是3，截取长度是4，使用负数可从数组结尾处规定位置
			arr.splice(2,0,"William")		向数组添加的新项目"William"
reverse		arr.reverse();					元素顺序进行翻转
sort		arr.sort();						按字符串类型，进行排序
			arr.sort(compare);				使用函数进行排序
			function compare(num1, num2) {
				return num1 - num2;
			}
forEach		arr.forEach(square);			对数组中的每个元素使用该函数
			function square(num) {
				print(num);
			}
every		arr.every(isEven);				参数是一个返回值为布尔类型的函数，对数组中的每个元素使用该函数
			function isEven(num) {			如果所有元素使用该函数，返回值都是true，则 every 方法返回值也是true
				return num % 2 == 0;
			}
some		arr.some(isEven);				参数是一个返回值为布尔类型的函数，对数组中的每个元素使用该函数
											如果有个元素使用该函数，返回值是true，则 some 方法返回值也是true
reduce		arr.reduce(add);				接受一个函数参数，最后返回一个叠加值
			function add(runningTotal, currentValue) {
				return runningTotal + currentValue;
			}
reduceRight	与 reduce 顺序相反

 			// map方法第一个参数 回调函数
 			// map方法第二个参数是回调函数的this
 			// 回调函数第一个参数 表示数组每一项
 			// 回调函数第二个参数 表示当前索引值
 			// 回调函数第三个参数 表示数组本身
 			var array = [1, 2, 3, 4];
map 		var newArray = array.map(function(item, i, array){
				// 1 0 [ 1, 2, 3, 4 ] { a: 1 }
				console.log(item, i ,array, this);
				return item + 1;
			}, {a: 1})
			// newArray [ 2, 3, 4, 5 ]

filter		arr.filter(isEven);				参数是一个返回值为布尔类型的函数，对数组中的每个元素使用该函数，
											如果元素使用该函数，返回值是true，那么元素成为新数组的元素，
	
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
		array.reverse()						反转数组的元素顺序
		array.shift()						删除并返回数组的第一个元素
		array.pop()							删除数组的最后一个元素,返回删除的元素

		array.every(function(curValue){})	是否符合指定条件,有一个元素不满足,剩余的元素不会再进行检测
		array.filter(function(curValue))	返回符合条件的新数组
		array.some(function(curValue))		检测数组元素中是否有元素符合指定条件。
		array.forEach(function(curValue))	数组每个元素都执行一次回调函数
		array.map(function(curValue))		通过指定函数处理数组的每个元素，并返回处理后的数组
		array.find(function(curValue))		返回第一个符合条件的元素
		array.findIndex(function(curValue))	返回第一个符合条件的元素索引
		
		array1.concat(array2,array3,...,arrayX)		返回一个新数组，连接两个或多个数组
		array.unshift(item1,item2, ..., itemX)		向数组的开头添加一个或更多元素，并返回新的长度
		array.copyWithin(target, start, end)		复制到指定目标索引位置, 元素复制的起始位置, 停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数
		array.includes(searchElement)		判断一个数组是否包含一个指定的值
		array.fill(value, start, end)		将一个固定值替换数组的元素。
		array.join(separator)				把数组的所有元素合并成一个字符串, separator分隔符进行分隔的
		array.indexOf(item,start)			返回它所在的位置
		array.lastIndexOf(item,start)		返回它最后出现的位置
		array.push(item1, item2, ..., itemX)添加一个或多个元素，并返回新的长度
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
		array.slice(start, end)				选取数组的的一部分，并返回一个新数组。
		array.sort(sortfunction)			对数组的元素进行排序。
		array.splice(index,howmany,item1,.....,itemX)()	从数组中添加或删除元素。

