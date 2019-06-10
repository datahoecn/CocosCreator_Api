 var node = new cc.Node("New Label");
 var label = node.addComponent(cc.Label);
 var outline = node.addComponent(cc.LabelOutline);
 node.parent = this.node;

 outline.color = new cc.Color(0.5, 0.3, 0.7, 1.0);;
 outline.width = 3;
 outline.enabled = true;

properties
 	color 				Color 改变描边的颜色
	width 				Number 改变描边的宽度
	enabled 			Boolean 表示该组件自身是否启用。
	enabledInHierarchy 	Boolean 表示该组件是否被启用并且所在的节点也处于激活状态。
	_isOnLoadCalled 	Number 返回一个值用来判断 onLoad 是否被调用过，不等于 0 时调用过，等于 0 时未调用。

