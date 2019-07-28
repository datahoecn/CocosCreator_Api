

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
    schedule 调度一个自定义的回调函数。
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
        // interval 等于 0 时，每帧都会调用，和update一样
        // repeat 重复次数，回调repeat + 1 次，"kCCRepeatForever"代表永久
        // delay 等于 0 会在下一帧调用
    	component.schedule(this.callback, interval, repeat, delay);
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