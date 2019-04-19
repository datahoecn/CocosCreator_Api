plist图集使用方法
properties: {
    //使用的图集
    stars:{
        default: null,
        type: cc.SpriteAtlas
    },
},
onLoad: function () {
    var node = new cc.Node('Ten');
    node.width = 240;
    node.height = 240;
    var sp = node.addComponent(cc.Sprite);
    //this.stars._spriteFrames 为图集对象
    //对象名称：xq009 即图片名称
    sp.spriteFrame = this.stars._spriteFrames.xq009;
}



//精灵是游戏引擎中最常用的图像元件，它本质上是一张纹理图片
//只是通过封装，具备了大量常用的图片操作属性，比如更换纹理、设置位置、旋转、缩放、颜色等等

properties: {
    spriteList: {
        default: [],
        type: [cc.SpriteFrame]
    }
},
//设置当前精灵的贴图为数组中的随机元素
sprite.spriteFrame = this.spriteList[randomIdx];

Atlas：设置精灵的图集纹理（导入plist文件），
表示精灵使用该图集中的某一张图片，作为自己的纹理，可以不设置

Type：用来设置精灵的渲染方式
普通拉伸（ SIMPLE）
九宫格渲染（SLICED）--在 Size 中修改其宽度和高度
平铺渲染（TILED）在 Size 中修改其宽度和高度，这时该精灵会不断复制自己，铺满整个区间

填充渲染（FILLED）--常用于各类进度条的绘制，使用该模式，可以按百分比显示精灵的部分图像
	Fill Type 用来调整填充方式，RADIAL（圆形的填充），VERTICAL，HORIZONTAL
	Fill Start，表示图像横向或纵向起始填充区域，以百分比形式表示
	Fill Range 表示图像最终填充区域，同样以百分比形式表示，不同的是 -1 代表全显示，0 代表不填充，即该图像不显示

	Fill Center 定义了圆心的位置，一般设置 x 为 0.5，y 为 0.5
	Fill Start 代表起始度数，以百分比形式表示。
	Fill Range 代表最终填充总量，比如设置为 0.5，表示只绘制半圆。

Size Mode：用来设置图片的显示方式（针对的是图片尺寸）
可以选择使用原图尺寸，还可以选择裁剪透明边缘后的图片大小。

TRIMMED，表示裁剪透明边缘。
Trim：为节点约束框，设置是否使用透明边缘裁剪后的图片大小。。
将精灵 Sprite 属性 Size Mode 设置为 TRIMMED，并勾选 Trim，即可自动裁剪精灵的透明边缘。

Blend：颜色混合方式
主要用于设置当前图像的像素点颜色值与背景像素点颜色值的混合运算方案（比如透明度混合，有加，乘，减等多种运算），
可产生多种效果。透明度混合方式最为常用，即 Src Blend Factor 设置为 SRC_ALPHA，表示使用源颜色的 ALPHA 值作为因子。
Dst Blend Factor 设置为 ONE_MINUS_SRC_ALPHA，表示使用 1.0 减去源颜色的 ALPHA 值作为因子。渲染时，
最终的像素 ALPHA 值 = 图形 ALPHA 值 * 图形 RGB 值 + （1 - 图形 ALPHA 值）* 背景色 RGB 值。
该设置可以实现多个带 ALPHA 渐变的图案叠加时产生正确的透明渐变效果。
此外，还有一些其它的设置因子，可以参看 OPENGL glBlendFunc() 设置说明。