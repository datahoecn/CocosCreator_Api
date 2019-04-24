
//为了防止联系点击
  this._isLoading = false
//添加到回调函数中
  if (this._isLoading) {
      return;
  }
  this._isLoading = true

cc.find("Canvas/player1/playerName")//找当前场景中的节点

：用cc.loader加载资源是不会重复加载的，loader中是缓存的，如果之前加载过了之后是不会再加载，而是直接从缓存中调用。可以用cc.loader.getRes(url)查看是否已经加载过了

Cannot read property 'style' of null
JS运行的时候你的页面还没有加载完成，所以你的JS代码找不到你的页面元素，就会抛出这个问题

使用addChild方法就会处发onload等方法
脚本里的onload与自定义方法谁先调用，根据addchild与调用自定义方法的先后决定
注意先调用自定义方法，赋值，在调用addChild

//按钮回调事件
this.mainNode = cc.director.getScene().getChildByName("Canvas");
btn_callback: function() {
    var sellLayer = cc.instantiate(this.sellLayer);//新建节点，克隆预节点
    this.mainNode.addChild(sellLayer);

    var comSellLayer = sellLayer.getComponent("sellLayer");//获取sellLayer脚本组建
    var data = {};
    data.node = this.node;//脚本所挂的节点
    data.index = this.tab_index;//用来判断是出售怪兽，还是怪兽碎片，0：怪兽 1：怪兽碎片
    comSellLayer.set_data(data);//调用sellLayer脚本里的set_data方法

    this.node.active = false;//本节点被禁用
    
},



Draw Call//表示引擎对当前画面的绘制次数

this.schedule(callback, target, interval, repeat, delay, paused);//target可以省略
this.unschedule(callback, target)//停止定时器

--并以它们的名称来命名,该文件主要用来存放对应文件的版本及其它相关信息
--cc.Class 是一个由 cc.Component 派生出来的组件类
--onLoad()即组件挂接的对象在初始化完成后的回调函数
--update(dt)，即每一帧更新时的回调函数。
--通过properties关键字，定义了一系列属性
--Camera属性
  --ZoomRatio：视图缩放
  --BackgroundColor：颜色缓冲区清空时显示的底色，将 background 删除后，将显示 BackgroundColor 所设置的颜色。
  --Depth：摄像机的深度缓冲值。
  --cullingMask：删除 Mask 值设置，如果您希望某些 Node 属性不显示，可以使用它。
  --clearFlags：是否清空颜色缓冲、深度缓冲、模版缓冲区