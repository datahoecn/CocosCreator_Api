// PZE9653cPtkc

// 范例使用节点上组件 this 可以暂停，文档说使用 node
cc.director.getActionManager().resumeTarget(this.node);
cc.director.getActionManager().pauseTarget(this.node);


停止动作
    node.stopAction(action);
    node.stopAllActions();
    // 暂停 继续
    node.pauseAllActions();
    node.resumeAllActions();

标识
    action.setTag(ACTION_TAG);
    node.getActionByTag(ACTION_TAG);
    node.stopActionByTag(ACTION_TAG);

//repeat、repeatForever、speed
cc.sequence(
// 以1/2的速度慢放动画，并重复5次
).speed(2).repeat(5);//repeatForever

在 cc.callFunc 中不应该停止自身动作，
由于动作是不能被立即删除，如果在动作回调中暂停自身动作会引发一系列历问题
 
容器动作
    cc.sequence         顺序执行动作  var seq = cc.sequence(act1, act2);var seq = cc.sequence(actArray);
    cc.spawn            同步执行动作  var action = cc.spawn(cc.jumpBy(2, cc.v2(300, 0), 50, 4), cc.rotateBy(2, 720));
    cc.repeat           重复执行动作  var rep = cc.repeat(cc.sequence(jump2, jump1), 5);
    cc.repeatForever    永远重复动作  var repeat = cc.repeatForever(cc.rotateBy(1.0, 360));
    cc.speed            修改动作速率  var newAction = cc.speed(action, 0.5);

即时动作
    cc.show             立即显示            var showAction = cc.show();
    cc.hide             立即隐藏            var hideAction = cc.hide();
    cc.toggleVisibility 显隐状态切换        var toggleVisibilityAction = cc.toggleVisibility();
    cc.removeSelf       从父节点移除自身    var removeSelfAction = cc.removeSelf();
    cc.flipX            X轴翻转            var flipXAction = cc.flipX(true);
    cc.flipY            Y轴翻转            var flipYAction = cc.flipY(true);
    cc.place            放置在目标位置      var placeAction = cc.place(cc.v2(200, 200));var placeAction = cc.place(200, 200);
    cc.callFunc         执行回调函数       var finish = cc.callFunc(this.myMethod, this, opt);
                                          var finish = cc.callFunc(function () {}, this, opt);
                                          var finish = cc.callFunc(() => {}, this, opt);
                                            myMethod: function (sender, opt) { // sender == this
                                            }
    cc.targetedAction   用已有动作和一个新的目标节点创建动作  
                                          var flipYAction = cc.targetedAction(target Node,action FiniteTimeAction);

时间间隔动作
    cc.moveTo           移动到目标位置                             var actionBy = cc.moveTo(2, cc.v2(80, 80));
    cc.moveBy           移动指定的距离                             var actionTo = cc.moveBy(2, cc.v2(windowSize.width - 40, windowSize.height - 40));
    cc.rotateTo         旋转到目标角度                             var rotateTo = cc.rotateTo(2, 61.0);
    cc.rotateBy         旋转指定的角度                             var actionBy = cc.rotateBy(2, 360);
    cc.scaleTo          将节点大小缩放到指定的倍数                   var actionTo = cc.scaleTo(2, 0.5);var actionTo = cc.scaleTo(2, 0.5, 2);
    cc.scaleBy          按指定的倍数缩放节点大小                    var actionBy = cc.scaleBy(2, 2);var actionBy2 = cc.scaleBy(2, 0.25, 4.5);
    cc.skewTo           偏斜到目标角度                             var actionTo = cc.skewTo(2, 37.2, -37.2);
    cc.skewBy           偏斜指定的角度                             var actionBy = cc.skewBy(2, 0, -90);
    cc.jumpBy           用跳跃的方式移动指定的距离                   var actionBy = cc.jumpBy(2, cc.v2(300, 0), height Number, jumps Number);var actionBy = cc.jumpBy(2, 300, 0, 50, 4);
    cc.jumpTo           用跳跃的方式移动到目标位置                   var actionTo = cc.jumpTo(2, cc.v2(300, 300), 50, 4);var actionTo = cc.jumpTo(2, 300, 300, 50, 4);
    cc.follow           追踪目标节点的位置                           var followAction = cc.follow(targetNode, cc.rect(0, 0, screenWidth * 2 - 100, screenHeight));
                                                                    var followAction = cc.follow(targetNode);
    cc.bezierTo         按贝赛尔曲线轨迹移动到目标位置                 var bezier = [cc.v2(0, windowSize.height / 2), cc.v2(300, -windowSize.height / 2), cc.v2(300, 100)];
                                                                    var bezierTo = cc.bezierTo(2, bezier);
    cc.bezierBy         按贝赛尔曲线轨迹移动指定的距离     
    cc.blink            闪烁（基于透明度）                           var action = cc.blink(2, 10);
    cc.fadeTo           修改透明度到指定值                           var action = cc.fadeTo(1.0, 0);
    cc.fadeIn           渐显                                          var action = cc.fadeIn(1.0);
    cc.fadeOut          渐隐                      var action = cc.fadeOut(1.0);
    cc.tintTo           修改颜色到指定值            var action = cc.tintTo(2, 255, 0, 255);
    cc.tintBy           按照指定的增量修改颜色         var action = cc.tintBy(2, -127, -255, -127);
    cc.delayTime        延迟指定的时间量            var delay = cc.delayTime(1);
    cc.reverseTime      反转目标动作的时间轴           var reverse = cc.reverseTime(action);
    cc.cardinalSplineTo 按基数样条曲线轨迹移动到目标位置   var action1 = cc.cardinalSplineTo(3, array, 0);points Array array of control points,tension Number
    cc.cardinalSplineBy 按基数样条曲线轨迹移动指定的距离
    cc.catmullRomTo     按 Catmull Rom 样条曲线轨迹移动到目标位置     var action1 = cc.catmullRomTo(3, array);points Array
    cc.catmullRomBy     按 Catmull Rom 样条曲线轨迹移动指定的距离     var action1 = cc.catmullRomBy(3, array);

