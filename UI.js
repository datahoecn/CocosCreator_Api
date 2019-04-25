Slide//滑动条
	Handle：指定对应的滑块按钮。
	Direction：设置滑动条的方向。
	Progress：设置当前滑块所处的进度位置。
	Slide Events：设定滑块按钮在调节滑动条进度时的响应函数
	onSliderVEvent (sender, eventType) {//分别代表了滑动条节点和事件类型,事件类型的值为 CONTROL_EVENTTYPE_VALUE_CHANGED 值
	    this._updateImageOpacity(sender.progress);
	},

	this.slider.progress = 0.5



ProgressBar//进度条
	BarSprite：精灵节点
	Mode：用来设置进度条的类型，包括横向、纵向、圆型三种类型。
	TotalLength：当进度条为横向类型时，用来设置进度达到最大值时精灵的长度。
	Progress：表示当前默认的进度值，这里的 0.3 表示 30%。
	Reverse：用来设置进度条沿 X 轴正向还是 X 轴反向变化，取消选中，表示沿 X 轴正向。



ScrollView//滚动视图
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

	//滚动视图内容时的回调函数
	scrollEvent: function(sender, event) {
        switch(event) {
            case 0: 
               this.lblScrollEvent.string = "Scroll to Top"; 
               break;
            case 1: 
               this.lblScrollEvent.string = "Scroll to Bottom"; 
               break;
            case 2: 
               this.lblScrollEvent.string = "Scroll to Left"; 
               break;
            case 3: 
               this.lblScrollEvent.string = "Scroll to Right"; 
               break;
            case 4: 
               this.lblScrollEvent.string = "Scrolling"; 
               break;
            case 5: 
               this.lblScrollEvent.string = "Bounce Top"; 
               break;
            case 6: 
               this.lblScrollEvent.string = "Bounce bottom"; 
               break;
            case 7: 
               this.lblScrollEvent.string = "Bounce left"; 
               break;
            case 8: 
               this.lblScrollEvent.string = "Bounce right"; 
               break;
            case 9: 
               this.lblScrollEvent.string = "Auto scroll ended"; 
               break;
        }
    },
	