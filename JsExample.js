
    构造函数的函数名首字母必须大写
    内部使用this对象，来指向将要生成的对象实例
    
__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的，因为函数也是一种对象，所以函数也拥有__proto__和constructor属性。
__proto__属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的__proto__属性所指向的那个对象（父对象）里找，一直找，直到__proto__属性的终点null，再往上找就相当于在null上取值，会报错。通过__proto__属性将对象连接起来的这条链路即我们所谓的原型链。
prototype属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即f1.__proto__ === Foo.prototype。
constructor属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向Function。


收集参数
// length 是js函数对象的一个属性值，该值是指 “该函数有多少个必须要传入的参数”，即形参的个数
function createCurry(func, arity, args) {
    var arity = arity || func.length;
    var args = args || [];
    var wrapper = function() {
        var _args= [].slice.call(arguments);
        [].push.apply(args, _args);

        if(_args.length < arity) {
            arity -= _args.length;
            return createCurry(func, arity, args);
        }

        return func.apply(func, args);
    }

    return wrapper;
}
function add(a,b,c) {
    return a + b + c;
}
var _add = createCurry(add);
var a = _add(1)(2, 3);

对象转数组
var toArray = function(s){
    try{
        return Array.prototype.slice.call(s);
    }
    catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
               arr[i] = s[i];
        }
        return arr;
    }
}



随机一个整数//min ~ max-1, 只用当 Math.random() = 1 时，值才会是max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
随机一个位置
getRandomPosition: function() {
    return cc.v2((Math.random() - 0.5) * 2 * this.randomRange.x, (Math.random() - 0.5) * 2 * this.randomRange.y);
},

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

    

function actions(node) {
    this.node = node;
}

var actions = require("../UI/InActions.js");
var action = new actions(splashNode);//splashNode也是节点