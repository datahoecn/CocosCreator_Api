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
  eventHandler.target = this.node;//Node 目标节点
  eventHandler.component = "MainMenu";//String 目标组件名
  eventHandler.handler = "OnClick"//String 响应事件函数名

  var data = {
      c: 1111, 
  };
  eventHandler.customEventData = data;
  
  var button = node.getComponent(cc.Button);
  button.clickEvents[0] = eventHandler;//button.clickEvents.push(eventHandler);



// 长按节点
longTouchEvents: [cc.Component.EventHandler],

onEnable() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
},

onDisable() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
},

_onTouchStart(event) {
  // _isTouching 标记当前是否在触摸这个节点
        if (this._isTouching) {
            return;
        }
        if (this.node.getBoundingBoxToWorld().contains(event.getLocation())) {
            this._isTouching = true;
        } else {
            this._isTouching = false;
        }
        if (this._isTouching) {
            // 第一次触摸立即回调一次
            this.publishOneTouch();
            // 然后开启计时器，计算后续的长按相当于触摸了多少次
            this.schedule(this._touchCounterCallback, this.touchInterval);
        }
},

publishOneTouch() {
    if (!this._isTouching) {
        return;
    }
    // 初始化this._touchCounter = 0
    this._touchCounter++;
    this.longTouchEvents.forEach((eventHandler) => {
        eventHandler.emit([this._touchCounter]);
    });
},

_touchCounterCallback() {
    if (this._isTouching) {
        this.publishOneTouch();
    } else {
        this.unschedule(this._touchCounterCallback);
    }
},

_onTouchEnd(event: cc.Event.EventTouch) {
    this._isTouching = false;
    this._touchCounter = 0;
    this.unschedule(this._touchCounterCallback);
},

_onTouchCancel(event: cc.Event.EventTouch) {
    this._isTouching = false;
    this._touchCounter = 0;
    this.unschedule(this._touchCounterCallback);
},