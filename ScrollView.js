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


PageView
	Content：表示 PageView 子节点 content，用来显示内容。
	Size Mode：设置每个页面的大小类型，
		Free 自由类型，即每个页面大小可以不一样
		Unified 统一类型，即每个页面大小需一样。
	Direction：设置滚动方向。
	Scroll Threshold：设置滚动临界区的默认值（百分比形式），当拖拽页面超过该值时停止，下一页将滚动到视图中，小于则当前页再次回滚显示。
	Auto Page Turning Threshold：设置快速滑动的翻页临界值
		当用户滑动时，会根据开始和结束时间，以及滑动的距离计算出一个速度值。
		该值比临界值大，停止滑动，视图中将显示下一页，若小则滑动到当前页。
	Inertia：设置是否开启滚动惯性。
	Brake：开启惯性后，当用户停止触屏时，设置停止速度，0 表示永不停止，1 表示立即停止。
	Elastic：是否允许滚动内容超过边界，并在停止触屏后增加回弹效果。
	Bounce Duration：设置回弹持续时间，0 表示立即回弹到位。
	Indicator：代表页面视图的指示器，用于设置切换到第几页。
	Page Turning Speed：设置每个页面翻页所花费的时间。
	Page Turning Event Timing：设置每个页面完成自动滚动动画的时间阙值，用于指定事件响应的发送时机。
	Page Events：设置切换页时的响应函数。
	CustomEventData：将用户指定的任意字符串作为最后的参数传入事件回调函数中
		PageView 的事件回调有两个参数，第一个参数是 PageView 本身，第二个参数是 PageView 的事件类型。
	Cancel Inner Events：当产生滚动行为时，设置子节点上的注册事件是否取消。
