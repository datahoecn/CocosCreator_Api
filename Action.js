var moveTo = cc.moveTo(0.5, cc.p(0, 0));
this.moveTo.runAction(moveTo);

cc.moveTo(0.5, cc.p(0, 0));
cc.moveBy(0.5, cc.p(100, 100));
cc.rotateTo(1, 0, 100);//第一个参数是时间，第二个参数是沿X轴旋转，第三个参数是沿Y轴旋转
cc.rotateBy(1, 100);//第二个参数是沿X与Y轴都旋转100度
cc.scaleTo(0.2, 1, 0.6)
cc.tintTo(2, 255, 0, 0);//将精灵的颜色值改变为目标值
cc.delayTime(0.5);
cc.fadeOut(1);//用来设置在一段时间内淡出
cc.fadeIn(1);//用来设置在一段时间内淡入
cc.callFunc(() => {
                });

cc.moveTo(0.5, cc.p(0, 0)).easing(cc.easeCubicActionOut());
cc.easeCubicActionOut()
cc.easeCubicActionIn()

cc.sequence(cc.moveBy(0.1, cc.p(0, -200)),cc.moveBy(0.1, cc.p(0, 200))).repeat(2)

动画列表上方有一排小按钮，从左到右依次为：
	打开/关闭编辑模式
	跳转到第一帧
	跳转到上一帧
	播放动画
	跳转到下一帧
	插入帧事件
	保存当前编辑的动画文件


properties: {
    sheepAnim: {
        default: null,
        type: cc.Animation//是一个node加sprite加animation的集合
    }
},

// use this for initialization
onLoad: function () {
    var anim = this.sheepAnim;
    this._playAnimCallback = function() {
        anim.play('sheep_jump');//调用精灵的 play 方法播放 sheep_jump 序列动画
    };
    this.scheduleOnce(this._playAnimCallback, 2);//将在 2 秒后执行回调函数
}