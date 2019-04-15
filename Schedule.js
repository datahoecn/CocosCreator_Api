定时器

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
        this.unschedule(this.task1);
        this.label.textKey = 'cases/05_scripting/04_scheduler/recursiveScheduler.fire.1';
        this.schedule(this.task2, 1, 0, 1);
    },

    //第二个回调函数
    task2: function () {
        this.label.textKey = 'cases/05_scripting/04_scheduler/recursiveScheduler.fire.2';
    }
});

数据存储
cc.sys.localStorage.getItem("BestScore");   
cc.sys.localStorage.setItem("BestScore",this.totalscore);