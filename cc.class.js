cc.Class 是一个很常用的 API，用于声明 Cocos Creator 中的类
调用 cc.Class，传入一个原型对象，在原型对象中以键值对的形式设定所需的类型参数，就能创建出所需要的类。

var Sprite = cc.Class({
    name: "sprite"
});

//Sprite 变量保存的是一个 JavaScript 构造函数，可以直接 new 出一个对象：
var obj = new Sprite();

//需要做类型判断时，可以用 JavaScript 原生的 instanceof：
cc.log(obj instanceof Sprite);

//使用 ctor 声明构造函数：
var Sprite = cc.Class({
    ctor: function () {
        cc.log(this instanceof Sprite);    // true
    }
});

简单声明
    当声明的属性为基本 JavaScript 类型时，可以直接赋予默认值：
    properties: {
      height: 20,       // number
      type: "actor",    // string
      loaded: false,    // boolean                
      target: null,     // object
    }

    构造函数来完成声明
        properties: {
          target: cc.Node,
          pos: cc.Vec2,
        }

    当声明属性的类型继承自 cc.ValueType 时（如：cc.Vec2，cc.Color 或 cc.Rect），
    除了上面的构造函数，还可以直接使用实例作为默认值：
        properties: {
          pos: new cc.Vec2(10, 20),
          color: new cc.Color(255, 255, 255, 128),
        }

    当声明属性是一个数组时，可以在声明处填写他们的类型或构造函数来完成声明
        properties: {
          any: [],      // 不定义具体类型的数组
          bools: [cc.Boolean],
          strings: [cc.String],
          floats: [cc.Float],
          ints: [cc.Integer],

          values: [cc.Vec2],
          nodes: [cc.Node],
          frames: [cc.SpriteFrame],//图片
        }

完整声明
    properties: {
        score: {
            default: 0,
            displayName: "Score (player)",
            tooltip: "The score of player",
        }
    }

    default: 设置属性的默认值，这个默认值仅在组件第一次添加到节点上时才会用到
    type: 限定属性的数据类型，详见 CCClass 进阶参考：type 参数
    visible: 设为 false 则不在 属性检查器 面板中显示该属性
    serializable: 设为 false 则不序列化（保存）该属性
    displayName: 在 属性检查器 面板中显示成指定名字
    tooltip: 在 属性检查器 面板中添加属性的 Tooltip//当鼠标移到参数上时，显示对应的 Tooltip。

数组声明
    数组的 default 必须设置为 []，如果要在 属性检查器 中编辑，
    还需要设置 type 为构造函数，枚举，或者 cc.Integer，cc.Float，cc.Boolean 和 cc.String。
    properties: {
        names: {
            default: [],
            type: [cc.String]   // 用 type 指定数组的每个元素都是字符串类型
        },

        enemies: {
            default: [],
            type: [cc.Node]     // type 同样写成数组，提高代码可读性
        },
    }

get/set 声明
    在属性中设置了 get 或 set 以后，访问属性的时候，就能触发预定义的 get 或 set 方法。定义方法如下：
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





cc.Component
组件的基类，是用于控制整个组件运行的基类
节点必须是激活、可见状态才会调用

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

properties属性列表基本类型
    any  : []
    num  : 100                  数字类型属性
    bool : true                 布尔类型属性
    bool : [cc.Boolean]         布尔类型属性
    str  : "11111"              字符串类型属性
    str  : [cc.String]
    color: cc.color(0,0,0,255)  颜色类型属性
    pos  : cc.p(0,0)            位置类型属性
    pos  : new cc.Vec2(0, 0)    位置类型属性
    pos  : cc.Vec2              位置类型属性
    pos  : [cc.Vec2]            位置类型属性
    size : cc.size(0,0)         大小类型属性
    flo  : [cc.Float]
    ints : [cc.Integer]

    //完整声明
    //参数分别指定了 
    //score 的默认值为 0，
    //在 属性检查器 里，其属性名将显示为：“Score (player)”
    //当鼠标移到参数上时，显示对应的 Tooltip
    //default: 设置属性的默认值，这个默认值仅在组件第一次添加到节点上时才会用到
    //type: 限定属性的数据类型，详见 CCClass 进阶参考：type 参数
    //visible: 设为 false 则不在 属性检查器 面板中显示该属性
    //serializable: 设为 false 则不序列化（保存）该属性
    //displayName: 在 属性检查器 面板中显示成指定名字
    //tooltip: 在 属性检查器 面板中添加属性的 Tooltip
    score: {
        default: 0,
        displayName: "Score (player)",
        tooltip: "The score of player",
    }

    cc.Sprite       精灵组件实例(如果default:[]则为数组)
    cc.Label        文本实例
    cc.SpriteFrame  精灵帧类型
    cc.Node         节点实例
    cc.Prefab       预制文件实例
    cc.Canvas
    cc.Toggle
    cc.ProgressBar
    cc.ScrollView
    require()       文件

    Sprite:{
        type: cc.Sprite//type: [cc.Node] type 同样写成数组，提高代码可读性
        default: null or [] 
    },

    // 组件的代码组件
    custom_comp: {
        type: my_item,
        default: null, // null /[]
    }
    
