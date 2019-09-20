PageView
  properties
    content             Node 可滚动展示内容的节点。
    scrollEvents        Component.EventHandler[] 滚动视图的事件回调函数
    enabled             Boolean 表示该组件自身是否启用。
    enabledInHierarchy  Boolean 表示该组件是否被启用并且所在的节点也处于激活状态。
    name                String 该对象的名称。
    isValid             Boolean 表示该对象是否可用（被 destroy 后将不可用）

  method
    getCurrentPageIndex()       返回当前页面索引
    setCurrentPageIndex(index)  设置当前页面索引
    getPages()                  返回视图中的所有页面
    addPage(node)               在当前页面视图的尾部插入一个新视图
    insertPage(node, index)     将页面插入指定位置中
    removePage(node)            移除指定页面
    removePageAtIndex(index)    移除指定下标的页面
    removeAllPages()            移除所有页面

    scrollToPage(index, time) 滚动到指定页面
    scrollToBottom(time, Boolean) 默认true, 滚动加速度衰减 视图内容将在规定时间内滚动到视图底部。
    scrollToTop 视图内容将在规定时间内滚动到视图顶部。
    scrollToLeft 视图内容将在规定时间内滚动到视图左边。
    scrollToRight 视图内容将在规定时间内滚动到视图右边。
    scrollToTopLeft 视图内容将在规定时间内滚动到视图左上角。
    scrollToTopRight 视图内容将在规定时间内滚动到视图右上角。
    scrollToBottomLeft 视图内容将在规定时间内滚动到视图左下角。
    scrollToBottomRight 视图内容将在规定时间内滚动到视图右下角。
    scrollToOffset 视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置, 如果 timeInSecond参数不传，则立即滚动到指定偏移位置。
    getScrollOffset 获取滚动视图相对于左上角原点的当前滚动偏移
    getMaxScrollOffset 获取滚动视图最大可以滚动的偏移量
    scrollToPercentHorizontal 视图内容在规定时间内将滚动到 ScrollView 水平方向的百分比位置上。
    scrollTo 视图内容在规定时间内进行垂直方向和水平方向的滚动，并且滚动到指定百分比位置上。
    scrollToPercentVertical 视图内容在规定时间内滚动到 ScrollView 垂直方向的百分比位置上。
    stopAutoScroll 停止自动滚动, 调用此 API 可以让 Scrollview 立即停止滚动
    setContentPosition 设置当前视图内容的坐标点。
    getContentPosition 获取当前视图内容的坐标点。
    isScrolling 用户是否在拖拽当前滚动视图
    isAutoScrolling 当前滚动视图是否在惯性滚动



  Size Mode：设置每个页面的大小类型，
    Free 自由类型，即每个页面大小可以不一样
    Unified 统一类型，即每个页面大小需一样。

content 中的每个子节点为一个单独页面，该每个页面的大小为 PageView 节点的大小

通过脚本代码添加回调
  // 方法一
  var pageViewEventHandler = new cc.Component.EventHandler();
  pageViewEventHandler.target = this.node; // 这个是你的事件处理代码组件所属的节点
  pageViewEventHandler.component = "cc.MyComponent"
  pageViewEventHandler.handler = "callback";
  pageViewEventHandler.customEventData = "foobar";
  pageView.pageEvents.push(pageViewEventHandler);

  callback: function(pageView, eventType, customEventData) {
      // 这里 pageView 是一个 PageView 组件对象实例
      // 这里的 eventType === cc.PageView.EventType.PAGE_TURNING
  }
  // 方法二
  onLoad: function () {
     this.pageView.node.on('page-turning', this.callback, this);
  },

  callback: function (pageView) {
     // 回调的参数是 pageView 组件
     // 无法传递 customEventData
  }



this.target.setCurrentPageIndex(0);
this.target.getCurrentPageIndex();
// 第二个参数为滚动所需时间，默认值为 0.3 秒
this.target.scrollToPage(0);
// 添加页面
this.target.addPage(this.newNode);
// 插入当前页面
this.target.insertPage(this.newNode(), this.target.getCurrentPageIndex());
// 移除最后一个页面
var pages = this.target.getPages();
this.target.removePage(pages[pages.length - 1]);
// 移除当前页面
this.target.removePageAtIndex(this.target.getCurrentPageIndex());
this.target.removeAllPages();

// 监听事件
onPageEvent (sender, eventType) {
    // 翻页事件
    if (eventType !== cc.PageView.EventType.PAGE_TURNING) {
        return;
    }
    console.log("当前所在的页面索引:" + sender.getCurrentPageIndex());
}