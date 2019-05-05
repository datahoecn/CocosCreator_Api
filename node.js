

node.rotationX = 0;
node.rotationY = 0;
node.opacity = 255;
node.active = true
node.parent = this.root
node.position = cc.p(100,100);//cc.v2(300, 200)
node.position.x

node.setPosition(cc.v2(0, 0));
node.getLocation();
node.setScale(0.7);
node.addChild(node);
node.getChildByName("Label");
node.removeAllChildren(true);
node.removeFromParent();
node = null;

cc.instantiate(this.node);//克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点
cc.randomMinus1To1()//returns a random float between -1 and 1



