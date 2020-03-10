 @property([cc.SpriteFrame])
 spf:cc.SpriteFrame[] = [];

 @property(cc.Sprite)
 sp:cc.Sprite = null;

 private index:number = 0;
 private addCallback:any = null;
 private isOver:boolean = false;

setAddCallback(callback:any):void{
    this.addCallback = callback;
}

btn(event:cc.Event, data:string):void{
}

类型
	//基本类型
	boolean		var isDone : boolean = false;
	number  	var height : number = 6;
	string		var name : string = "bob";
	array		var list : number[] = [1,2,3]; 
	enum		enum Color {Red, Green, Blue};//enum类型是为了给一个数字集合更友好的命名
				var c : Color = Color.Green;
	any 		var notSure : any = 4;//any类型可以表示任意JavaScript值，只进行最小化静态检查
				notSure = "maybe string instead";
				notSure = false;//合法行为定义一个布尔类型

				var list : any[] = [1, true, "free"]
				list[1] = 100

	void 		function varnUser() : void {//在某种程度上，any的对立面是void，既所有类型都不存在
					alert("This is my warning message")
				}

	var TestVar;			//变量声名但未初始化,undefined
	var TestVar = null;		//变量被赋值null
	不能把 null 或 undefined 当作类型使用
	var TestVar : null;		//错误，类型错误
	var TestVar : undefined //错误，找不到undefined

	const:会创建一个保存在创建位置作用域中的常量

联合类型
	var path : string[] | string;
	path = "11111";
	path = ["11111", "222222"];

	typeof instanceof 运算符对类型进行验证
	var x : any = {}
	typeof x === "string"

类型别名
	类型别名常用于联合类型
	使用type关键字声明类型别名
	type aa = number
	type name = string|number
	let a:name = 123
	let b:aa = 456
	console.log(a)   //123
	console.log(b)   //456

环境声明
	declare var jQuery: (selector: string) => any;
	declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型是(selector: string) => any，
	仅仅会用于编译时的检查，在编译结果中会被删除

	jQuery('#foo');

运算符
	var a = b ? "b is true" : "b is false"

	迭代对象的属性
		var obj : any = {a : 1, b: 2, c: 3};
		for (var key in obj) {
			console.log(key + " = " + obj[key]);//"a = 1"
		}
		//如果只想枚举对象自己的属性（非继承属性）
		for (var key in obj) {
			if (obj.hasOwnProperty(prop)) {
			//prop没有被继承
			}
		}

函数
	具名函数
	//参数name后面加了问号(?)，表示参数是可选的
	//可选参数一定要放在必选参数的后
	function greet(name?: string): string{
		if (name){
			return "Hi! " + name;
		} else {
			return "Hi!";
		}
	}

	匿名函数
	var greet = function(name?: string): string{
		if (name){
			return "Hi! " + name;
		} else {
			return "Hi!";
		}
	}

	箭头函数 会绑定this操作符
	var greet = (name?: string): string => {
		if (name){
			return "Hi! " + name;
		} else {
			return "Hi!";
		}
	}

	//回调函数，a和b类型是number,callback类型是函数
	function sume(a: number, b: number, callback: (result: number) => void) {
		callback(a + b);
	}

	var foo = function() {
		console.log("foo")
	}

	function bar(cb : () => void){
		console.log("(bar");
		cb();
	}

	bar(foo)

类
	class Character {
		fullname: string;
		constructor(firstname: string, lastname: string) {
			this.fullname = firstname + " " + lastname;
		}
		greet(name?: string) {

		}
	}
	//使用new操作符构造了Character类的一个实例，会调用类的构造函数constructor
	var spark = new Character("Jacob", "Keyes");

接口（Interfaces）
	接口是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）
	也常用于对「对象的形状（Shape）」进行描述
	interface Person {
	    name: string;
	    age: number;
	}
	//约束了 tom 的形状必须和接口 Person 一致
	//赋值的时候，变量的形状必须和接口的形状保持一致
	let tom: Person = {
	    name: 'Tom',
	    age: 25
	};
	定义的变量比接口少了一些属性是不允许的
	let tom: Person = {
	    name: 'Tom'
	};
	多一些属性也是不允许的
	let tom: Person = {
	    name: 'Tom',
	    age: 25,
	    gender: 'male'
	};
	//可选属性age?，可以不定义age
	interface Person {
	    name: string;
	    age?，: number;
	}

	类与接口
	interface Alarm {
	    alert();
	}

	class SecurityDoor extends Door implements Alarm {
	    alert() {
	        console.log('SecurityDoor alert');
	    }
	}

命名空间
	使用 namespace 和 export 关键字


装饰器使用 @ 字符开头作为标记，装饰器主要用于编辑器对组件和属性的识别
const {ccclass, property} = cc._decorator; // 从 cc._decorator 命名空间中引入 ccclass 和 property 两个装饰器

@ccclass // 使用装饰器声明 CCClass
export default class NewClass extends cc.Component { // ES6 Class 声明语法，继承 cc.Component

    @property(cc.Label)     // 使用 property 装饰器声明属性，括号里是属性类型，装饰器里的类型声明主要用于编辑器展示
    label: cc.Label = null; // 这里是 TypeScript 用来声明变量类型的写法，冒号后面是属性类型，等号后面是默认值

    // 也可以使用完整属性定义格式
    @property({
        visible: false
    })
    text: string = 'hello';

    // 成员方法
    onLoad() {
        // init logic
    }
}

TypeScript 的 public, private 修饰符不影响成员在 属性检查器 中的默认可见性，默认的可见性仍然取决于成员变量名是否以下划线开头

function func1( ...args ) {//...操作符的作用是用来声明任意数量的方法参数

函数重载
	console.log(`${a} + 11111111`);//反引号 模板字符串中嵌入变量，需要将变量名写在${}之中

	什么的签名？是Java语言中类的方法的签名吧。其实就是方法的声明

	函数重载：使用相同名称，不同参数 数量 或 类型 创建多个方法。 返回值也要一样

使用下划线(_)开始的变量名作为私有变量名

闭包就是能够读取其他函数内部变量的函数。例如在javascript中，只有函数内部的子函数才能读取局部变量，
所以闭包可以理解成“定义在一个函数内部的函数“。在本质上，闭包是将函数内部和函数外部连接起来的桥梁







