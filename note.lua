--每一个场景都有一个默认顶层节点，命名为画布 Canvas
--assets目录，存放游戏所用的各类资源文件
--Cocos Creator会自动为每一个资源文件或目录生成 meta 文件，且放在同级目录下，
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

  a < b && c
  a -= b * c
  a = b <= c