缓动动作
    cc.easeIn                   由慢到快                        action.easing(cc.easeIn(3.0));
    cc.easeOut                  由快到慢                        action.easing(cc.easeOut(3.0));
    cc.easeInOut                慢到快然后慢                     action.easing(cc.easeInOut(3.0));
    cc.easeExponentialIn        按指数函数缓动进入的动作        action.easing(cc.easeExponentialIn());
    cc.easeExponentialOut       按指数函数缓动退出的动作        action.easing(cc.easeExponentialOut());
    cc.easeExponentialInOut     按指数函数缓动进入并退出的动作     action.easing(cc.easeExponentialInOut());
    cc.easeSineIn               按正弦函数缓动进入的动作         action.easing(cc.easeSineIn());
    cc.easeSineOut              按正弦函数缓动退出的动作        action.easing(cc.easeSineOut());
    cc.easeSineInOut            按正弦函数缓动进入并退出的动作     action.easing(cc.easeSineInOut());
    cc.easeElasticIn            按弹性曲线缓动进入的动作        action.easing(cc.easeElasticIn(3.0));
    cc.easeElasticOut           按弹性曲线缓动退出的动作        action.easing(cc.easeElasticOut(3.0));
    cc.easeElasticInOut         按弹性曲线缓动进入并退出的动作     action.easing(cc.easeElasticInOut(3.0));
    cc.easeBounceIn             按弹跳动作缓动进入的动作        action.easing(cc.easeBounceIn());
    cc.easeBounceOut            按弹跳动作缓动退出的动作        action.easing(cc.easeBounceOut());
    cc.easeBounceInOut          按弹跳动作缓动进入并退出的动作     action.easing(cc.easeBounceInOut());
    cc.easeCircleActionIn       按圆形曲线缓动进入的动作            action.easing(cc.easeCircleActionIn());
    cc.easeCircleActionOut      按圆形曲线缓动退出的动作        action.easing(cc.easeCircleActionOut());
    cc.easeCircleActionInOut    按圆形曲线缓动进入并退出的动作     action.easing(cc.easeCircleActionInOut()); 
    cc.easeBackIn               在相反的方向缓慢移动，然后加速到正确的方向   action.easing(cc.easeBackIn());
    cc.easeBackOut              快速移动超出目标，然后慢慢回到目标点  action.easing(cc.easeBackOut());
    cc.easeBackInOut                                                action.easing(cc.easeBackInOut());
    cc.easeBezierAction         按贝塞尔曲线缓动的动作             action.easing(cc.easeBezierAction(0.5, 0.5, 1.0, 1.0));
    cc.easeQuadraticActionIn    按二次函数缓动进入的动作            action.easing(cc.easeQuadraticActionIn());
    cc.easeQuadraticActionOut   按二次函数缓动退出的动作            action.easing(cc.easeQuadraticActionOut());
    cc.easeQuadraticActionInOut 按二次函数缓动进入并退出的动作     action.easing(cc.easeQuadraticActionInOut());
    cc.easeCubicActionIn        按三次函数缓动进入的动作        action.easing(cc.easeCubicActionIn());
    cc.easeCubicActionOut       按三次函数缓动退出的动作        action.easing(cc.easeCubicActionOut());
    cc.easeCubicActionInOut     按三次函数缓动进入并退出的动作 
    cc.easeQuarticActionIn      按四次函数缓动进入的动作            action.easing(cc.easeQuarticActionIn());
    cc.easeQuarticActionOut     按四次函数缓动退出的动作            action.easing(cc.QuarticActionOut());
    cc.easeQuarticActionInOut   按四次函数缓动进入并退出的动作
    cc.easeQuinticActionIn      按五次函数缓动进的动作             action.easing(cc.easeQuinticActionIn());
    cc.easeQuinticActionOut     按五次函数缓动退出的动作
    cc.easeQuinticActionInOut   按五次函数缓动进入并退出的动作     action.easing(cc.easeQuinticActionInOut());

