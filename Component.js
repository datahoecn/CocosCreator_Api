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
    	player: Player,
    	type: 'Integer'
    },
    onLoad: function () {
    	//你可以在onLoad里面访问场景的节点和数据，这个时候场景的节点和数据都已经准备好了
    	//组件挂接的对象在初始化完成后的回调函数
    },
    start: function() {
    	// 组件在第一次update调用之前调用
    	comp.uuid		String 组件的 uuid，用于编辑器。
		comp.enabled 	Boolean 表示该组件自身是否启用。
		comp.enabledInHierarchy	Boolean 表示该组件是否被启用并且所在的节点也处于激活状态。
		this.destroy(); 销毁该对象，并释放所有它对其它对象的引用。
		this.name;
		this.isValid;

    	this.schedule(this.callback, interval, repeat, delay);
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
	    //当该组件被启用，并且它的节点也激活时。
	    //倘若节点第一次被创建且 enabled 为 true，则会在 onLoad 之后，start 之前被调用。
    },
    onDisable: function() {
        // 当该组件被禁用或节点变为无效时调用
    },
    onDestroy: function() {
        // 组件实例销毁的时候调用
    },
});

setTimeout
    start: function () {
        // 5 秒后销毁目标节点
        setTimeout(function () {
          this.target.destroy();
        }.bind(this), 5000);
    },
    结束定时clearTimeout()

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