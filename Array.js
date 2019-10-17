javaScript 中数组也是对象
var objects = [1, "joe", true, null];


浅复制: 当把一个数组赋给另外一个数组时，只是为被赋值的数组增加了一个新的应用
	var a = 2;
	var b = a;
	b = 10;
	console.log(a);// [10, 2, 3]

push		arr.push(1);
unshift		arr.unshift(1，2);				在数组的开头添加元素
pop			arr.pop();						删除末尾元素，返回删除元素
shift		arr.shift();					删除第一个元素，返回删除元素
length		arr[arr.length] = 1;			增加元素
isArray		Array.isArray(objects)			判断是否是数组
indexof		array.indexOf("name");			查找元素，查到返回索引值，否则返回 -1
lastIndexOf()	array.lastIndexOf("name"); 	逆方向查找元素，查不到返回 -1
join		var str = array.join("");			数组转化为字符串
toString	var str = array.toString();		数组转化为字符串
concat		var array3 = array1.concat(array2);	连接二个数组，返回一个新数组；
splice		var arr2 = arr1.splice(3, 4); 	起始索引是3，截取长度是4，
			arr.splice(2,0,"William")
			arr.splice(2,1,"William")
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
map  		arr.map(curve); 				返回一个新数组，新数组元素是原数组元素使用函数后得到的
			function curve(grade) {
				return grade + 5;
			}
filter		arr.filter(isEven);				参数是一个返回值为布尔类型的函数，对数组中的每个元素使用该函数，
											如果元素使用该函数，返回值是true，那么元素成为新数组的元素，
	