缓动系统（cc.tween） 在 v2.0.9 提供了
    to：对属性进行绝对值计算，最终的运行结果即是设置的属性值
    by：对属性进行相对值计算，最终的运行结果是设置的属性值加上开始运行时节点的属性值
    cc.tween(this.node)
    .delay(1)// 延迟 1s
    .to(1, { position: cc.v2(100, 100), rotation: 360 })//同时执行
    .to(1, { scale: 2 })
    .repeat(10)// 对前一个 by 重复执行 10次
    .repeat(10,
        cc.tween().by(1, { scale: 1 })
    )//如果有参数提供了其他的 action 或者 tween，则 repeat/repeatForever 函数会将传入的 action 或者 tween 作为作用对象
    .repeatForever()// 一直重复执行下去
    .call(() => { cc.log('This is a callback') })
    .parallel(// 同时执行两个 cc.tween
        cc.tween().to(1, { scale: 2 }),
        cc.tween().to(2, { position: cc.v2(100, 100) })
    )
    .start()

    插入其他的缓动
        let scale = cc.tween().to(1, { scale: 2 })
        let rotate = cc.tween().to(1, { rotation: 90})
        // 先缩放再旋转
        cc.tween(this.node).then(scale).then(rotate)
  



    支持缓动任意对象的任意属性
    let obj = { a: 0 }
    cc.tween(obj)
      .to(1, { a: 100 })
      .start()

    同时执行多个属性
    cc.tween(this.node)
    // 同时对 scale, position, rotation 三个属性缓动
    .to(1, { scale: 2, position: cc.v2(100, 100), rotation: 90 })
    .start()


Animation组件

当在 cc.Animation 注册了一个回调函数后，它会在播放一个动画时，对相应的 cc.AnimationState 注册这个回调，
在 cc.AnimationState 停止播放时，对 cc.AnimationState 取消注册这个回调。

playAni(nameStr, count, dt, isLoop){
    this.node.stopAllActions();
    this.node.getComponent(cc.Sprite).spriteFrame = this.bigImg.getSpriteFrame(nameStr + 0);
    let array = [];
    for(let i = 0; i < count; i++){
        array.push(cc.delayTime(dt));
        array.push(cc.callFunc(() =>{
            this.node.getComponent(cc.Sprite).spriteFrame = this.bigImg.getSpriteFrame(nameStr + i);
        }));
    }
    
    if(isLoop){
        this.node.runAction(cc.repeatForever(cc.sequence(array)));
    }
    else{
        this.node.runAction(cc.sequence(array));
    }
},
this.playAni("heroRun" + this.heroType + "_", 5, 0.06, true);

