
SpriteFrame 类型
一个 SpriteFrame 包含：
    纹理：会被渲染组件使用的 Texture2D 对象。
    矩形：在纹理中的矩形区域。

properties


method
    setState        0 是正常，1 是灰色
    textureLoaded   返回是否已加载纹理 return this._texture && this._texture.loaded;
    isRotated       获取 SpriteFrame 是否旋转
    getRect         Rect    获取 SpriteFrame 的纹理矩形区域
    setRect         cc.rect(1,1,20,20)  设置 SpriteFrame 的纹理矩形区域
    getOriginalSize Size    获取修剪前的原始大小 
    setOriginalSize         设置修剪前的原始大小
    getTexture      获取使用的纹理实例
    getOffset       获取偏移量
    setOffset       设置偏移量
    clone           克隆 SpriteFrame
    setTexture      通过 Texture，rect，rotated，offset 和 originalSize 设置 SpriteFrame。
    clearTexture    当你暂时不再使用这个 SpriteFrame 时，可以调用这个方法来保证引用的贴图对象能被 GC。
   
   
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



plist图集使用方法
    stars:cc.SpriteAtlas
    //this.stars._spriteFrames 为图集对象
    //对象名称：xq009 即图片名称
    sp.spriteFrame = this.stars._spriteFrames.xq009;