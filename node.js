properties
	node.zIndex				Number 控制节点排列顺序
	node.groupIndex 		Integer 节点的分组索引。
	node.group 				String 节点的分组。
	node.position 			cc.v2(300, 200)		Vec2 
	node.rotation 			Number 该节点旋转角度。
	node.rotationX 			Number 该节点 X 轴旋转角度。
	node.scale 				Number 节点相对父节点的缩放。
	node.scaleX 			Number 节点 X 轴缩放。
	node.skewX 				Number 该节点 X 轴倾斜角度。
	node.opacity 			Number 节点透明度，默认值为 255。
	node.color 				new cc.Color(255, 255, 255, 255);	Color 节点颜色。
							cc.Color.RED WHITE BLACK TRANSPARENT(透明) GRAY(灰色) GREEN(绿色) BLUE(蓝色) YELLOW(黄色) ORANGE(橙色) CYAN(青色) MAGENTA(品红色)
	node.anchorX 			Number 节点 X 轴锚点位置。
	node.width 				Number 节点宽度。
	node.height 			Number 节点高度。
	node.cascadeOpacity 	Boolean 节点的不透明度值是否影响其子节点，默认值为 true。
	node.isValid 			Boolean 表示该对象是否可用（被 destroy 后将不可用）。
	node.name 				String 该节点名称。
	node.uuid 				String 主要用于编辑器的 uuid，在编辑器下可用于持久化存储，在项目构建之后将变成自增的 id。
	node.children 			Node[] 节点的所有子节点。
	node.childrenCount 		Number 节点的子节点数量。
	node.active 			Boolean 当前节点的自身激活状态。
	node.activeInHierarchy 	Boolean 表示此节点是否在场景中激活。
	node.parent 			Node 该节点的父节点。

	node._components 		Component[]
	node._prefab 			PrefabInfo The PrefabInfo object
	node._persistNode 		Boolean 如果为真，则该节点是一个持久化节点，不会在场景转换期间被销毁。如果为false，节点将在加载新场景时自动销毁。默认是假的。
	node.__eventTargets 	EventTarget[] Register all related EventTargets,...

