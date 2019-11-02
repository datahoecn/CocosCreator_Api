//cc.Class 是一个由 cc.Component 派生出来的组件类
//Class() 就是 cc 模块下的一个方法，这个方法用于声明 Cocos Creator 中的类
//调用 cc.Class，传入一个原型对象，在原型对象中以键值对的形式设定所需的类型参数，就能创建出所需要的类。

const SEGEMENTS_MIN = 3;
cc.Mask = module.exports = Mask;
this.node.getComponent(cc.Label) === this.getComponent(cc.Label);

//cc.Vec2是类型，cc.v2只是一个创建二维向量简便写法,用cc.v2就不用在前面加new
f v2(x, y){
    return new Vec2(x, y);
}

properties
    node                Node 该组件被附加到的节点。
    uuid                String 组件的 uuid，用于编辑器。
    enabled             Boolean 表示该组件自身是否启用。
    enabledInHierarchy  Boolean 表示该组件是否被启用并且所在的节点也处于激活状态。
    _isOnLoadCalled     Number 返回一个值用来判断 onLoad 是否被调用过，不等于 0 时调用过，等于 0 时未调用。
    name                String 该对象的名称。
    isValid             Boolean 表示该对象是否可用（被 destroy 后将不可用）

method
    update 如果该组件启用，则每帧调用 update。
    lateUpdate 如果该组件启用，则每帧调用 LateUpdate。
    onLoad 当附加到一个激活的节点上或者其节点第一次激活时候调用。
    start 如果该组件第一次启用，则在所有组件的 update 之前调用。
    onEnable 当该组件被启用，并且它的节点也激活时。
    onDisable 当该组件被禁用或节点变为无效时调用。
    onDestroy 该方法为生命周期方法，父类未必会有实现。
    addComponent 向节点添加一个组件类，你还可以通过传入脚本的名称来添加组件。
    getComponent 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。
    getComponents 返回节点上指定类型的所有组件。
    getComponentInChildren 递归查找所有子节点中第一个匹配指定类型的组件。
    getComponentsInChildren 递归查找自身或所有子节点中指定类型的组件
    schedule 调度一个自定义的回调函数。 component.schedule(this.callback, interval, repeat, delay);
    scheduleOnce 调度一个只运行一次的回调函数，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
    unschedule 取消调度一个自定义的回调函数。
    unscheduleAllCallbacks 取消调度所有已调度的回调函数：定制的回调函数以及 'update' 回调函数。
    destroy 销毁该对象，并释放所有它对其它对象的引用。

const Player = require('Player');
let Mask = cc.Class({
    name: "sprite"//设置类名为 "sprite"，类名用于序列化，一般可以省略。
	// 基类，可以是任意创建好的 cc.Class
	// 值类型：Function
    extends: cc.Component,
    statics: {
    	// 静态成员定义
	   // 值类型：Object
        _count: 0,
        getCount: function () {}
    },
    ctor: function () {
    	// 构造函数
		// 值类型：Function
    },

    editor: {
    	// 提供给 Component 的子类专用的参数字段
		// 值类型：Object
        disallowMultiple: true
        executionOrder: -1 //越小，该组件相对其它组件就会越先执行,默认为 0，
    }
    properties: {
        trget: null,    //当声明的属性为基本 JavaScript 类型时，可以直接赋予默认值
        target: cc.Node,//构造函数来完成声明
        Sprite:{//代码创建
            type: cc.Sprite//type: [cc.Node] type 同样写成数组，提高代码可读性
            default: null or [] 
        },     
        //数组声明
        any: [],      // 不定义具体类型的数组
        pos  : [cc.Vec2]
        enemies: {
            default: [],//default 必须设置为 []
            type: [cc.Node]//type 同样写成数组，提高代码可读性
        },
        pos  : cc.v2(10, 20),
        pos: {
            default: null,
            type: cc.Vec2
        }
        color: new cc.Color(255, 255, 255, 128)
        color: cc.color(0,0,0,255)          
        size : cc.size(0,0)  

        cc.Vec2
        cc.Color
        cc.Rect
        cc.Boolean
        cc.String
        cc.Float
        cc.Integer
    },
    onLoad: function () {
    	//你可以在onLoad里面访问场景的节点和数据，这个时候场景的节点和数据都已经准备好了
    	//组件挂接的对象在初始化完成后的回调函数
    },
    start: function() {
    	// 组件在第一次update调用之前调用
    	this.scheduleOnce(function() {
	        this.doSomething();
	    }, 2);
	    this.unschedule(this.callback);
	    this.unscheduleAllCallbacks();
    },
    update: function (dt) {
    },
    lateUpdate: function(dt) {
        //刷新完后调用(会在所有画面更新后执行);
    },
    onEnable: function() {
        //this.enabled：是否每帧执行该组件的update方法，同时也用来控制渲染组件是否显示
        //当组件的 enabled 属性从 false 变为 true 时，
        //或者所在节点的 active 属性从 false 变为 true 时
        //倘若节点第一次被创建且 enabled 为 true，则会在 onLoad 之后，start 之前被调用。
    },
    onDisable: function() {
        // 当该组件被禁用或节点变为无效时调用
    },
    onDestroy: function() {
        // 组件实例销毁的时候调用
    },
});

