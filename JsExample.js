


收集参数
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
    } catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
               arr[i] = s[i];
        }
         return arr;
    }
}

取值范围为 0 ~ 1 之间
value < 0 ? 0 : value < 1 ? value : 1;

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