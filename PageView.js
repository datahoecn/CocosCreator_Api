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