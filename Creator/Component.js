cc.Class 是一个由 cc.Component 派生出来的组件类
Class() 就是 cc 模块下的一个方法，这个方法用于声明 Cocos Creator 中的类
调用 cc.Class，传入一个原型对象，在原型对象中以键值对的形式设定所需的类型参数，就能创建出所需要的类。

const SEGEMENTS_MIN = 3;
cc.Mask = module.exports = Mask;

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
    name: "sprite",//设置类名，类名用于序列化，一般可以省略。
    extends: cc.Component, // 值类型：Function
    statics: {
        _count: 0,
        getCount: function () {} //// 静态成员定义
    },
    ctor: function () {
    	// 构造函数
    },
    editor: {
    	executeInEditMode: false,// 允许当前组件在编辑器模式下运行。默认只会在运行时执行
        requireComponent: null,// 指定当前组件的依赖组件.
                                // 该选项在运行时同样有效。
                                // 当组件添加到节点上时，如果依赖的组件不存在，引擎将会自动将依赖组件添加到同一个节点，防止脚本出错
        executionOrder: 0,// 脚本生命周期回调的执行优先级。小于 0 的脚本将优先执行，大于 0 的脚本将最后执行。
                        // 该优先级只对 onLoad, onEnable, start, update 和 lateUpdate 有效，对 onDisable 和 onDestroy 无效。
        disallowMultiple: false,// 当本组件添加到节点上后，禁止同类型（含子类）的组件再添加到同一个节点，
        menu: "", // 用来将当前组件添加到组件菜单中，方便用户查找（如 "Rendering/Camera"）
        playOnFocus: false, // 当设置了 "executeInEditMode" 以后，playOnFocus 可以用来设定选中当前组件所在的节点时，编辑器的场景刷新频率,
                            // 设置为 true，场景渲染将保持 60 FPS，如果为 false，场景就只会在必要的时候进行重绘。
        inspector: "", // 自定义当前组件在 **属性检查器** 中渲染时所用的网页 url。
        icon: "", // 自定义当前组件在编辑器中显示的图标 url。
        help: "", // 指定当前组件的帮助文档的 url，设置过后，在 **属性检查器** 中就会出现一个帮助图标，
    }
    properties: {
        pos  : [cc.Vec2] // cc.v2(10, 20),
        color: new cc.Color(255, 255, 255, 128) // cc.color(0,0,0,255)        
        size : cc.size(0,0)  

        cc.Vec2
        cc.Color
        cc.Rect
        cc.Boolean
        cc.String
        cc.Float
        cc.Integer
    },
});


//两个传入参数都必须是类的构造函数，而不是类的对象实例。如果传入的两个类相等，isChildClassOf 同样会返回 true。
cc.log(cc.isChildClassOf(Texture2D, Texture));   // true

get/set 声明
    width: {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        }
    }
    

完整声明
    score: {
        default: 设置属性的默认值，这个默认值仅在组件第一次添加到节点上时才会用到
        type: 限定属性的数据类型
        visible: 设为 false 则不在 属性检查器 面板中显示该属性
        serializable: 设为 false 则不序列化（保存）该属性
        displayName: 在 属性检查器 面板中显示成指定名字
        tooltip: 在 属性检查器 面板中添加属性的 Tooltip//当鼠标移到参数上时，显示对应的 Tooltip。
    }
    

setTimeout
    setTimeout(function () {
      this.target.destroy();
    }.bind(this), 5000);
结束定时 clearTimeout()
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