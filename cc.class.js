//cc.Class 是一个由 cc.Component 派生出来的组件类
//Class() 就是 cc 模块下的一个方法，这个方法用于声明 Cocos Creator 中的类
//调用 cc.Class，传入一个原型对象，在原型对象中以键值对的形式设定所需的类型参数，就能创建出所需要的类。

    const Node = require('../CCNode');

    let _vec2_temp = cc.v2();

    function _calculateCircle (center, radius, segements) {
    }

    let MaskType = cc.Enum({
        RECT: 0,
        ELLIPSE: 1,
        IMAGE_STENCIL: 2,
    });

    const SEGEMENTS_MIN = 3;

    cc.Mask = module.exports = Mask;

let Mask = cc.Class({
    name: "sprite"//设置类名为 "sprite"，类名用于序列化，一般可以省略。
    // 基类，可以是任意创建好的 cc.Class
    // 值类型：Function
    extends: cc.Component,
    // 静态成员定义
    // 值类型：Object
    statics: {
        _count: 0,
        getCount: function () {}
    },
    // 构造函数
    // 值类型：Function
    ctor: function () {},
    // 提供给 Component 的子类专用的参数字段
    // 值类型：Object
    editor: {
        disallowMultiple: true
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
    },
    //你可以在onLoad里面访问场景的节点和数据，这个时候场景的节点和数据都已经准备好了
    //组件加载时运行
    onLoad: function () {
    },
    // 组件在第一次update调用之前调用
    start: function() {
    },
    // 每次游戏刷新的时候调用, dt距离闪一次刷新的时间
    //每0.5更新一次内容
    update: function (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < 0.5) return;
        this.updateTimer = 0;
    },
    //刷新完后调用(会在所有画面更新后执行);
    lateUpdate: function(dt) {
        console.log("lateUpdate",dt);
    },
    //this.enabled：是否每帧执行该组件的update方法，同时也用来控制渲染组件是否显示
    //当组件的 enabled 属性从 false 变为 true 时，
    //或者所在节点的 active 属性从 false 变为 true 时
    //倘若节点第一次被创建且 enabled 为 true，则会在 onLoad 之后，start 之前被调用。
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

组件操作
    this.addComponent(组件类型): 向节点上添加一个组件实例, 返回挂上的组件实例;

    this.getComponent(组件类型): 查找一个为指定类型的组件实例(如果有多个，第一个匹配);
    var label = this.getComponent(cc.Label);
    var rotate = this.getComponent("SinRotate");//传入一个类名。对用户定义的组件而言，类名就是脚本的文件名


    this.getComponents(组件类型): 查找这个节点上所有这个类型的组件实例;[inst1, inst2, inst3, ...]
    this.getComponentInChildren(组件类型): 在自己与子节点里面查找;可以不加组件类型
    this.getComponentsInChildren (组件类型): 在自己与子节点里面查找;
    this.destroy(): 从节点中删除这个组件的实例;

    var test = this.addComponent("test");//"test"是自定义cc.class
    test = this.node.addComponent("test"); //两个代码实现相同的功能

    node.addComponent(cc.Sprite)
    node.addComponent(dragonBones.ArmatureDisplay)
    import SpriteAnim from '../../../Engine/SpriteAnim';
    node.addComponent(SpriteAnim);




