监听者通知分发者这里有代码对此事件感兴趣
出事后由发射者通知分发者
分发者根据当前的监听情况，把事件通知所有针对此事件的监听者
通知分发者这段代码对此事件不再感兴趣了

this.node.on(type, callback, [target], [useCapture  = false]);
type        string    监听事件类型
callback    function  事件发生后的回调函数
target      object    调用回调的目标
useCapture  boolean   捕获模式开关
返回值是注册成功的回调函数，利用此返回值关闭事件监听

callback有一个传入参数，cc.Event 类型的事件对象 event
type                      String    事件的类型（事件名）
bubbles                   boolean   表示该事件是否进行冒泡
target                    cc.Node   接收到事件的原始对象
currentTarget             cc.Node   接收到事件的当前对象，事件在冒泡阶段当前对象可能与原始对象不同
getType                   Funciton  获取事件的类型
stopPropagation           Function  停止冒泡阶段，事件将不会继续向父节点传递，当前节点的剩余监听器仍然会接收到事件
stopPropagationImmediate  Function  立即停止事件的传递，事件将不会传给父节点以及当前节点的剩余监听器
getCurrentTarget          Function  获取当前接收到事件的目标节点
detail                    Function  自定义事件的信息（属于 cc.Event.EventCustom）
setUserData               Function  设置自定义事件的信息（属于 cc.Event.EventCustom）
getUserData               Function  获取自定义事件的信息（属于 cc.Event.EventCustom）






const BlockEvents = ['touchstart', 'touchmove', 'touchend',
                     'mousedown', 'mousemove', 'mouseup',
                     'mouseenter', 'mouseleave', 'mousewheel'];
this.node.on("touchstart", (e) => {
            var pos = currentScene.convertToNodeSpaceAR(e.getLocation());
        });
触摸事件
  touch cc.Touch  与当前事件关联的触点对象
  getID Number  获取触点的 ID，用于多点触摸的逻辑判断
  getLocation Object  获取触点位置对象，对象包含 x 和 y 属性
  getLocationX  Number  获取触点的 X 轴位置
  getLocationY  Number  获取触点的 Y 轴位置
  getPreviousLocation Object  获取触点上一次触发事件时的位置对象，对象包含 x 和 y 属性
  getStartLocation  Object  获取触点初始时的位置对象，对象包含 x 和 y 属性
  getDelta  Object  获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性

cc.Node 的其它事件
position-changed  当位置属性修改时
rotation-changed  当旋转属性修改时
scale-changed 当缩放属性修改时
size-changed  当宽高属性修改时
anchor-changed  当锚点属性修改时




监听事件
  this.node.on('foobar', this._sayHello, this);
关闭监听
  this.node.off('foobar', this._sayHello, this);

发射事件
//dispatchEvent可以做事件传递
this.node.emit('say-hello', {
  msg: 'Hello, this is Cocos Creator',
});

this.node.on('say-hello', function (msg) {
  console.log(msg);
});

//在事件监听回调中，开发者会接收到一个 cc.Event 类型的事件对象 event
// 节点 c 的组件脚本中
this.node.dispatchEvent( new cc.Event.EventCustom('foobar', true) );
// 节点 b 的组件脚本中
this.node.on('foobar', function (event) {
  //中断处理
  event.stopPropagation();
});





