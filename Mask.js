
Mask 用于规定子节点可渲染的范围
带有 Mask 组件的节点会使用该节点的约束框（也就是 属性检查器 中 Node 组件的 Size 规定的范围）创建一个渲染遮罩，
该节点的所有子节点都会依据这个遮罩进行裁剪，遮罩范围外的将不会渲染。

一个节点只能有一个渲染组件，Mask是渲染组件，与sprite，label冲突

properties：{
	//mask.type = cc.Mask.Type.RECT;
	type: RECT//使用矩形作为遮罩
		  ELLIPSE//使用椭圆作为遮罩
		  IMAGE_STENCIL//使用图像模版作为遮罩
	inverted:boolean//反向遮罩（不支持 Canvas 模式）
}