var Sprite = cc.Class({
    ctor: function () {
        cc.log(this instanceof Sprite);    // true
    }
    name: "sprite"
});
//Sprite 变量保存的是一个 JavaScript 构造函数，可以直接 new 出一个对象：
var obj = new Sprite();
//需要做类型判断时，可以用 JavaScript 原生的 instanceof：
cc.log(obj instanceof Sprite);

//两个传入参数都必须是类的构造函数，而不是类的对象实例。如果传入的两个类相等，isChildClassOf 同样会返回 true。
cc.log(cc.isChildClassOf(Texture2D, Texture));   // true

get/set 声明
    在属性中设置了 get 或 set 以后，访问属性的时候，就能触发预定义的 get 或 set 方法。定义方法如下：
    this.width = 100;//这种行为就等于是调用 this.width.set(100)函数
    cc.log(this.width)//(this.width)则是调用this.width.get()函数;

    需要另一个变量 _width 来保存它set/get的值
    _width 作为对象的属性也可以不用声明，get时会返还undefined，不会报错
    properties: {
        width: {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            }
        }
    }

完整声明
    properties: {
        score: {
            default: 0,
            displayName: "Score (player)",
            tooltip: "The score of player",
        }
    }

    //default: 设置属性的默认值，这个默认值仅在组件第一次添加到节点上时才会用到
    //type: 限定属性的数据类型，详见 CCClass 进阶参考：type 参数
    //visible: 设为 false 则不在 属性检查器 面板中显示该属性
    //serializable: 设为 false 则不序列化（保存）该属性
    //displayName: 在 属性检查器 面板中显示成指定名字
    //tooltip: 在 属性检查器 面板中添加属性的 Tooltip//当鼠标移到参数上时，显示对应的 Tooltip。


cc.Component属性
    this.node 当前组件挂载的节点对象
    this.name 节点的名称 + <组件名称>
    this.node.name 节点名称
    组件.node 组件实例找对应的节点

setTimeout
    start: function () {
        // 5 秒后销毁目标节点
        setTimeout(function () {
          this.target.destroy();
        }.bind(this), 5000);
    },
    结束定时clearTimeout()
    this.intervalId = null;
    if(!this.intervalId) 
    {
        this.intervalId = setTimeout(()=>{
            this.intervalId = null;
            this._syncLocalData();
        },this.syncLocalDataInterval);
    }

    if(this.intervalId) 
    {
        clearTimeout(this.intervalId);
        this.intervalId = null;
    }

setInterval
    //第一个参数是定时器回调函数，第二个参数是定时器的时间间隔，单位为毫秒。
    onLoad: function () {
        var self = this;
        this.inervalId = setInterval(function () {
            self.toggleNodesVisibility();
        }, 1000);
    },
    // 当脚本被销毁时，要记得释放定时器
    onDestroy: function () {
        clearInterval(this.inervalId);
    },