var Direction = cc.Enum({
    Horizontal: 0,
    Vertical: 1
});

cc.Class({
    extends: cc.Component,

    properties: {
        handle: {
            default: null,
            type: cc.Button,
            notify: function() {
                if (CC_EDITOR && this.handle) {
                    this._updateHandlePosition();
                }
            }
        },

        direction: {
            default: Direction.Horizontal,
            type: Direction,
        },

        progress: {
            default: 0.5,
            type: cc.Float,
            range: [0, 1, 0.1],
            slide: true,
            notify: function() {
                this._updateHandlePosition();
            }
        },

        slideEvents: {
            default: [],
            type: cc.Component.EventHandler,
        }
    },

    ctor: function () {
        this._offset = cc.v2();
        this._touchHandle = false;
        this._dragging = false;
    },

    statics: {
        Direction: Direction
    },

    __preload: function () {
        this._updateHandlePosition();
    },

    // onLoad () {
    // },

    start () {
    },

    // update (dt) {},

    _updateHandlePosition: function () {
        if (!this.handle) { return; }
        var handlelocalPos;
        if (this.direction === Direction.Horizontal) {
            handlelocalPos = cc.v2(-this.node.width * this.node.anchorX + this.progress * this.node.width, 0);
        }
        else {
            handlelocalPos = cc.v2(0, -this.node.height * this.node.anchorY + this.progress * this.node.height);
        }
        var worldSpacePos = this.node.convertToWorldSpaceAR(handlelocalPos);
        this.handle.node.position = this.handle.node.parent.convertToNodeSpaceAR(worldSpacePos);
    },

    // 注册事件
    onEnable: function () {
        // this.node.on('slide', this.event, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
        if (this.handle && this.handle.isValid) {
            this.handle.node.on(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
            this.handle.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
            this.handle.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        }
    },

    onDisable: function() {
        // this.node.off('slide', this.event, this);
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
        if (this.handle && this.handle.isValid) {
            this.handle.node.off(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
            this.handle.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
            this.handle.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        }
    },

    _onHandleDragStart: function (event) {
        this._dragging = true;
        this._touchHandle = true;
        this._offset = this.handle.node.convertToNodeSpaceAR(event.touch.getLocation());
        event.stopPropagation();
    },

    _onTouchBegan: function (event) {
        if (!this.handle) { return; }
        this._dragging = true;
        if (!this._touchHandle) {
            this._handleSliderLogic(event.touch);
        }
        event.stopPropagation();
    },

    _onTouchMoved: function (event) {
        if (!this._dragging) { return; }
        this._handleSliderLogic(event.touch);
        event.stopPropagation();
    },

    _onTouchEnded: function (event) {
        this._dragging = false;
        this._touchHandle = false;
        this._offset = cc.v2();
        event.stopPropagation();
    },

    _onTouchCancelled: function (event) {
        this._dragging = false;
        event.stopPropagation();
    },


    _handleSliderLogic: function (touch) {
        this._updateProgress(touch);
        this._emitSlideEvent();
    },

    _updateProgress: function (touch) {
        if (!this.handle) { return; }
        var localTouchPos = this.node.convertToNodeSpaceAR(touch.getLocation());
        if (this.direction === Direction.Horizontal) {
            this.progress = clamp01(0.5 + (localTouchPos.x - this._offset.x) / this.node.width);
        }
        else {
            this.progress = clamp01(0.5 + (localTouchPos.y - this._offset.y) / this.node.height);
        }
    },

    _emitSlideEvent: function () {
        cc.Component.EventHandler.emitEvents(this.slideEvents, this);
        // this.node.emit('slide', this);
    },

    event() {
    },

});

var clamp01 = function (value) {
    return value < 0 ? 0 : value < 1 ? value : 1;
};
