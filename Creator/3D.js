 rotation 的类型会从 Number 改为 cc.Quat，
 如果要像之前那样在 2D 空间方便旋转节点，那么可以使用 angle 属性。
 相应的 setRotation 和 getRotation 也会改为使用 cc.Quat。

在代码中切换 3D 节点
 node.is3DNode = true;