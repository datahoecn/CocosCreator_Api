

function fn(want) {
	setTimeout(want, 0);// 后执行
	console.log("先执行")
}

实例方法
	构造函数中的方法
	function Foo() {
		this.bar = function() {
		}
	}
原型方法
	通过 prototype 挂载到原型对象上的方法
	Foo.prototype.bar = function() {

	}
静态方法
	挂载在构造函数上的方法
	静态方法不能通过实例访问，只能通过构造函数来访问
	常用来实现一些常用的，与具体实例无关的功能
	Foo.each = function() {
	}

继承
	function Student(name, age, grade) {
		Person.call(this, name, age);
		this.grade = grade;
	}

	Student.prototype = Object.create(Person.prototype, {
		constructor: {
			value: Student
		},
		getGrade: {
			value: function() {
				return this.grade;
			}
		}
	})


基本类型可以认为是传值赋值
var a = [1,2,3];
var b = a;
b = [4,5,6];
console.log(a);//[1,2,3];
console.log(b);//[4,5,6];
对象类型则是引用赋值，会携带内存地址，相当于指针
var a = {aa: 1};
var b = a;
b.aa = 2;
console.log(a);//{aa: 2};
console.log(b);//{aa: 2};


所有函数与对象都有一个 toSring 和 valueOf 方法
来自Object.prototype


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


arguments是对象{"0": "参数1", "1": "参数2"}
arguments对象不是一个 Array 。它类似于Array,但除了length属性和索引元素之外没有任何Array属性。
第一个参数在索引0处
arguments[0]
arguments是所有（非箭头）函数中都可用的局部变量

// 收集参数
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);
var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
要确定函数签名中（输入）参数的数量，请使用Function.length 属性

function myConcat(separator) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}
// returns "red, orange, blue"
myConcat(", ", "red", "orange", "blue");


switch 用来判断的表达式可以是任意类型，而不仅限于整型（C++ 和 Java 要求该表达式必须为整型）

object
	var a = {"aaa": [], "bbb": null};
	// 判断对象是否包含特定的自身(非继承)属性
	// 继承属性
	a.hasOwnProperty('toString');         // 返回 false
	// 非继承属性
	a.hasOwnProperty("aaa");
	// 即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。
	a.hasOwnProperty("bbb");// true
	// 遍历一个对象的所有自身属性
	var buz = {fog: 'stack'};
	for (var name in buz) {
		if (buz.hasOwnProperty(name)) {
		    console.log('this is fog (' + name + ') for sure. Value: ' + buz[name]);
		}else {
		    console.log(name); // toString or something else
		}
	}
	JavaScript 并没有保护 hasOwnProperty 这个属性名，千万别定义

CommonJS模块规范
	每个文件是一个模块, module 变量代表当前模块, 它的exports属性（即module.exports）是对外的接口
	require方法用于加载模块
	module.exports = {};//example.js
	var example = require('example.js');

ES6模块规范
	export function sum(x, y, z) {
	    return x+y+z;
	}
	export function multiply(x, y) {
	    return x*y;
	}
	export default function () {
	    alert("default module called!");
	};
	import {ModuleA, ModuleB} from "modules"; 
	import Default from 'modules2';


取值范围为 0 ~ 1 之间
value < 0 ? 0 : value < 1 ? value : 1;
value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;


箭头函数
	当函数直接被return时，可以省略函数体的括号
	var c = (a, b) => a + b

	var c = (a, b) => {
	    return a + b
	}
	箭头函数中的this,就是 声明函数时 所处上下文中的this,它不会被其他方式所改变
	在箭头函数中，没有arguments对象


一个函数调用时
	创建阶段
		创建变量对象，确认作用域链，确定this的指向
		创建变量对象：
			获得函数的参数变量及其值
			使用 function 声明的函数，以函数名建立一个属性，其值为函数地址引用，如果已存在，会覆盖其值
			使用 var 声明的变量，以变量名建立一个属性，其值为undefined, 如果已存在，会跳过
		变量对象包含：函数参数，函数声明(function)和变量声明(var)
	执行阶段
		变量赋值，函数引用，执行其他可执行代码
		

JavaScript 全局属性
	isNaN()	检查某个值是否是数字。  isNaN(123) // false  如果参数值为 NaN 或字符串、对象、undefined等非数字值则返回 true
	Number()	把对象的值转换为数字。
	parseFloat()	解析一个字符串并返回一个浮点数。
	parseInt()	解析一个字符串并返回一个整数。
	String()	把对象的值转换为字符串。
	
Boolean 对象
	0
	-0
	null
	""
	false
	undefined
	NaN
	以上都为 false
Math 对象
	Math.PI 	返回圆周率（约等于3.14159）
	abs(x)		返回 x 的绝对值。
	ceil(x)		对数进行上舍入。
	floor(x)	对 x 进行下舍入。
	max(x,y,z,...,n)	返回 x,y,z,...,n 中的最高值。
	min(x,y,z,...,n)	返回 x,y,z,...,n中的最低值。
	pow(x,y)	返回 x 的 y 次幂。
	random()	返回 0 ~ 1 之间的随机数。
	round(x)	四舍五入。
Number 对象
	var num = 5.56789;
	var n = num.toFixed(2);
	toFixed(x)			四舍五入为指定小数位数的数字
	toPrecision(x)		四舍五入把数字格式化为指定的长度。
	toString()			把数字转换为字符串，使用指定的基数。
