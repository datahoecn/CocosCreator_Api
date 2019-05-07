Canvas(画布)
  Canvas是新建场景自带的一个节点组件
  该组件能够获得设备屏幕或浏览器有效区域的分辨率，进行适当缩放
  Fit Height 高度匹配模式
  Fit Width 宽度匹配模式
  两个都勾选，会变形拉伸，填满画面
  两个都不勾选，会根据屏幕宽高比自动选择 适配高度 或 适配宽度 来避免黑边

Widget(对齐挂件)




Label
设置string后，node的宽度未变更,下一帧才刷新大小
在设置 label 所有属性后在执行一次 label._updateRenderData(true); 就能带当帧获取大小
//设置字体
window.localFont = undefined;
cc.loader.loadRes("fonts/HYWenHei-85W.ttf", function(err, font) {
    localFont = font;
});

加载位图： (orangeAtlas.labelatlas orange.png) 把orangeAtlas.labelatlas放入font

EditBox
  Background Image：设置 BACKGROUND_SPRITE 的纹理，即编辑器背景图。
  KeyboardReturnType：设置回车键类型。
  Input Flag：指定输入标识，用于指定所输入内容的格式，主要有以下几种。
    PASSWORD：密码类型
    SENSITIVE：大小写区分类型
    INITIAL_CAPS_WORD：首字母大写
    INITIAL_CAPS_SENTENCE：首句话大写
    INITIAL_CAPS_ALL_CHARACTERS：所有字符大写
    DEFAULT：默认状态
  Input Mode：指定输入类型，主要有以下几种。
    ANY：表示可以输入任何类型。
    EMAIL_ADDR：表示输入电子邮件地址。
    NUMERIC：表示输入数字。
    PHONE_NUMERIC：表示输入电话号码。
    URL：表示输入互联网地址。
    DECIMAL：表示输入浮点数。
    SINGLE_LINE：表示输入单行普通文本。
  Placeholder：设置编辑框空白时显示的默认提示文字。
  Max Length：设置最大的输入字符数量。
  Stay On Top ：只应用于 Web 页面，可以确保编辑器始终处于层级顶层，防止被其它节点遮挡。
  Tab Index：当需要使用 Tab 健切换不同编辑框时，该项可用来指定 TAB 切换时的控件索引。
  Editing Did Began：设置输入开始时获取焦点触发的响应事件回调函数。
  Text Changed：设置每输入一个文字时的响应事件回调函数。
  Editing Did Ended：设置输入框失去焦点时触发的响应事件回调函数。
  Editing Return：设置输入完成后点击回车键时的响应事件回调函数。

  当你的鼠标在某个输入框中点一下，就是要输入了，这时，输入框中会出现光标，这个输入框获取了焦点；
  输完一个输入框，直接让光标跑到下一个输入框，或是跑到按钮上（按钮出现虚线框），给输入框或按钮设置焦点。
  this.editBox1.setFocus(true)


Button
  Target：当前组件绑定的节点
  Transition：按钮按下时状态变化的过渡类型，
    共有无变化、图片变化、颜色变化和缩放变化四种效果可供选择
    SPRITE :
      Normal：普通状态下的背景图。
      Pressed：按下状态下的背景图。
      Hover：鼠标在其上悬停但未按下时的背景图。
      Disabled：禁用状态时的背景图。
  Interactable：是否响应交互，不勾选相当于禁用。
  Click Events：点击按钮时响应的函数数量
  [0]：设置第一个响应函数的三个参数，分别为响应的节点对象、对应的脚本组件、脚本组件中的响应函数。
  CustomEventData：响应函数对应的参数。

  var eventHandler = new cc.Component.EventHandler();
  eventHandler.target = newTarget;//Node 目标节点
  eventHandler.component = "MainMenu";//String 目标组件名
  eventHandler.handler = "OnClick"//String 响应事件函数名

  var data = {
      c: 1111, 
  };
  eventHandler.customEventData = data;

  btn.clickEvents[0] = eventHandler;

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

    let items = this.items;
    let buffer = this.bufferZone;
    let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
    let offset = (this.itemTemplate.height + this.spacing) * items.length;
    for (let i = 0; i < items.length; ++i) {
        let viewPos = this.getPositionInView(items[i]);
        if (isDown) {
            // if away from buffer zone and not reaching top of content
            if (viewPos.y < -buffer && items[i].y + offset < 0) {
                items[i].y = items[i].y + offset;
                let item = items[i].getComponent('Item');
                let itemId = item.itemID - items.length; // update item id
                item.updateItem(i, itemId);
            }
        } else {
            // if away from buffer zone and not reaching bottom of content
            if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                items[i].y = items[i].y - offset;
                let item = items[i].getComponent('Item');
                let itemId = item.itemID + items.length;
                item.updateItem(i, itemId);
            }
        }
    }
    // update lastContentPosY
    this.lastContentPosY = this.scrollView.content.y;
	