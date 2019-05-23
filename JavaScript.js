
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