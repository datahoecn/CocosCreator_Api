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