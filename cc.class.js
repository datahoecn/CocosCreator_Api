//cc 是 Cocos 的简称，Cocos 引擎的主要命名空间，引擎代码中所有的类、函数、属性和常量都在这个命名空间中定义
//Class() 就是 cc 模块下的一个方法，这个方法用于声明 Cocos Creator 中的类
//调用 cc.Class，传入一个原型对象，在原型对象中以键值对的形式设定所需的类型参数，就能创建出所需要的类。
require()
const i18n = require('i18n');
cc.Class({
    name: "sprite"//设置类名为 "sprite"，类名用于序列化，一般可以省略。
    extends: cc.Component,//组件的基类，是用于控制整个组件运行的基类
    properties: {
        trget: null,    //当声明的属性为基本 JavaScript 类型时，可以直接赋予默认值
        target: cc.Node,//构造函数来完成声明
        pos: cc.Vec2,//cc.Sprite cc.SpriteFrame cc.Node cc.Label cc.Prefab
        //cc.Canvas cc.Toggle cc.ProgressBar cc.ScrollView cc.Boolean cc.String cc.Float cc.Integer

        Sprite:{//代码创建
            type: cc.Sprite//type: [cc.Node] type 同样写成数组，提高代码可读性
            default: null or [] 
        },

        color: new cc.Color(255, 255, 255, 128),//当声明属性的类型继承自 cc.ValueType 时（如：cc.Vec2，cc.Color 或 cc.Rect），
        pos  : new cc.Vec2(10, 20),
        color: cc.color(0,0,0,255) 
        pos  : cc.p(0,0)           
        size : cc.size(0,0)        

        //数组声明
        any: [],      // 不定义具体类型的数组
        pos  : [cc.Vec2]
        enemies: {
            default: [],//default 必须设置为 []
            type: [cc.Node]//type 同样写成数组，提高代码可读性
        },
    },
    //你可以在onLoad里面访问场景的节点和数据，这个时候场景的节点和数据都已经准备好了
    //组件加载时运行
    onLoad: function () {
    },
    // 组件在第一次update调用之前调用
    start: function() {
        this.scheduleOnce(function() {
                console.log("scheduleOnce called");
            }.bind(this),
            5);

        // 只取消一个, unschedule(函数对象)
        var callback = function() {
            console.log("======================");
        }.bind(this);
        this.schedule(callback, 0.5); // 默认值为永远执行，马上开始

        this.scheduleOnce(function() {
                // 取消了一个定时器
                this.unschedule(callback);
            }.bind(this),5);
    },

    // 每次游戏刷新的时候调用, dt距离闪一次刷新的时间
    //每0.5更新一次内容
    update: function (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < 0.5) return;
        this.updateTimer = 0;
    },
    // 不是特别常用
    lateUpdate: function(dt) {
        console.log("lateUpdate",dt);
    },

    // 组件被激活的时候调用
    onEnable: function() {
        console.log("onEnable");
    },

    // 组件被禁用的时候调用
    onDisable: function() {
        console.log("onDisable");
    },

    // 组件实例销毁的时候调用
    onDestroy: function() {
        console.log("onDestroy");
    },

    onBtnLeftClicked: function() {
        console.log('Button clicked!');
        this.label.textKey = i18n.t("cases/02_ui/03_button/SimpleButton.js.1");
        this.progressBar.progress = 0;
        this.btn_1.interactable = false;//Interactable：是否响应交互，不勾选相当于禁用。
    },

    _onRegisteredEvent: function () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
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

组件入口函数
onLoad: 组件加载时运行
start: 在第一次update()运行前调用
update(dt):场景刷新时调用,dt距离上一次刷新的时间;
lateUpdate(dt) 刷新完后调用(会在所有画面更新后执行);
onEnable: 启用这个组件的时候调用;
onDisable: 禁用这个组件的时候调用;
onDestroy: 组件实例销毁的时候调用;

cc.Component属性
this.node 当前组件挂载的节点对象
this.name 挂载该组件的节点的名称<组件名称>
this.node.name 挂载了该组件的节点名称
组件.node 组件实例找对应的节点

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

组件操作//可以不加组件类型getComponentInChildren()
this.addComponent(组件类型): 向节点上添加一个组件实例, 返回挂上的组件实例;
this.getComponent(组件类型): 查找一个为指定类型的组件实例(如果有多个，第一个匹配);
this.getComponents(组件类型): 查找这个节点上所有这个类型的组件实例;[inst1, inst2, inst3, ...]
this.getComponentInChildren(组件类型): 在自己与子节点里面查找;
this.getComponentsInChildren (组件类型): 在自己与子节点里面查找;
this.destroy(): 从节点中删除这个组件的实例;

var test = this.addComponent("test");//"test"是自定义cc.class
test = this.node.addComponent("test"); //两个代码实现相同的功能

node.addComponent(cc.Sprite)
node.addComponent(dragonBones.ArmatureDisplay)
import SpriteAnim from '../../../Engine/SpriteAnim';
node.addComponent(SpriteAnim);

Shedule定时器操作
// 启动定时器, 节点或组件必须是激活状态,  例如被隐藏的节点，都是无法启动定时器的;
this.scheduleOnce(callback,delay)在delay秒之后调用callback一次
this.schedule(callback,interval,repeat ,delay); 在delay秒后调用callback重复repeat+1次，并且每隔interval秒调用一次。
//如果repeat为cc.macro.REPEAT_FOREVER则无限调用callback函数
this.unschedule(callback_fn); // 取消调度一个自定义的回调函数
this.unscheduleAllCallbacks()取消所有的定时器操作;



