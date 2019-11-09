Button

  onClick(event, data){
        switch(data){
            case 'start':{
                cc.director.loadScene('game');
                break;
            }
        }
    }

  Target：当前组件绑定的节点
  Interactable：是否响应交互，不勾选相当于禁用。

var event = new cc.Component.EventHandler();
event.target = this.node;
event.component = "MainMenu";
event.handler = "OnClick";

  var data = {
      c: 1111, 
  };
  event.customEventData = data;
  
  var button = node.getComponent(cc.Button);
  button.clickEvents[0] = event;//button.clickEvents.push(event);



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