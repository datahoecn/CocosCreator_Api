//动画
var armatureDisplay = this.logo.getComponent(dragonBones.ArmatureDisplay);
if(Config.language === "zh") {
    armatureDisplay.playAnimation("Animation2", -1);
}
else if(Config.language === "en") {
    armatureDisplay.playAnimation("Animation4", -1);
}
else {
    armatureDisplay.playAnimation("Animation3", -1);
}


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

var callBack = function(node) {
            node.removeFromParent();
            node = null;
        };
        
node.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.3, 0.8, 0.8), cc.fadeOut(0.3)),
            cc.callFunc(callBack)));

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
    sheepAnim_2 = this.node.getComponent(cc.Animation);
},

// use this for initialization
onLoad: function () {
    var anim = this.sheepAnim;
    this._playAnimCallback = function() {
        anim.play('sheep_jump');//调用精灵的 play 方法播放 sheep_jump 序列动画
    };
    this.scheduleOnce(this._playAnimCallback, 2);//将在 2 秒后执行回调函数
}


//Spine
    //component : Spine skeleton
    Src Blend Factor：所用图片的颜色混合设置源项//1.10.2版本没有
    Dst Blend Factor：所用图片的颜色混合设置目标项//1.10.2版本没有
    Skeleton Data：骨骼动画文件。
    Default Skin：默认的身体部件套装名称，这里形象地称为“皮肤”，
    如果 Spine 中有多套皮肤信息，我们可以跟据需求为骨骼动画更换不同的皮肤套装，从而实现换装效果。
    Animation：默认的动作名称，一般会有多个动作供切换
    Loop：用来设置是否循环播放。
    Premultiplied Alpha：在图片渲染时做半透明处理，
    它的重要意义在于可使带透明度的图片纹理正常进行线性插值，
    从而让旋转、缩放或者非整数的纹理坐标正常显示，否则就会像上面案例一样，在透明像素边缘产生奇怪的颜色
    Time Scale：设置播放速度
    Debug Slots：设置是否显示插槽
    Debug Bones：设置是否显示骨骼。

    //Spine 动作融合
    动作融合的目的是保证多个动作之间更平滑、自然地切换。
    要在两个动作之间使用动作融合，则需设置动作的切换时间

//DragonBone
    //component : DragonBones
    Dragon Asset：骨骼动画文件。
    Dragon Atlas Asset：骨骼动画对应的拼合纹理图。
    Armature：骨架名称。
    Animation：动画名称。

    //动作混合
    就是为人物的不同骨骼赋予不同的动作，
    比如本例中，机器人一边走一边射击，下半身执行行走动作，而上半身同时进行着射击动作。
    这种上、下半身分离，各自播放不同的动作，同时又混合在一个人物身上的效果