method
	on 					this.node.on(cc.Node.EventType.TOUCH_START, this.memberFunction, this);
	once 				注册节点的特定事件类型回调，回调会在第一时间被触发后删除自身。
	off 				this.node.off(cc.Node.EventType.TOUCH_START, this.memberFunction, this);
	targetOff 			node.targetOff(target); 移除目标上的所有注册事件。
	hasEventListener 	返回值: Boolean 参数: String 检查事件目标对象是否有为特定类型的事件注册的回调。
	emit 				eventTarget.emit('fire', event); 通过事件名发送自定义事件
	dispatchEvent 		分发事件到事件流中。
	pauseSystemEvents 	node.pauseSystemEvents(true); 暂停当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
	resumeSystemEvents 	node.resumeSystemEvents(true); 恢复当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
	runAction 			执行并返回该执行的动作。
	pauseAllActions 	node.pauseAllActions(); 暂停本节点上所有正在运行的动作。
	resumeAllActions 	node.resumeAllActions(); 恢复运行本节点上所有暂停的动作。
	stopAllActions 		node.stopAllActions(); 停止并且移除所有正在运行的动作列表。
	stopAction 			var action = cc.scaleTo(0.2, 1, 0.6); node.stopAction(action);停止并移除指定的动作。
	stopActionByTag 	node.stopAction(1); 停止并且移除指定标签的动作。
	getActionByTag 		var action = node.getActionByTag(1); 通过标签获取指定动作。
	getContentSize 		node.getContentSize() 获取节点自身大小，不受该节点是否被缩放或者旋转的影响。
	setContentSize 		node.setContentSize(cc.size(100, 100)); 设置节点原始大小，不受该节点是否被缩放或者旋转的影响。
	convertToNodeSpace 	var newVec2 = node.convertToNodeSpace(cc.v2(100, 100)); 将一个点转换到节点 (局部) 坐标系，并加上锚点的坐标。
	convertToWorldSpace var newVec2 = node.convertToWorldSpace(cc.v2(100, 100)); 将一个相对于节点左下角的坐标位置转换到世界空间坐标系。
	convertToNodeSpaceAR var newVec2 = node.convertToNodeSpaceAR(cc.v2(100, 100)); 将一个点转换到节点 (局部) 空间坐标系，这个坐标系以锚点为原点。
	convertToWorldSpaceAR var newVec2 = node.convertToWorldSpaceAR(cc.v2(100, 100)); 将节点坐标系下的一个点转换到世界空间坐标系。
	convertTouchToNodeSpace var newVec2 = node.convertTouchToNodeSpace(touch); 将触摸点转换成本地坐标系中位置。
	convertTouchToNodeSpaceAR var newVec2 = node.convertTouchToNodeSpaceAR(touch); 转换一个 cc.Touch（世界坐标）到一个局部坐标，该方法基于节点坐标。
	getBoundingBox 		var boundingBox = node.getBoundingBox(); 返回父节坐标系下的轴向对齐的包围盒。
	getBoundingBoxToWorld var newRect = node.getBoundingBoxToWorld(); 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。
	addChild 			node.addChild(newNode, 1, "node"); 添加子节点，并且可以修改该节点的 局部 Z 顺序和名字。
	cleanup 			node.cleanup(); 停止所有正在播放的动作和计时器。
	attr 				var attrs = { key: 0, num: 100 }; node.attr(attrs);属性配置函数。在 attrs 的所有属性将被设置为节点属性
	getChildByUuid 		var child = node.getChildByUuid(uuid); 通过 uuid 获取节点的子节点。
	getChildByName 		var child = node.getChildByName("Test Node"); 通过名称获取节点的子节点。
	insertChild 		node.insertChild(child, 2); 插入子节点到指定位置
	walk 				遍历该节点的子树里的所有节点并按规则执行回调函数。
						node.walk(function (target) {//在访问它的子节点之前调用 target当前访问节点
						    console.log('Walked through node ' + target.name + ' for the first time');
						}, function (target) {//在访问所有子节点之后调用
						    console.log('Walked through node ' + target.name + ' after walked all children in its sub tree');
						});
						默认为 true 表示清理
	removeFromParent 	node.removeFromParent(false);通常需要传入一个 false，否则默认会清空节点上绑定的事件和 action 等。
	removeChild 		node.removeChild(newNode, false); 移除节点中指定的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。
	removeAllChildren 	node.removeAllChildren(false); 移除节点所有的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。
	isChildOf 			node.isChildOf(newNode);参数: parent 是否是指定节点的子节点？
	getComponent 		var sprite = node.getComponent(cc.Sprite); 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。
	getComponents 		var tests = node.getComponents("Test"); 返回节点上指定类型的所有组件。
	getComponentInChildren var sprite = node.getComponentInChildren(cc.Sprite); 递归查找所有子节点中第一个匹配指定类型的组件。
	getComponentsInChildren var sprites = node.getComponentsInChildren(cc.Sprite); 递归查找自身或所有子节点中指定类型的组件
	addComponent 		var sprite = node.addComponent(cc.Sprite); 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
	removeComponent 	node.removeComponent(cc.Sprite); 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
						component.destroy()	如果你已经获得组件引用
	destroyAllChildren 	node.destroyAllChildren(); 销毁所有子节点，并释放所有它们对其它对象的引用。
	destroy 			obj.destroy(); 销毁该对象，并释放所有它对其它对象的引用。销毁节点并不会立刻被移除，而是在当前帧逻辑更新结束后，统一执行
						cc.isValid(obj) 来检查对象是否已被销毁。


常驻节点
	//在场景切换时不被自动销毁，常驻内存
	//由于回调函数只能写在本脚本中，所以场景加载回调通常用来配合常驻节点，在常驻节点上挂载的脚本中使用
	cc.game.addPersistRootNode(myNode);
	//将节点还原为可在场景切换时销毁的节点
	cc.game.removePersistRootNode(myNode);
创建新节点
	var node = new cc.Node('Sprite');

克隆已有节点 创建预制节点
	var ePlane = cc.instantiate(this.EnemyPlanePrefab);
	







