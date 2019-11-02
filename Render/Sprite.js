
SpriteFrame 类型
一个 SpriteFrame 包含：
    纹理：会被渲染组件使用的 Texture2D 对象。
    矩形：在纹理中的矩形区域。
var self = this;
var url = "test assets/PurpleMonster";
cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
     var node = new cc.Node("New Sprite");
     var sprite = node.addComponent(cc.Sprite);
     sprite.spriteFrame = spriteFrame;
     node.parent = self.node
});
properties
    loaded      Boolean 该资源是否已经成功加载
    name        String 该对象的名称。
    isValid     Boolean 表示该对象是否可用（被 destroy 后将不可用）。

method
    constructor     SpriteFrame 类的构造函数。手动创建
    textureLoaded   返回是否已加载纹理 return this._texture && this._texture.loaded;
    isRotated       获取 SpriteFrame 是否旋转
    getRect         Rect    获取 SpriteFrame 的纹理矩形区域
    setRect         cc.rect(1,1,20,20)  设置 SpriteFrame 的纹理矩形区域
    getOriginalSize Size    获取修剪前的原始大小 
    setOriginalSize         设置修剪前的原始大小
    getTexture 获取使用的纹理实例
    getOffset 获取偏移量
    setOffset 设置偏移量
    clone 克隆 SpriteFrame
    setTexture 通过 Texture，rect，rotated，offset 和 originalSize 设置 SpriteFrame。
    clearTexture 当你暂时不再使用这个 SpriteFrame 时，可以调用这个方法来保证引用的贴图对象能被 GC。
    hasEventListener 检查事件目标对象是否有为特定类型的事件注册的回调。
    on 注册事件目标的特定事件类型回调。
    off 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
    targetOff 在当前 EventTarget 上删除指定目标（target 参数）注册的所有事件监听器。 参数target是on的第三个参数on("click",function(){},this),this
    once 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
    emit 通过事件名发送自定义事件
    dispatchEvent 通过事件对象派发事件
    createNode 使用该资源在场景中创建一个新节点。
    destroy 销毁该对象，并释放所有它对其它对象的引用。




onLoad: function () {
    var spriteFrame = this.spriteFrame;
    var texture = this.texture;
    //通过 Texture rect rotated offset 和 originalSize 设置 SpriteFrame
    spriteFrame.setTexture(texture);
}


setImgTexture : function(str, node){
    cc.loader.loadRes(str, cc.SpriteFrame, function (err, spriteFrame) {
        if (err) {
            cc.error(err.message || err);
            return;
        }
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    }.bind(this));
},

    Atlas：设置精灵的图集纹理（导入plist文件），
    表示精灵使用该图集中的某一张图片，作为自己的纹理，可以不设置

    Type：用来设置精灵的渲染方式
    普通拉伸（ SIMPLE）
    九宫格渲染（SLICED）--在 Size 中修改其宽度和高度
    平铺渲染（TILED）在 Size 中修改其宽度和高度，这时该精灵会不断复制自己，铺满整个区间

    填充渲染（ FILLED ）--常用于各类进度条的绘制，使用该模式，可以按百分比显示精灵的部分图像
        Fill Type 用来调整填充方式，RADIAL（圆形的填充），VERTICAL，HORIZONTAL
        Fill Start，表示 起始位置，以百分比形式表示(-1~1)
        Fill Range 表示显示从 起始位置 到 Range

        Fill Center 定义了圆心的位置，一般设置 x 为 0.5，y 为 0.5

    Size Mode：用来设置图片的显示方式（针对的是图片尺寸）
        Custom 表示会使用自定义尺寸。当用户手动修改过 Size 属性后，Size Mode 会被自动设置为 Custom，除非再次指定为前两种尺寸。
        Trimmed 表示会使用原始图片资源裁剪透明像素后的尺寸
        Raw 表示会使用原始图片未经裁剪的尺寸

    Trim：为节点约束框，设置是否使用透明边缘裁剪后的图片大小
    
    将精灵 Sprite 属性 Size Mode 设置为 Trimmed 并勾选 Trim，即可自动裁剪精灵的透明边缘。

    //新建一个精灵节点
        var role = new cc.Sprite('role.png');
        scene.addChild(role);
        role.setPosition(100, 100);

        var headSprite = item.getChildByName("mask").getChildByName("headSprite").getComponent(cc.Sprite);
        var address = "image/" + path;

        cc.loader.loadRes(address, cc.SpriteFrame, function(err, spriteFrame) {
            headSprite.spriteFrame = spriteFrame;
        });


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