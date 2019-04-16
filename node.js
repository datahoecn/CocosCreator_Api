this.rotationToNode.rotationX = 0;
this.rotationToNode.rotationY = 0;
this.image.opacity = 255;

node.setPosition(cc.v2(0, 0));
node.getLocation();
node.setScale(0.7);
node.addChild(node);
node.removeFromParent();
node = null;

var pos = currentScene.convertToNodeSpaceAR(e.getLocation());
var node = new cc.Node("New " + type);

//克隆节点
let item = cc.instantiate(this.node);

node.parent = this.root
node.position = cc.p(100,100);//cc.v2(300, 200)
node.position.x;//cc.v2(300, 200)


cc.randomMinus1To1()//returns a random float between -1 and 1