String 对象
	string.length		返回字符串的长度
	charAt()		返回在指定位置的字符。
	charCodeAt()	返回在指定的位置的字符的 Unicode 编码。
	concat()		连接两个或更多字符串，并返回新的字符串。
	fromCharCode()	将 Unicode 编码转为字符。
	indexOf()		返回某个指定的字符串值在字符串中首次出现的位置。
	includes()		查找字符串中是否包含指定的子字符串。
	lastIndexOf()	从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。
	match()			查找找到一个或多个正则表达式的匹配。
	repeat()		复制字符串指定次数，并将它们连接在一起返回。
	replace()		在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。
	search()		查找与正则表达式相匹配的值。
	slice()			提取字符串的片断，并在新的字符串中返回被提取的部分。
	split()			把字符串分割为字符串数组。
	startsWith()	查看字符串是否以指定的子字符串开头。
	substr()		从起始索引号提取字符串中指定数目的字符。
	substring()		提取字符串中两个指定的索引号之间的字符。
	toLowerCase()	把字符串转换为小写。
	toUpperCase()	把字符串转换为大写。
	trim()			去除字符串两边的空白
	toLocaleLowerCase()	根据本地主机的语言环境把字符串转换为小写。
	toLocaleUpperCase()	根据本地主机的语言环境把字符串转换为大写。
	valueOf()		返回某个字符串对象的原始值。
	toString()		返回一个字符串。

class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}
	getName() { //原型方法
		return this.name
	}
	static a = 20; // 等同于 Person.a= 20
	c = 20; //表示在构造函数中添加属性，在构造函数中等同于this.c = 20

	// 箭头函数的写法表示在构造函数中添加方法，在构造函数中等同于this.
	getAge = function() {}
	getAge = () => this.age
}


解析结构
	从对象或数组中取值
	var array = [1,2,3,4];
	var [c, d] = array;
	console.log(c) // 1

	var obj = {
		a: 1,
		b: 2,
		c: 3
	}
	// 如果找不到d，则使用默认值 4
	var {c,d = 4} = obj;
	console.log(c) // 3

	// 如果没输入参数，使用默认值
	var a = function(x = 2, y = 3){
		console.log(x + y)
	}

展开运算符
	//也可展开对象
	var arr1 = [1, 2, 3];
	var arr2 = [...arr1, 4, 5, 6];

函数形式
	函数声明//声明的函数比var声明的变量有更加优先的执行顺序
		function fn() {
			console.log("function");
		}
	函数表达式//将一个函数体赋值给一个变量的过程
			var fn = function() {}
		对象中添加方法
			var a = {
				m: 20,
				get: function() {
					retrun this.m;
				}
			}
	匿名函数//作为一个参数或返回值
		// 为了方便调试，会为匿名函数添加一个名字
		setTimeout 中的参数
			var timer = setTimeout(function(){},1000);
		数组中的参数
			var arr = [1, 2, 3];
			arr.map(function(item) {
				return item + 1;
			})
			arr.forEach(function(item) {
				console.log(item);
			})
		作为返回值
			function add() {
				var a = 10;
				return function() {// return function bar() {
					return a + 20
				}
			}
			add()();
	自执行函数
		模拟块级作用域
		(function () {
			console.log("111111111111")
		})();

		for (var i = 1; i <= 5; i++) {
			(function (i) {
				setTimeout( function timer() {
					console.log(i);
				}, i*1000 );
			})(i);
		}

${}中可以是变量，也可以是表达式，还可以是一个函数
// 表达式
	var a = 1;
	var b = 2;
	`add: ${a + b}`
// 函数
	var foo = () => {
		return 1;
	}
	`foo: ${foo()}`


构造函数的函数名首字母必须大写
内部使用this对象，来指向将要生成的对象实例
new 会有如下实现
	创建（或者说构造）一个全新的对象。
	这个新对象会被执行[[ 原型]] 连接。
	这个新对象会绑定到函数调用的this。
	如果函数没有返回其他对象，那么new 表达式中的函数调用会自动返回这个新对象

	//将构造函数以参数形式传入
	function New(func) {
		// 声明一个中间对象，该对象为最终返回的实例
		var res = {};
		if(func.prototype !== null) {
			// 将实例的原型指向构造函数的原型
			res.__prote__ = func.prototype;
		}
		// ret 为构造函数执行的结果
		// 通过apply，将构造函数内部的this指向修改为指向res，即为实例对象
		var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));

		// 当在构造函数中明确之地了返回对象时，那么new的执行结果就是该返回对象
		if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
			return ret;
		}
		//如果没有明确指定返回对象，则默认返回res，这个res就是实例对象
		return res;
	}

当一个对象是原型时，A.constructor 指向构造函数
当一个对象是构造函数时， B.prototype 指向原型
当一个对象是实列时，C.__proto__ 指向它的原型

__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
__proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。


'\r' 回车，回到当前行的行首，而不会换到下一行，如果接着输出的话，本行以前的内容会被逐一覆盖；
'\n' 换行，换到当前位置的下一行，而不会回到行首


call,apply和bind方法
	js中的call(), apply()和bind()是Function.prototype下的方法
	如果call和apply的第一个参数写的是null，那么this指向的是window对象
	call()和apply()唯一区别是参数不一样
	bind()是返回一个新函数，供以后调用，而apply()和call()是立即调用。


	
