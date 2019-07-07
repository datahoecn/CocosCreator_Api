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

  scrollView: cc.ScrollView,
  this.content = this.scrollView.content;

初始化容器
	// totalCount 总数量
	// spawnCount 实际显示数量
	this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
	for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
		let item = cc.instantiate(this.itemTemplate);
		this.content.addChild(item);
		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
		item.getComponent('Item').initItem(i, i);
        this.items.push(item);
	}
	//取得当前列表项在滚动视图中的纵向位置
    getPositionInView: function (item) { 
        //将相对 item.parent 的坐标，转换为世界坐标
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        //将 worldPos 转换为相对 this.scrollView.node 的坐标
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // 0.2, we don't need to do the math every frame
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;// 值是 600, 根据 (this.itemTemplate.height + this.spacing) * items.length; 1460
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = items[i].y + offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID - items.length; // update item id
                    item.updateItem(itemId);
                }
            } else {// 超出缓冲区 this.scrollView.node 上下 600
            		// item 的新坐标是否超过 content 范围
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = items[i].y - offset;
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID + items.length;
                    item.updateItem(itemId);
                }
            }
        }
        this.lastContentPosY = this.scrollView.content.y;
    },


	scrollView.scrollToOffset(cc.v2(0, 500), 2);
	scrollView.stopAutoScroll();//停止滚动
	scrollView.content.removeAllChildren();
	scrollView.content.addChild(this.nothing_item);



手动添加回调函数
	onLoad: function () {
	  var scrollViewEventHandler = new cc.Component.EventHandler();
	  scrollViewEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
	  scrollViewEventHandler.component = "MyComponent";// 这个是代码文件名
	  scrollViewEventHandler.handler = "callback";
	  scrollViewEventHandler.customEventData = "foobar";

	  var scrollview = node.getComponent(cc.ScrollView);
	  scrollview.scrollEvents.push(scrollViewEventHandler);
	},
	callback: function (scrollview, eventType, customEventData) {
	  // 这里 scrollview 是一个 Scrollview 组件对象实例
	  // 这里的 eventType === cc.ScrollView.EventType enum 里面的值
	  // 这里的 customEventData 参数就等于你之前设置的 "foobar"
	}

//滚动视图事件的响应回调函数
    scrollEvent: function(sender, event) {
        //根据 event 值显示当前正在触发的事件
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

