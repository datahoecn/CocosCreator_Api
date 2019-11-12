properties
	type 			Mask.Type 	遮罩类型
	spriteFrame 	SpriteFrame 遮罩所需要的贴图
	alphaThreshold 	Number 		只有当模板的像素的 alpha 大于 alphaThreshold 时，才会绘制内容。
	inverted 		Boolean 	反向遮罩（不支持 Canvas 模式）
	segements 		Number 		TODO: remove segments, not supported by graphics


this._mask = this.node.getComponent(cc.Mask);
this._mask.inverted = true;

var node = 想要露出的节点;
// 使mask节点范围图片换个样，变成 !inverted
this._mask._graphics.clear();
// 获取世界坐标，左下为原点，x,y是节点左下点的位置
let rect = node.getBoundingBoxToWorld();
let p = this.node.convertToNodeSpaceAR(rect.origin);   
rect.x = p.x;
rect.y = p.y;
// 修改mask范围，重新绘图
this._mask._graphics.fillRect(rect.x, rect.y, rect.width, rect.height);