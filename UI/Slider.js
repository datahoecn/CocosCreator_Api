Slide//滑动条
	Handle：指定对应的滑块按钮。
	Direction：设置滑动条的方向。
	Progress：设置当前滑块所处的进度位置。
	Slide Events：设定滑块按钮在调节滑动条进度时的响应函数
	onSliderVEvent (sender, eventType) {//分别代表了滑动条节点和事件类型,事件类型的值为 CONTROL_EVENTTYPE_VALUE_CHANGED 值
	    this._updateImageOpacity(sender.progress);
	},

	this.slider.progress = 0.5