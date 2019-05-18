常驻节点
	//在场景切换时不被自动销毁，常驻内存
	//由于回调函数只能写在本脚本中，所以场景加载回调通常用来配合常驻节点，在常驻节点上挂载的脚本中使用
	cc.game.addPersistRootNode(myNode);
	//将节点还原为可在场景切换时销毁的节点
	cc.game.removePersistRootNode(myNode);
创建新节点
	var node = new cc.Node('Sprite');

克隆已有节点 创建预制节点
	var node = cc.instantiate(this.target);
销毁节点
	//销毁节点并不会立刻被移除，而是在当前帧逻辑更新结束后，统一执行
	start: function () {
	    // 5 秒后销毁目标节点
	    setTimeout(function () {
	      this.target.destroy();
	    }.bind(this), 5000);
	},
	//判断当前节点是否已经被销毁
	cc.isValid(this.target)

this.enabled = false;//不用时，禁用组件，防止再调用

var v = cc.v2(10, 10);//向量减法，并返回新结果。
v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};

var v = cc.v2(10, 10);//返回该向量的长度。
v.mag(); // return 14.142135623730951;

//更改节点尺寸
this.node.width = 100;
this.node.height = 100;

//更改节点锚点位置
this.node.anchorX = 1;
this.node.anchorY = 0;

//销毁节点
this.node.destroy();
node.rotationX = 0;
node.rotationY = 0;
node.opacity = 255;
node.active = true
//更改节点的父节点
node.parent = this.root
node.position = cc.p(100,100);//cc.v2(300, 200)
node.position.x
var cannons = this.node.children;//获得所有的子物体
this.node.childrenCount 将返回节点的子节点数量。

node.setPosition(cc.v2(0, 0));
node.getLocation();//获取当前触点位置
node.getPosition();//获取节点在父节点坐标系中的位置（x, y）
node.position//节点在父节点坐标系中的位置（x, y）
node.setScale(0.7);
node.addChild(node);
node.getChildByName("Label");
node.removeAllChildren(true);
//removeFromParent 通常需要传入一个 false，否则默认会清空节点上绑定的事件和 action 等
node.removeFromParent();
node = null;

node.emit(type, detail)：通知所有监听 type 事件的监听器，可以发送一个附加参数。
node.dispatchEvent(event)：发送一个事件给它的监听器，支持冒泡。
node.on(type, callback, target)：持续监听 node 的 type 事件。
node.once(type, callback, target)：监听一次 node 的 type 事件。
node.off(type, callback, target)：取消监听所有 type 事件或取消 type 的某个监听器（用 callback 和 target 指定）。
cc.Node.EventType.TOUCH_START		'touchstart'
cc.Node.EventType.TOUCH_MOVE		'touchmove'
cc.Node.EventType.TOUCH_END			'touchend'
cc.Node.EventType.TOUCH_CANCEL		'touchcancel'



