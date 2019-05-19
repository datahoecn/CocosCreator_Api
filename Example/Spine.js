cc.Class({
    extends: cc.Component,
    //使用 requireComponent 关键字设置编辑器，
    //如果 sp.Skeleton 使用了其它相关组件脚本，将自动添加进来，以防止人工添加组件时出现遗漏
    editor: {
        requireComponent: sp.Skeleton
    },
    //设置动作融合时间 0.2 秒，表示该时间内完成从一个动作到另一个动作的切换
    properties: {
        mixTime: 0.2
    },
    onLoad () {
        //取得 Spine 组件
        var spine = this.spine = this.getComponent('sp.Skeleton');
        //设置使用动作融合，完成从走路到跑步的动画切换，且在 0.2 秒内完成
        this._setMix('walk', 'run');
        this._setMix('run', 'jump');
        this._setMix('walk', 'jump');
        //设置开始播放动画的事件监听
        spine.setStartListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] start.", trackEntry.trackIndex, animationName);
        });
        //设置动画被打断的监听响应函数
        spine.setInterruptListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] interrupt.", trackEntry.trackIndex, animationName);
        });
        //设置动画结束时的监听响应函数
        spine.setEndListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] end.", trackEntry.trackIndex, animationName);
        });
        //设置动画将被销毁时的监听响应函数
        spine.setDisposeListener(trackEntry => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] will be disposed.", trackEntry.trackIndex, animationName);
        });
        //设置动画播放一次循环结束后的监听响应函数
        spine.setCompleteListener((trackEntry, loopCount) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            if (animationName === 'shoot') {
                this.spine.clearTrack(1);
            }
            cc.log("[track %s][animation %s] complete: %s", trackEntry.trackIndex, animationName, loopCount);
        });
        //设置处理动画播放过程中帧事件的监听响应函数
        spine.setEventListener((trackEntry, event) => {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            cc.log("[track %s][animation %s] event: %s, %s, %s, %s", trackEntry.trackIndex, animationName, event.data.name, event.intValue, event.floatValue, event.stringValue);
        });
        //默认播放走路动作，将处于停止状态的变量设为 false
        this._hasStop = false;

        // var self = this;
        // cc.eventManager.addListener({
        //     event: cc.EventListener.TOUCH_ALL_AT_ONCE,
        //     onTouchesBegan () {
        //         self.toggleTimeScale();
        //     }
        // }, this.node);
    },
    
    // OPTIONS
    //处理控制选项的函数
    //切换插槽显示开关
    toggleDebugSlots () {
         //对 spine 上的 debugSlots 属性进行切换设置
        this.spine.debugSlots = !this.spine.debugSlots;
    },
    //切换显示骨骼开关
    toggleDebugBones () {
        //对 spine 上的 debugBones 属性进行切换设置
        this.spine.debugBones = !this.spine.debugBones;
    },
    //切换时间缩放开关，用于控制动作的播放速度
    toggleTimeScale () {
        //对 spine 上的 timeScale 属性进行切换设置
        if (this.spine.timeScale === 1.0) {
            this.spine.timeScale = 0.3;
        }
        else {
            this.spine.timeScale = 1.0;
        }
    },
    
    // ANIMATIONS
    // 播放指定动作的函数
    //使用 spine 的 setAnimation 接口实现了动作动画的播放
    stop () {
        this.spine.clearTrack(0);
        this._hasStop = true;
    },

    walk () {
        this.spine.setAnimation(0, 'walk', true);
        this._hasStop = false;
    },
    
    run () {
        this.spine.setAnimation(0, 'run', true);
        this._hasStop = false;
    },
     //跳动画
    jump () {
        //先记录当前正在播放的动作
        var oldAnim = this.spine.animation;
        //设置播放一次跳动的动作
        this.spine.setAnimation(0, 'jump', false);
        //跳之前，判断是否有其他正在播放的动作，且处于未停止状态。
        //如果有，则在跳起动作后加上循环延续的动作。若之前是跑步，仍为跑步，否则设为走路
        if (oldAnim && !this._hasStop) {
            this.spine.addAnimation(0, oldAnim === 'run' ? 'run' : 'walk', true, 0);
        }
    },
    //开枪动画
    shoot () {
        //设置播放一次开枪动画
        this.spine.setAnimation(1, 'shoot', false);
    },
    //为所有的关键帧设定融合及融合的时间（从当前值开始进行“插值”计算
    _setMix (anim1, anim2) {
        this.spine.setMix(anim1, anim2, this.mixTime);
        this.spine.setMix(anim2, anim1, this.mixTime);
    }
});