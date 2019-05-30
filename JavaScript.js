0 是false

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

boolean && want();
want && want(); // 先判断want存在，如果不存在就不会执行后面

解析结构
	var [a, b, c, d = 1] = array;
	a === array[0]; // true

	var obj = {
		a: 1,
		b: 2,
		c: 3
	}
	var {a, b, c} = obj;

展开运算符
	//也可展开对象
	var arr1 = [1, 2, 3];
	var arr2 = [...arr1, 4, 5, 6];

	var arr1 = [1, 2, 3];
	var c = arr1.reduce((a, b) => a + b); // c 值是 6；

函数形式
	函数声明//声明的函数比var声明的变量有更加优先的执行顺序
		function fn() {
			console.log("function");
		}
	函数表达式//将一个函数体赋值给一个变量的过程
		其中，var fn = undefined会先执行，不能直接使用，需要提前声明
			var fn = function() {}
		对象中添加方法
			var a = {
				m: 20,
				get: function() {
					retrun this.m;
				}
			}
	匿名函数//作为一个参数或返回值
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
				return function() {
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

`${a} + 11111111`

new 会有如下实现
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



return cc.game.groupList[this.groupIndex] || ''

JavaScript 是属于网络的脚本语言

Math
	Math.floor()//向下取整

Array
	push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
	arrayObject.length//获取数组长度

	//对数组的每个元素执行一次提供的函数
	array.forEach(function(element) {
	  console.log(element);
	});

Date
	Date.now()

Number
	Number.toFixed(num)//四舍五入,规定小数的位数，是 0 ~ 20 之间的值
	//string 要被解析的字符串
	//radix  可选。表示要解析的数字的基数。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。
	parseInt(string, radix) 函数可解析一个字符串，并返回一个整数。
	parseFloat(string)解析一个字符串，并返回一个浮点数。

String
	//return a array,
	//howmany 可选,限制返回的数组长度
	//separator 字符串或正则表达式，从该参数指定的地方分割
	stringObject.split(separator,howmany)

	//item1,.....,itemX可选。向数组添加的新项目。
	//index位置，howmany要删除的项目数量，如果设置为 0，则不会删除项目
	arrayObject.splice(index,howmany,item1,.....,itemX)
											
	//如果不存在，返回-1
	//searchvalue需检索的字符串值。
	//fromindex可选，开始检索的位置。值0到stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。
	//返回某个指定的字符串值在字符串中首次出现的位置。
	stringObject.indexOf(searchvalue,fromindex)
		
function
	随机一个整数//min ~ max-1, 只用当 Math.random() = 1 时，值才会是max
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min)) + min;
	}



break 语句用于跳出循环。
continue 用于跳过循环中的一个迭代。

__proto__ 属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，
			那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，
			然后返回undefined，通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
prototype 属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
constructor 属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。

var a, i = 10;
a = i ++; //这里i要先赋值，再自加。语句执行后a=10, i = 11;
a = ++i; //这里i要先自加，再赋值。语句执行后a=11, i = 11;

require	
	可以导出组件
	可以导出对象	module.exports = cfg;//cfg = {}

	封装私有变量
	var dirty = false;
	module.exports = {
	    setDirty: function () {
	        dirty = true;
	    },
	    isDirty: function () {
	        return dirty;
	    },
	};	

require 可以在脚本的任何地方任意时刻进行调用。
游戏开始时会自动 require 所有脚本，这时每个模块内部定义的代码就会被执行一次
之后无论又被 require 几次，返回的始终是同一份实例。


function actions(node) {
    this.node = node;
}

var actions = require("../UI/InActions.js");
var action = new actions(splashNode);//splashNode也是节点


换行符‘\n’和回车符‘\r’
换行符就是另起一行，回车符就是回到一行的开头
键盘Enter键换行实则应该叫做叫做回车换行(\r\n)
windows下可直接使用\n来匹配换行符，但仍然推荐使用标准的\r\n来匹配键盘Enter键的换行符;
windows下enter是 \r\n; 
linux/unix下是\n; 
mac下是\r

var rows = content.text.split("\r\n");


var a //undefined
//如果a是null，或者a未定义
if (a === null || a === undefined){
    a = {};
}


switch (this._curType) {
    case 'SpriteFrame':
        break;
    case 'Txt':
    case 'Audio':
        break;
    default:
    	break;
}


在全局对象中，this指向的是window对象；在自定义函数中，this对象指向的是调用这个函数的对象
this的四种用法
	在一般函数方法中使用 this 指代全局对象

	全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。
	通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。
	全局对象不是任何对象的属性，所以它没有名称。

	在顶层 JavaScript 代码中，可以用关键字 this 引用全局对象。
	但通常不必用这种方式引用全局对象，因为全局对象是作用域链的头，
	这意味着所有非限定性的变量和函数名都会作为该对象的属性来查询。
	例如，当JavaScript 代码引用 parseInt() 函数时，
	它引用的是全局对象的 parseInt 属性。全局对象是作用域链的头，
	还意味着在顶层 JavaScript 代码中声明的所有变量都将成为全局对象的属性。

	作为构造函数调用，this 指代new 出的对象
	function test(){
　　　　this.x = 1;
　　}
　　var o = new test();
	console.log(o.x); // 1

call,apply和bind方法
	js中的call(), apply()和bind()是Function.prototype下的方法
	//注意如果call和apply的第一个参数写的是null，那么this指向的是window对象
	call()、apply()和bind()都是用来改变函数执行时的上下文，可借助它们实现继承；
	call()和apply()唯一区别是参数不一样，call()是apply()的语法糖；
	bind()是返回一个新函数，供以后调用，而apply()和call()是立即调用。


在JavaScript 中，构造函数只是一些使用new 操作符时被调用的函数。
它们并不会属于某个类，也不会实例化一个类。
实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被new 操作符调用的普通函数而已。

构造函数的意义就是要用它来创建实例
那么所有属于实例的成员都需要用this来定义；
而只有那些不属于实例的成员才不会用this定义；

使用new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
	创建（或者说构造）一个全新的对象。
	这个新对象会被执行[[ 原型]] 连接。
	这个新对象会绑定到函数调用的this。
	如果函数没有返回其他对象，那么new 表达式中的函数调用会自动返回这个新对象

if (!a || b === c) return;
typeof(a)