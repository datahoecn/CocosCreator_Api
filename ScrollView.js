ScrollView
Content：当前视图区域内显示的精灵节点，也可以设置成其它更复杂的节点。
Horizontal：设置能否横向滚动。
Vertical：设置能否纵向滚动。
Inertia：设置在滚动时是否带有惯性效果。
Brake：开启惯性后，用来设置停止速度，设为 0，滚动时用户停止触屏，视图区域中的内容会按当前速度继续运动下去，设为 1，则立即停止。
Elastic：当视图区域中的内容超出边界时停止触屏，是否设置回弹效果。
Bounce Duration：设置回弹持续的时间，0 表示立即回弹到位。
Horizontal Scroll Bar：横向滚动条。
Vertical Scroll Bar：纵向滚动条。
Scroll Events：指定滚动视图内容时的回调函数。
Cancel Inner Events：发生滚动行为时，是否取消子节点上注册的触屏事件。

scrollView.scrollToOffset(cc.p(0, 500), 2);
scrollView.stopAutoScroll();//停止滚动
scrollView.content.removeAllChildren();
scrollView.content.addChild(this.nothing_item);


ListView
列表框只是滚动视图的扩展，一般用来显示多个数据项列表。
