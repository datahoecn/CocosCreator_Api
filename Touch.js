const BlockEvents = ['touchstart', 'touchmove', 'touchend',
                     'mousedown', 'mousemove', 'mouseup',
                     'mouseenter', 'mouseleave', 'mousewheel'];
this.node.on("touchstart", (e) => {
            var pos = currentScene.convertToNodeSpaceAR(e.getLocation());
        });

//在节点上注册指定类型的回调函数，也可以设置 target 用于绑定响应函数的 this 对象。
this.node.on(cc.Node.EventType.TOUCH_START, this.memberFunction, this); 
node.on(cc.Node.EventType.TOUCH_START, callback, this);
node.on(cc.Node.EventType.TOUCH_MOVE, callback, this);
node.on(cc.Node.EventType.TOUCH_END, callback, this);
node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this);
node.on(cc.Node.EventType.ANCHOR_CHANGED, callback);
node.on(cc.Node.EventType.COLOR_CHANGED, callback);

监听事件
//事件处理是在节点（cc.Node）中完成的。对于组件，可以通过访问节点 this.node 来注册和监听事件
//监听事件可以 通过this.node.on() 函数来注册
this.node.on('mousedown', function ( event ) {
      console.log('Hello!');
    });
//使用第三个参数
this.node.on('mousedown', function (event) {
  this.enabled = false;
}, this);//传第三个参数 target
//使用函数绑定
this.node.on('mousedown', function ( event ) {
  this.enabled = false;
}.bind(this));
效果上是相同的

var CallBack = this.CallBack.bind(this);

关闭监听
//off 方法的 参数必须和 on 方法的参数一一对应，才能完成关闭。
this.node.off('foobar', this._sayHello, this)

发射事件
//两种方式发射事件：emit 和 dispatchEvent。两者的区别在于，后者可以做事件传递
this.node.emit('say-hello', {
      msg: 'Hello, this is Cocos Creator',
    });

this.node.on('say-hello', function (event) {
      console.log(event.detail.msg);
    });


//冒泡派送会将事件从事件发起节点，不断地向上传递给他的父级节点，
//直到到达根节点或者在某个节点的响应函数中做了中断处理 event.stopPropagation()
// 节点 c 的组件脚本中
this.node.dispatchEvent( new cc.Event.EventCustom('foobar', true) );
// 节点 b 的组件脚本中
this.node.on('foobar', function (event) {
  event.stopPropagation();//截获事件后就不再将事件传递
});

//在事件监听回调中，开发者会接收到一个 cc.Event 类型的事件对象 event
//this.callback.bind(this)
//event.target.name
type						String	事件的类型（事件名）
target						cc.Node	接收到事件的原始对象
currentTarget				cc.Node	接收到事件的当前对象，事件在冒泡阶段当前对象可能与原始对象不同
getType						Funciton	获取事件的类型
stopPropagation				Function	停止冒泡阶段，事件将不会继续向父节点传递，当前节点的剩余监听器仍然会接收到事件
stopPropagationImmediate	Function	立即停止事件的传递，事件将不会传给父节点以及当前节点的剩余监听器
getCurrentTarget			Function	获取当前接收到事件的目标节点
detail						Function	自定义事件的信息（属于 cc.Event.EventCustom）
setUserData					Function	设置自定义事件的信息（属于 cc.Event.EventCustom）
getUserData					Function	获取自定义事件的信息（属于 cc.Event.EventCustom）