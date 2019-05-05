
settings 里保存项目相关的设置，如 构建发布 菜单里的包名、场景和平台选择等。这些设置需要和项目一起进行版本控制。

local 文件夹中包含该项目的本地设置，包括编辑器面板布局，窗口大小，位置等信息。您不需要关心这里的内容，只要按照您的习惯设置编辑器布局，这些就会自动保存在这个文件夹。一般 local 也不需要进入版本控制。

project.json 文件和 assets 文件夹一起，作为验证 Cocos Creator 项目合法性的标志。只有包括了这两个内容的文件夹才能作为 Cocos Creator 项目打开。而 project.json 本身目前只用来规定当前使用的引擎类型和插件存储位置，不需要用户关心其内容。

这个文件也应该纳入版本控制。

当用户按住 Alt/Option 的同时点击该按钮，除了执行这个文件夹自身的展开/折叠操作之外，还会同时展开/折叠该文件夹下的所有子节点。

拷贝/粘贴：将节点复制到剪贴板上，然后可以粘贴到另外的位置，或打开另一个场景来粘贴刚才拷贝的节点。
复制节点：生成和选中节点完全相同的节点副本，生成节点和选中节点在同一层级中。

锁定节点：鼠标移到节点上，左侧会有一个锁定按钮，节点锁定后无法在 场景编辑器 内选中该节点。

当在搜索按钮中选择 组件 类型时，搜索栏中会出现 t: 的符号，在后面输入需要查找的组件名称即可（例如 t:cc.Camera）。

需要拖拽资源赋值的属性栏上会显示蓝色的标签

刷新编辑器窗口（按 Ctrl / Cmd + R

Cannot read property 'style' of null
JS运行的时候你的页面还没有加载完成，所以你的JS代码找不到你的页面元素，就会抛出这个问题

使用addChild方法就会处发onload等方法
脚本里的onload与自定义方法谁先调用，根据addchild与调用自定义方法的先后决定
注意先调用自定义方法，赋值，在调用addChild


Draw Call//表示引擎对当前画面的绘制次数

--cc.Class 是一个由 cc.Component 派生出来的组件类
--Camera属性
  --ZoomRatio：视图缩放
  --BackgroundColor：颜色缓冲区清空时显示的底色，将 background 删除后，将显示 BackgroundColor 所设置的颜色。
  --Depth：摄像机的深度缓冲值。
  --cullingMask：删除 Mask 值设置，如果您希望某些 Node 属性不显示，可以使用它。
  --clearFlags：是否清空颜色缓冲、深度缓冲、模版缓冲区