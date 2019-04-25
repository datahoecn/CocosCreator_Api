定时器

可以利用 setInterval 和 schedule 两种方法实现定时逻辑
setInterlval 比 schedule 的定时器精度更精确，但方法 schedule 更灵活。

setTimeout()同理也是一种定时器，
对应的结束定时的方法是clearTimeout()。
与setInterval()不同的是，此定时器只执行一次

var t = setTimeout(function(){
    console.log("OK");
},1000);//一秒后在控制台输出字符串"OK"

setInterval
//第一个参数是定时器回调函数，第二个参数是定时器的时间间隔，单位为毫秒。

cc.Class({
    extends: cc.Component,

    properties: {
        nodeList: {
            default: [],
            type: [cc.Node]
        }
    },

    // 脚本组件加载完成后，调用 setInterval 创建定时器，每秒调用一次 toggleNodesVisibility 来显示或隐藏数组中的所有节点
    onLoad: function () {
        var self = this;
        this.inervalId = setInterval(function () {
            self.toggleNodesVisibility();
        }, 1000);
    },
    // 当脚本被销毁时，要记得释放定时器
    //除非调用clearInterval()方法，否则无限循环执行回调函数
    onDestroy: function () {
        clearInterval(this.inervalId);
    },

    toggleNodesVisibility: function() {
        console.log('toggle visibility');
        for (var i = 0; i < this.nodeList.length; ++i) {
            this.nodeList[i].active = !this.nodeList[i].active;
        }
    }
});


schedule 
//schedule(callback, interval, repeat, delay)
//第一个参数 callback 是定时器回调函数，
//第二个参数 interval 是定时器的时间间隔，单位为秒，
//第三个参数 repeat 是重复次数
//最后一个参数 delay 为延时秒数

//scheduleOnce(callback,delay)调用一次

cc.Class({
    extends: cc.Component,

    properties: {
        label: require('../../../i18n/LabelLocalized')
    },

    //点击按钮时调用定时器回调函数
    run () {
        this.schedule(this.task1, 1, 0, 1);
    },

    //第一个回调函数
    task1: function () {
        this.unschedule(this.task1);//取消时参数是回调函数
        this.label.textKey = 'cases/05_scripting/04_scheduler/recursiveScheduler.fire.1';
        this.schedule(this.task2, 1, 0, 1);
    },

    //第二个回调函数
    task2: function () {
        this.label.textKey = 'cases/05_scripting/04_scheduler/recursiveScheduler.fire.2';
    }
});

createEnemyPlane: function () {
  //实例化预制体
  var ePlane = cc.instantiate(this.EnemyPlanePrefab);
  var EPlane = require("EnemyPlane");
  //获取其挂载的脚本组件
  var EPComp = ePlane.getComponent(EPlane);
  //对实例化预制体进行设置
  ePlane.parent = this.node;
  ePlane.setPosition(cc.v2(x, y));
  //进行初始化
  EPComp.initInfo(x,y,....);
}



数据存储
cc.sys.localStorage.getItem("BestScore");   
cc.sys.localStorage.setItem("BestScore",this.totalscore);

