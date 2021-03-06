Button
    监听者通知分发者这里有代码对此事件感兴趣
    出事后由发射者通知分发者
    分发者根据当前的监听情况，把事件通知所有针对此事件的监听者
    通知分发者这段代码对此事件不再感兴趣了

    interactable 是否响应交互

    this.node.on(type, callback, [target], [useCapture  = false]);
    type        string    监听事件类型
    callback    function  事件发生后的回调函数
    target      object    调用回调的目标
    useCapture  boolean   捕获模式开关
    返回值是注册成功的回调函数，利用此返回值关闭事件监听

    位置变动监听事件, 通过 this.node.on(cc.Node.EventType.POSITION_CHANGED, callback, this); 进行监听
    尺寸变动监听事件，通过 this.node.on(cc.Node.EventType.SIZE_CHANGED, callback, this); 进行监听
    锚点变动监听事件，通过 this.node.on(cc.Node.EventType.ANCHOR_CHANGED, callback, this); 进行监听
    增加子节点监听事件，通过 this.node.on(cc.Node.EventType.CHILD_ADDED, callback, this); 进行监听
    删除子节点监听事件，通过 this.node.on(cc.Node.EventType.CHILD_REMOVED, callback, this); 进行监听
    子节点顺序变动监听事件，通过 this.node.on(cc.Node.EventType.CHILD_REORDER, callback, this); 进行监听
    节点分组变动监听事件，通过 this.node.on(cc.Node.EventType.GROUP_CHANGED, callback, this); 进行监听
    cc.game.on(cc.game.EVENT_HIDE, (event)=>{
        cc.log("game onPause - StorageUtil");
    });
    cc.game.on(cc.game.EVENT_SHOW, (event)=>{
        cc.log("game onResume - StorageUtil");
    });


    @property([cc.Component.EventHandler])
    clickEvents: cc.Component.EventHandler[] = [];

    _onTouchBegan (event: cc.Event) {
        if (!this.enabledInHierarchy) return;
        setTimeout(() => {
            cc.Component.EventHandler.emitEvents(this.checkEvents, event);
            or
            this.clickEvents[0].emit([event]);
        }, delayTime);
        event.stopPropagation();
    }

    手动创建
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

    const events = ['touchstart', 'touchmove', 'touchend',
                     'mousedown', 'mousemove', 'mouseup',
                     'mouseenter', 'mouseleave', 'mousewheel'];

    this.node.on('click', this.callback, this);
    this.node.off('click', this.callback, this);

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyBoard, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.keyBoard, this);

    
    this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
        // this._targetNode接受点击的节点
        //目标节点不存在，拦截
        if (!this._targetNode) {
            this.node._touchListener.setSwallowTouches(true);
            return;
        }
        //目标区域存在，击中放行
        let rect = this._targetNode.getBoundingBoxToWorld();
        if (rect.contains(event.getLocation())) {
            this.node._touchListener.setSwallowTouches(false);
        } else {
            this.node._touchListener.setSwallowTouches(true);
        }
    }, this);


cc.Event 类型的事件对象 event
        touch 
        type                      String    事件的类型（事件名）
        bubbles                   boolean   表示该事件是否进行冒泡
        target                    cc.Node   接收到事件的原始对象
        currentTarget             cc.Node   接收到事件的当前对象，事件在冒泡阶段当前对象可能与原始对象不同
        getType                   Funciton  获取事件的类型
        stopPropagation           Function  停止冒泡阶段，事件将不会继续向父节点传递，当前节点的剩余监听器仍然会接收到事件
        stopPropagationImmediate  Function  立即停止事件的传递，事件将不会传给父节点以及当前节点的剩余监听器
        getCurrentTarget          Function  获取当前接收到事件的目标节点
        detail                    Function  自定义事件的信息（属于 cc.Event.EventCustom）
        setUserData               Function  设置自定义事件的信息（属于 cc.Event.EventCustom）
        getUserData               Function  获取自定义事件的信息（属于 cc.Event.EventCustom）


触摸事件
    touch cc.Touch  与当前事件关联的触点对象
    getID Number  获取触点的 ID，用于多点触摸的逻辑判断
    getLocation Object  获取触点位置对象，对象包含 x 和 y 属性
    getLocationX  Number  获取触点的 X 轴位置
    getLocationY  Number  获取触点的 Y 轴位置
    getPreviousLocation Object  获取触点上一次触发事件时的位置对象，对象包含 x 和 y 属性
    getStartLocation  Object  获取触点初始时的位置对象，对象包含 x 和 y 属性
    getDelta  Object  获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性



发射事件
    //dispatchEvent可以做事件传递
    this.node.emit('say-hello', {
        msg: 'Hello, this is Cocos Creator',
    });

    this.node.on('say-hello', function (msg) {
        console.log(msg);
    });

    //在事件监听回调中，开发者会接收到一个 cc.Event 类型的事件对象 event
    // 节点 c 的组件脚本中
    this.node.dispatchEvent( new cc.Event.EventCustom('foobar', true) );
    // 节点 b 的组件脚本中
    this.node.on('foobar', function (event) {
        //中断处理
        event.stopPropagation();
    });

    node.emit(type, detail)：通知所有监听 type 事件的监听器，可以发送一个附加参数。
    node.dispatchEvent(event)：发送一个事件给它的监听器，支持冒泡。
    node.on(type, callback, target)：持续监听 node 的 type 事件。
    node.once(type, callback, target)：监听一次 node 的 type 事件。
    node.off(type, callback, target)：取消监听所有 type 事件或取消 type 的某个监听器（用 callback 和 target 指定）。


// enabledInHierarchy  Boolean 表示该组件是否被启用并且所在的节点也处于激活状态。
    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }
    onDisable () {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }
    _onTouchBegan (event) {
        if (!this.interactable || !this.enabledInHierarchy) return;
        this._pressed = true;
        event.stopPropagation();
    },

    _onTouchMove (event) {
        if (!this.interactable || !this.enabledInHierarchy || !this._pressed) return;
        let touch = event.touch;
        // 判断是否移动到节点外边
        let hit = this.node._hitTest(touch.getLocation());
        let target = this._getTarget();
        let originalScale = this._originalScale;
        event.stopPropagation();
    },

    _onTouchEnded (event) {
        if (!this.interactable || !this.enabledInHierarchy) return;

        if (this._pressed) {
            cc.Component.EventHandler.emitEvents(this.clickEvents, event);
            this.node.emit('click', this);
        }
        this._pressed = false;
        event.stopPropagation();
    },

    _onTouchCancel () {
        if (!this.interactable || !this.enabledInHierarchy) return;

        this._pressed = false;
    },