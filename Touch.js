
//判断触屏偏移的绝对值最小阙值
var minMoveValue = 50;
//设置触屏点击时的响应函数，记录是否触屏，以及触屏位置点
this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
    this._touching = true;
    this._touchStartPos = event.touch.getLocation();
});
//设置触屏离开时的响应函数，记录是否触屏，以及触屏位置点
this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
    if (!this._touching) return;
    //重置触屏标记
    this._touching = false;
    //取得当前触屏松开时位置点，然后与触屏点击时的位置点相减，计算偏移的横向和纵向移动距离
    var touchPos = event.touch.getLocation();
    var movedX = touchPos.x - this._touchStartPos.x;
    var movedY = touchPos.y - this._touchStartPos.y;
    var movedXValue = Math.abs(movedX);
    var movedYValue = Math.abs(movedY);
    if (movedXValue < minMoveValue && movedYValue < minMoveValue) {
        return;
    }
    //计算当前主角所在格子位置
    var newTile = cc.v2(this._curTile.x, this._curTile.y);
    var mapMoveDir = MoveDirection.NONE;
    //如果横向移动距离大于纵向移动距离，根据上面相减结果的正负值判断移动方向
    if (movedXValue >= movedYValue) {
        // move to right or left
        if (movedX > 0) {
            newTile.x += 1;
            mapMoveDir = MoveDirection.LEFT;
        } else {
            newTile.x -= 1;
            mapMoveDir = MoveDirection.RIGHT;
        }
    } else {
        // move to up or down
        if (movedY > 0) {
            newTile.y -= 1;
            mapMoveDir = MoveDirection.DOWN;
        } else {
            newTile.y += 1;
            mapMoveDir = MoveDirection.UP;
        }
    }
    this._tryMoveToNewTile(newTile, mapMoveDir);
});



// 按键监听
onLoad () {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
},
onDestroy () {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this._onKeyPressed, this);
},
//按键监听函数
_onKeyPressed: function(event) {
    switch(event.keyCode) {
        case cc.macro.KEY.up:
            //上键，
            break;
        case cc.macro.KEY.down:
            //下键
            break;
        case cc.macro.KEY.left:
            break;
        case cc.macro.KEY.right:
            break;
        default:
            return;
    }
},



this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
    // this._targetNode接受点击的节点
    //目标节点不存在，拦截
    if (!this._targetNode) {
        this.node._touchListener.setSwallowTouches(true);
        return;
    }

    //目标区域存在，击中放行
    let rect = this._targetNode.getBoundingBoxToWorld();
    if (rect.contains(event.getLocation())) {
        this.node._touchListener.setSwallowTouches(false);
        cc.log('未命中目标节点，放行')
    } else {
        this.node._touchListener.setSwallowTouches(true);
        cc.log('未命中目标节点，拦截');
    }
}, this);


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

触摸事件
  touch cc.Touch  与当前事件关联的触点对象
  getID Number  获取触点的 ID，用于多点触摸的逻辑判断
  getLocation Object  获取触点位置对象，对象包含 x 和 y 属性
  getLocationX  Number  获取触点的 X 轴位置
  getLocationY  Number  获取触点的 Y 轴位置
  getPreviousLocation Object  获取触点上一次触发事件时的位置对象，对象包含 x 和 y 属性
  getStartLocation  Object  获取触点初始时的位置对象，对象包含 x 和 y 属性
  getDelta  Object  获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性


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

node.emit(type, detail)：通知所有监听 type 事件的监听器，可以发送一个附加参数。
node.dispatchEvent(event)：发送一个事件给它的监听器，支持冒泡。
node.on(type, callback, target)：持续监听 node 的 type 事件。
node.once(type, callback, target)：监听一次 node 的 type 事件。
node.off(type, callback, target)：取消监听所有 type 事件或取消 type 的某个监听器（用 callback 和 target 指定）。
cc.Node.EventType.TOUCH_START       'touchstart'
cc.Node.EventType.TOUCH_MOVE        'touchmove'
cc.Node.EventType.TOUCH_END         'touchend'
cc.Node.EventType.TOUCH_CANCEL      'touchcancel'

'mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseleave', 'mousewheel'

cc.Node.EventType.SIZE_CHANGED      size-changed  当宽高属性修改时
cc.Node.EventType.ANCHOR_CHANGED    anchor-changed  当锚点属性修改时
position-changed  当位置属性修改时
rotation-changed  当旋转属性修改时
scale-changed 当缩放属性修改时






