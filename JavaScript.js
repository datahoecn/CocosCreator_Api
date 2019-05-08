
push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。

for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
	let item = cc.instantiate(this.itemTemplate);
	this.content.addChild(item);
	item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
	item.getComponent('Item').updateItem(i, i);
    this.items.push(item);//items是数组
}

JavaScript 是属于网络的脚本语言

Math.floor()//向下取整

//随机一个整数，min ~ max-1, 只用当 Math.random() = 1 时，值才会是max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Date.now()
Number.toFixed(num)//四舍五入,规定小数的位数，是 0 ~ 20 之间的值

var a, i = 10;
a = i ++; //这里i要先赋值，再自加。语句执行后a=10, i = 11;
a = ++i; //这里i要先自加，再赋值。语句执行后a=11, i = 11;

require 返回的就是被模块导出的对象，通常我们都会将结果立即存到一个变量（var Rotate）
传入 require 的字符串就是模块的文件名，这个名字不包含路径也不包含后缀，而且大小写敏感。
var Rotate = require("Rotate");

require 可以在脚本的任何地方任意时刻进行调用。
游戏开始时会自动 require 所有脚本，这时每个模块内部定义的代码就会被执行一次
之后无论又被 require 几次，返回的始终是同一份实例。
调试时，可以随时在 Developer Tools 的 Console 中 require 项目里的任意模块。

var actions = require("../UI/InActions.js");
function actions(node) {
    this.node = node;
}

var action = new actions(splashNode);//splashNode也是节点


parseInt(string, radix) 函数可解析一个字符串，并返回一个整数。
string 要被解析的字符串
radix  可选。表示要解析的数字的基数。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。
parseFloat(string)解析一个字符串，并返回一个浮点数。


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
    	cc.loader.load(url, loadCallBack);
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

	apply 调用 ，apply方法作用是改变函数的调用对象，此方法的第一个参数为改变后调用这个函数的对象，this指代第一个参数
	var x = 0;
　　function test(){
		console.log(this.x);
　　}
　　var o={};
　　o.x = 1;
　　o.m = test;
　　o.m.apply(); //0
//apply()的参数为空时，默认调用全局对象。因此，这时的运行结果为0，证明this指的是全局对象。如果把最后一行代码修改为
　　o.m.apply(o); //1


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
this._audioSource instanceof cc.AudioSource//检测某个对象是不是另一个对象的实例

//return a array,
stringObject.split(separator,howmany)//separator字符串或正则表达式，从该参数指定的地方分割 stringObject。
	//howmany可选,限制返回的数组长度
	
arrayObject.length//获取数组长度
arrayObject.splice(index,howmany,item1,.....,itemX)//index位置，howmany要删除的项目数量，如果设置为 0，则不会删除项目
										//item1,.....,itemX可选。向数组添加的新项目。
//如果不存在，返回-1
stringObject.indexOf(searchvalue,fromindex)//返回某个指定的字符串值在字符串中首次出现的位置。
	//searchvalue需检索的字符串值。
	//fromindex可选，开始检索的位置。值0到stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。

//对数组的每个元素执行一次提供的函数
array.forEach(function(element) {
  console.log(element);
});