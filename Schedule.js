cc.Node 不包含计时器相关 API
组件的计时器调用回调时，会将回调的 this 指定为组件本身，因此回调中可以直接使用 this

开始一个计时器
    this.schedule(callback, target, interval, repeat, delay, paused);//target可以省略
    component.schedule(function() {
         // 这里的 this 指向 component
         this.doSomething();
     }, interval, repeat, delay);

开始一个只执行一次的计时器
    component.scheduleOnce(function() {
         this.doSomething();
     }, 2);

取消一个计时器
    this.unschedule(callback, target)//停止定时器
    this.callback = function () {
        this.unschedule(this.callback);
    }
    component.schedule(this.callback, 1);

取消这个组件的所有计时器
    unscheduleAllCallbacks()

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