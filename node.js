this.enabled = false;//不用时，禁用组件，防止再调用

var v = cc.v2(10, 10);//向量减法，并返回新结果。
v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};

var v = cc.v2(10, 10);//返回该向量的长度。
v.mag(); // return 14.142135623730951;

this.node.destroy();
node.rotationX = 0;
node.rotationY = 0;
node.opacity = 255;
node.active = true
node.parent = this.root
node.position = cc.p(100,100);//cc.v2(300, 200)
node.position.x

node.setPosition(cc.v2(0, 0));
node.getLocation();//获取当前触点位置
node.getPosition();//获取节点在父节点坐标系中的位置（x, y）
node.position//节点在父节点坐标系中的位置（x, y）
node.setScale(0.7);
node.addChild(node);
node.getChildByName("Label");
node.removeAllChildren(true);
node.removeFromParent();
node = null;

cc.instantiate(this.node);//克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点，返回值为 Node 或者 Object
cc.randomMinus1To1()//returns a random float between -1 and 1

node.emit(type, detail)：通知所有监听 type 事件的监听器，可以发送一个附加参数。
node.dispatchEvent(event)：发送一个事件给它的监听器，支持冒泡。
node.on(type, callback, target)：持续监听 node 的 type 事件。
node.once(type, callback, target)：监听一次 node 的 type 事件。
node.off(type, callback, target)：取消监听所有 type 事件或取消 type 的某个监听器（用 callback 和 target 指定）。
cc.Node.EventType.TOUCH_START		'touchstart'
cc.Node.EventType.TOUCH_MOVE		'touchmove'
cc.Node.EventType.TOUCH_END			'touchend'
cc.Node.EventType.TOUCH_CANCEL		'touchcancel'