// 如果间隔超过1帧，那么需要建立N+1个关键帧，其中N为动画图片数量。
// 最后两帧的内容保持一致，确保最后一张图也能持续指定的时间间隔后才重新开始播放第一帧
    播放
        // 使用 play 接口播放一个动画时，如果还有其他的动画正在播放，则会先停止其他动画
        var anim = this.getComponent(cc.Animation);
        // 如果没有指定播放哪个动画，并且有设置 defaultClip 的话，则会播放 defaultClip 动画
        anim.play();
        // 指定播放 test 动画
        anim.play('test');
        // 指定从 1s 开始播放 test 动画
        anim.play('test', 1);
    同时播放多个
        // 播放第一个动画
        anim.playAdditive('position-anim');
        // 播放第二个动画
        anim.playAdditive('rotation-anim');
    暂停 恢复 停止
        // 指定暂停 test 动画
        anim.pause('test');
        // 暂停所有动画
        anim.pause();
        // 指定恢复 test 动画
        anim.resume('test');
        // 恢复所有动画
        anim.resume();
        // 指定停止 test 动画
        anim.stop('test');
        // 停止所有动画
        anim.stop();
    设置动画的当前时间
        //可以在任何时候对动画设置当前时间，但是动画不会立刻根据设置的时间进行状态的更改，
        //需要在下一个动画的 update 中才会根据这个时间重新计算播放状态
        // 设置 test 动画的当前播放时间为 1s
        anim.setCurrentTime(1, 'test');
        // 设置所有动画的当前播放时间为 1s
        anim.setCurrentTime(1);

    AnimationState
        //如果说 AnimationClip 作为动画数据的承载，
        //那么 AnimationState 则是 AnimationClip 在运行时的实例，
        //它将动画数据解析为方便程序中做计算的数值。
        //Animation 在播放一个 AnimationClip 的时候，会将 AnimationClip 解析成 AnimationState。 
        //Animation 的播放状态实际都是由 AnimationState 来计算的，包括动画是否循环，怎么循环，播放速度 等。
    获取 AnimationState
        // play 会返回关联的 AnimationState
        var animState = anim.play('test');
        // 或是直接获取
        var animState = anim.getAnimationState('test');
    获取动画信息
        // 获取动画关联的clip
        var clip = animState.clip;
        // 获取动画的名字
        var name = animState.name;
        // 获取动画的播放速度
        var speed = animState.speed;
        // 获取动画的播放总时长
        var duration = animState.duration;
        // 获取动画的播放时间
        var time = animState.time;
        // 获取动画的重复次数
        var repeatCount = animState.repeatCount;
        // 获取动画的循环模式
        var wrapMode = animState.wrapMode
        // 获取动画是否正在播放
        var playing = animState.isPlaying;
        // 获取动画是否已经暂停
        var paused = animState.isPaused;
        // 获取动画的帧率
        var frameRate = animState.frameRate;
    设置动画播放速度
        // 使动画播放速度加速
        animState.speed = 2;
        // 使动画播放速度减速
        animState.speed = 0.5;
    设置动画 循环模式 与 循环次数
        // 设置循环模式为 Normal
        animState.wrapMode = cc.WrapMode.Normal;
        // 设置循环模式为 Loop
        animState.wrapMode = cc.WrapMode.Loop;
        // 设置动画循环次数为2次
        animState.repeatCount = 2;
        // 设置动画循环次数为无限次
        animState.repeatCount = Infinity;
    动画编辑器中的帧事件
        //动画系统会搜索动画根节点中的所有组件，
        //如果组件中有实现动画事件中指定的函数的话，就会对它进行调用，并传入事件中填的参数
    注册动画回调
        var animation = this.node.getComponent(cc.Animation);
        // 注册
        animation.on('play',      this.onPlay,        this);
        animation.on('stop',      this.onStop,        this);
        animation.on('lastframe', this.onLastFrame,   this);
        animation.on('finished',  this.onFinished,    this);
        animation.on('pause',     this.onPause,       this);
        animation.on('resume',    this.onResume,      this);
        // 取消注册
        animation.off('play',      this.onPlay,        this);
        animation.off('stop',      this.onStop,        this);
        animation.off('lastframe', this.onLastFrame,   this);
        animation.off('finished',  this.onFinished,    this);
        animation.off('pause',     this.onPause,       this);
        animation.off('resume',    this.onResume,      this);
        // 对单个 cc.AnimationState 注册回调
        var anim1 = animation.getAnimationState('anim1');
        anim1.on('lastframe',    this.onLastFrame,      this);
        
    动态创建 Animation Clip
        var animation = this.node.getComponent(cc.Animation);
        // frames 这是一个 SpriteFrame 的数组.
        var clip = cc.AnimationClip.createWithSpriteFrames(frames, 17);
        clip.name = "anim_run";
        clip.wrapMode = cc.WrapMode.Loop;
        // 添加帧事件
        clip.events.push({
            frame: 1,               // 准确的时间，以秒为单位。这里表示将在动画播放到 1s 时触发事件
            func: "frameEvent",     // 回调函数名称
            params: [1, "hello"]    // 回调参数
        });
        animation.addClip(clip);
        animation.play('anim_run');


AnimationClip 
    properties
        duration Number 动画的持续时间。
        sample Number 动画的帧速率。
        speed Number 动画的播放速度。
        wrapMode WrapMode 动画的循环模式。
        curveData Object 曲线数据。
        events Object[] 事件数据。
        loaded Boolean 该资源是否已经成功加载
        name String 该对象的名称。
    method
        createWithSpriteFrames 使用一组序列帧图片来创建动画剪辑
DragonBone
    var armatureDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
    if(Config.language === "zh") {
        //animName 指定播放动画的名称, -1 为使用配置文件中的次数。 0 为无限循环播放。
        armatureDisplay.playAnimation("animName", -1);
    }
    else if(Config.language === "en") {
        armatureDisplay.playAnimation("Animation4", -1);
    }
    else {
        armatureDisplay.playAnimation("Animation3", -1);
    }
    //component : DragonBones
    Dragon Asset：骨骼动画文件。
    Dragon Atlas Asset：骨骼动画对应的拼合纹理图。
    Armature：骨架名称。
    Animation：动画名称。

    //动作混合
    就是为人物的不同骨骼赋予不同的动作，
    比如本例中，机器人一边走一边射击，下半身执行行走动作，而上半身同时进行着射击动作。
    这种上、下半身分离，各自播放不同的动作，同时又混合在一个人物身上的效果


