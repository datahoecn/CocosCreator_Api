设置string后，node的宽度未变更,下一帧才刷新大小
在设置 label 所有属性后在执行一次 label._updateRenderData(true); 就能带当帧获取大小
//设置字体
window.localFont = undefined;
cc.loader.loadRes("fonts/HYWenHei-85W.ttf", function(err, font) {
    localFont = font;
});