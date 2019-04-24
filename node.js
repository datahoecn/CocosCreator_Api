this.rotationToNode.rotationX = 0;
this.rotationToNode.rotationY = 0;
this.image.opacity = 255;

node.active = true
node.parent //Node 该节点的父节点

node.setPosition(cc.v2(0, 0));
node.getLocation();
node.setScale(0.7);
node.addChild(node);
node.getChildByName("Label");
node.removeAllChildren(true);

node.removeFromParent();
node = null;

var pos = currentScene.convertToNodeSpaceAR(e.getLocation());
var node = new cc.Node("NewNOde");
component = node.addComponent(cc.Sprite);//添加组件
component.spriteFrame = res;


cc.instantiate(this.node);//克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。

node.parent = this.root
node.position = cc.p(100,100);//cc.v2(300, 200)
node.position.x;//cc.v2(300, 200)


cc.randomMinus1To1()//returns a random float between -1 and 1


var eventHandler = new cc.Component.EventHandler();
eventHandler.target = newTarget;//Node 目标节点
eventHandler.component = "MainMenu";//String 目标组件名
eventHandler.handler = "OnClick"//String 响应事件函数名

btn.clickEvents[0] = eventHandler;

eventHandler.emit(["param1", "param2", ....]);//String 自定义事件数据

var data = {
    c: 1111, 
};
eventHandler.customEventData = data;