组件操作//k可以不加组件类型进行搜索
addComponent(组件类型): 向节点上添加一个组件实例, 返回挂上的组件实例;
getComponent(组件类型): 查找一个为指定类型的组件实例(如果有多个，第一个匹配);
getComponents(组件类型): 查找这个节点上所有这个类型的组件实例;[inst1, inst2, inst3, ...]
getComponentInChildren(组件类型): 在自己与子节点里面查找;
getComponentsInChildren (组件类型): 在自己与子节点里面查找;
destroy(): 从节点中删除这个组件的实例;

var test = this.addComponent("test");
test = this.node.addComponent("test"); //两个代码实现相同的功能

Shedule定时器操作
scheduleOnce(callback,delay)在delay秒之后调用callback一次
schedule(callback,interval,repeat ,delay); 在delay秒后调用callback重复repeat+1次，并且每隔interval秒调用一次。
//如果repeat为cc.macro.REPEAT_FOREVER则无限调用callback函数
unschedule(callback_fn); // 取消调度一个自定义的回调函数
unscheduleAllCallbacks()取消所有的定时器操作;



//cc.Class 是一个很常用的 API，用于声明 Cocos Creator 中的类
//传入一个原型对象，在原型对象中以键值对的形式设定所需的类型参数，就能创建出所需要的类。
var Sprite = cc.Class({
    name: "sprite"
});
var obj = new Sprite();//Sprite 变量保存的是一个 JavaScript 构造函数，可以直接 new 出一个对象：
cc.log(obj instanceof Sprite);       // true

const i18n = require('i18n');
cc.Class({
    name: "sprite"//类名设为 "sprite"，类名用于序列化，一般可以省略。
    extends: cc.Component,
    properties: {
        custom_comp: {
        type: my_item,
        default: null, // null /[]
    }
    },
    //你可以在onLoad里面访问场景的节点和数据，这个时候场景的节点和数据都已经准备好了
    //组件加载时运行
    onLoad: function () {
    },
    // 组件在第一次update调用之前调用
    start: function() {
        // 添加组件，系统组件cc.Sprite, cc.Label等, "组件代码的名字"
        // 返回，返回挂上的组件实例
        var com_inst = this.addComponent("my_item");
        console.log('自定义组件：', com_inst.name);
    
        // 查找组件实例
        com_inst = this.getComponent("my_item");
        var com_array = this.getComponents("my_item"); // 返回的是组件数组[实例1，实例2， 实例3]
        console.log(com_inst, com_array);
 
        // 删除组件
         this.destroy(); // 删除当前的组件实例，触发onDisable, onDestroy的调用

        // 启动定时器, 节点或组件必须是激活状态,  例如被隐藏的节点，都是无法启动定时器的;
        // 这里只会触发一次调用
        this.scheduleOnce(function() {
                console.log("scheduleOnce called");
            }.bind(this),
            5);

        // schedule(函数, 多长时间掉一次, 次数(永远), 隔多少秒以后开始执行shedule)
        // 5秒钟以后，每隔1秒，我们调用6 + 1次函数(重复6次);
        this.schedule(function() {
                console.log("schedule called");
            }.bind(this),1,6,5); // 次数 6 + 1 = 7;
        // end 

        this.schedule(function() {
                console.log("schedule forerver called");
            }.bind(this),
            1,
            cc.macro.REPEAT_FOREVER,
            5); //5秒之后执行；每秒1次;  cc.macro.REPEAT_FOREVER 永远 


        // 取消所有的shedule
        this.scheduleOnce(function() {
                console.log("cancel all schedules");
                this.unscheduleAllCallbacks();
            }.bind(this),
            30);


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
