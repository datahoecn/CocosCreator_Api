Handle：指定对应的滑块按钮。
Direction：设置滑动条的方向。
Progress：设置当前滑块所处的进度位置。
Slide Events：设定滑块按钮在调节滑动条进度时的响应函数

this.slider.progress = 0.5

滑动条进度值改变时，回调函数的定义方式。sender、eventType 
这两个参数是必须的，分别代表了滑动条节点和事件类型。
 onSliderVEvent (sender, eventType) {
        this._updateImageOpacity(sender.progress);
    },