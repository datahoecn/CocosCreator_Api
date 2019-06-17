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