
if (!cc.runtime) {
// runtime not support dragonbones.
// 定义一些变量值，表示动作混合时限定的动作组名称
var NORMAL_ANIMATION_GROUP = "normal";
var AIM_ANIMATION_GROUP = "aim";
var ATTACK_ANIMATION_GROUP = "attack";
//跳起时 Y 的初始速度
var JUMP_SPEED = -20;
//正常的移动速度
var NORMALIZE_MOVE_SPEED = 3.6;
//向前的移动速度，较快
var MAX_MOVE_SPEED_FRONT = NORMALIZE_MOVE_SPEED * 1.4;
//后退的移动速度，较慢
var MAX_MOVE_SPEED_BACK = NORMALIZE_MOVE_SPEED * 1.0;
//可更换的武器 Armature 名称列表
//右手
var WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
//左手
var WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
//地点高度 Y 值
var GROUND = -200;
//下落时重力加速度
var G = -0.6;

cc.Class({
    extends: cc.Component,
    editor: {
        requireComponent: dragonBones.ArmatureDisplay
    },

    properties: {
        touchHandler : {
            default: null,
            type: cc.Node
        },

        upButton: {
            default: null,
            type: cc.Node
        },

        downButton: {
            default: null,
            type: cc.Node
        },

        leftButton: {
            default: null,
            type: cc.Node
        },

        rightButton: {
            default: null,
            type: cc.Node
        },

        _bullets : [],
        _left : false,
        _right : false,
        _isJumpingA : false,
        _isJumpingB : false,
        _isSquating : false,
        _isAttackingA : false,
        _isAttackingB : false,
        _weaponRIndex : 0,
        _weaponLIndex : 0,
        _faceDir : 1,
        _aimDir : 0,
        _moveDir : 0,
        _aimRadian : 0,
        _speedX : 0,
        _speedY : 0,
        _armature : null,
        _armatureDisplay : null,
        _weaponR : null,
        _weaponL : null,
        _aimState : null,
        _walkState : null,
        _attackState : null,
        _target : cc.p(0, 0),
    },

    // use this for initialization
    // 加载设置，主要对骨架上相关节点进行设置，并进行事件监听
    onLoad: function () {
        //获取 DragonBones 骨架显示组件
        this._armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
        //获取 DragonBones 骨架组件
        this._armature = this._armatureDisplay.armature();
        //设置动作融入完成时的监听回调函数
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        //设置动作融出完成时的监听回调函数
        this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        //通过骨架获取卡槽（所谓卡槽，就是骨骼点绑定的身体部件），并设置在哪个动作中显示
        this._armature.getSlot('effects_1').displayController = NORMAL_ANIMATION_GROUP;
        this._armature.getSlot('effects_2').displayController = NORMAL_ANIMATION_GROUP;
        //取得左、右手武器绑定点上两个部件的子骨架
        this._weaponR = this._armature.getSlot('weapon_r').childArmature;
        this._weaponL = this._armature.getSlot('weapon_l').childArmature;
        //为两个子骨架增加每帧的监听回调函数
        this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        //更新动画
        this._updateAnimation();
        dragonBones.WorldClock.clock.add(this._armature);
        //设置相关触屏监听函数
        if (this.touchHandler) {
            // touch events
            //触屏事件响应，按下时，取得目标点瞄准并攻击
            this.touchHandler.on(cc.Node.EventType.TOUCH_START, event => {
                var touches = event.getTouches();
                var touchLoc = touches[0].getLocation();
                this.aim(touchLoc.x, touchLoc.y);
                this.attack(true);
            }, this);
            //松开后，停止攻击
            this.touchHandler.on(cc.Node.EventType.TOUCH_END, event => {
                this.attack(false);
            }, this);
            //触屏点移动，跟随目标点瞄准
            this.touchHandler.on(cc.Node.EventType.TOUCH_MOVE, event => {
                var touches = event.getTouches();
                var touchLoc = touches[0].getLocation();
                this.aim(touchLoc.x, touchLoc.y);
            }, this);
        }
        //如果按下向上按钮，播放跳起来动画
        if (this.upButton) {
            this.upButton.on(cc.Node.EventType.TOUCH_START, event => {
                this.jump();
            }, this);
        }
        //如果按下向下按钮，播放蹲下动画
        if (this.downButton) {
            this.downButton.on(cc.Node.EventType.TOUCH_START, event => {
                this.squat(true);
            }, this);
            this.downButton.on(cc.Node.EventType.TOUCH_END, event => {
                this.squat(false);
            }, this);
            this.downButton.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                this.squat(false);
            }, this);
        }
        //如果按下向左按钮，播放向左移动动画
        if (this.leftButton) {
            this.leftButton.on(cc.Node.EventType.TOUCH_START, event => {
                this._left = true;
                this._updateMove(-1);
            }, this);
            this.leftButton.on(cc.Node.EventType.TOUCH_END, event => {
                this._left = false;
                this._updateMove(-1);
            }, this);
            this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                this._left = false;
                this._updateMove(-1);
            }, this);
        }
        //如果按下向右按钮，播放向右移动动画
        if (this.rightButton) {
            this.rightButton.on(cc.Node.EventType.TOUCH_START, event => {
                this._right = true;
                this._updateMove(1);
            }, this);
            this.rightButton.on(cc.Node.EventType.TOUCH_END, event => {
                this._right = false;
                this._updateMove(1);
            }, this);
            this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL, event => {
                this._right = false;
                this._updateMove(1);
            }, this);
        }

        // keyboard events
        //设置按键被按下和抬起的监听函数
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: (keyCode, event) => {
                this._keyHandler(keyCode, true);
            },
            onKeyReleased: (keyCode, event) => {
                this._keyHandler(keyCode, false);
            },
        }, this.node);
    },
    //设置按键被按下和抬起时的处理函数
    _keyHandler: function(keyCode, isDown) {
        switch(keyCode) {
            case cc.KEY.a:
            case cc.KEY.left://如果按下 A 键或向左键，设置向左变量并向左移动
                this._left = isDown;
                this._updateMove(-1);
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this._right = isDown;//如果按下 D 键或向右键，设置向右变量并向右移动
                this._updateMove(1);
                break;
            case cc.KEY.w:
            case cc.KEY.up://如果按下 W 键或向上键，设置跳起
                if (isDown) {
                    this.jump();
                }
                break;
            case cc.KEY.s:
            case cc.KEY.down://如果按下 S 键或向上键，设置蹲下
                this.squat(isDown);
                break;
            case cc.KEY.q://如果按下 Q 键，切换右手武器
                if (isDown) {
                    this.switchWeaponR();
                }
                break;
            case cc.KEY.e://如果按下 E 键，切换左手武器
                if (isDown) {
                    this.switchWeaponL();
                }
                break;
            case cc.KEY.space://如果按下空格键，同时切换左右手武器
                if (isDown) {
                    this.switchWeaponR();
                    this.switchWeaponL();
                }
                break;
            default:
                return;
        }
    },
    //向指定方向移动
    _updateMove : function (dir) {
        if (this._left && this._right) {
            this.move(dir);
        } else if (this._left) {
            this.move(-1);
        } else if (this._right) {
            this.move(1);
        } else {
            this.move(0);
        }
    },
    //设置移动方向并更新移动位置
    move : function(dir) {
        if (this._moveDir === dir) {
            return;
        }

        this._moveDir = dir;
        this._updateAnimation();
    },
    //起跳
    jump : function () {
        //起跳未完时不允许起跳
        if (this._isJumpingA) {
            return;
        }
        //设置起跳状态变量
        this._isJumpingA = true;
        //进行动画切换，将当前动作混合到 jump_1
        this._armature.animation.fadeIn("jump_1", -1, -1, 0, NORMAL_ANIMATION_GROUP);
        this._walkState = null;
    },
    //蹲下
    squat : function(isSquating) {
        if (this._isSquating === isSquating) {
            return;
        }
        //设置蹲下状态变量
        this._isSquating = isSquating;
        //更新动画
        this._updateAnimation();
    },
    //攻击
    attack : function (isAttacking) {
        if (this._isAttackingA == isAttacking) {
            return;
        }
        //设置攻击状态变量
        this._isAttackingA = isAttacking;
    },
    //切换左手武器
    switchWeaponL : function() {
        //删除原本左手武器的帧监听回调函数
        this._weaponL.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        //切换到下一个武器索引
        this._weaponLIndex = (this._weaponLIndex + 1) % WEAPON_L_LIST.length;
        //取得下一个武器的名称
        var newWeaponName = WEAPON_L_LIST[this._weaponLIndex];
        //通过名称构建对应的子骨架
        this._weaponL = this._armatureDisplay.buildArmature(newWeaponName);
        //将子骨架设置为当前左手武器插槽上的子骨架
        this._armature.getSlot('weapon_l').childArmature = this._weaponL;
        //为左手武器增加帧监听回调函数
        this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
    },
    //切换右手武器
    switchWeaponR : function() {
        //删除原本右手武器的帧监听回调函数
        this._weaponR.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        //切换到下一个武器索引
        this._weaponRIndex = (this._weaponRIndex + 1) % WEAPON_R_LIST.length;
        //取得下一个武器名称
        var newWeaponName = WEAPON_R_LIST[this._weaponRIndex];
        //通过名称构建对应的子骨架
        this._weaponR = this._armatureDisplay.buildArmature(newWeaponName);
        //将子骨架设置为当前右手武器插槽上的子骨架
        this._armature.getSlot('weapon_r').childArmature = this._weaponR;
        //为右手武器增加帧监听回调函数
        this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
    },

    aim : function(x, y) {
        //瞄准，武器要调整方向
        if (this._aimDir === 0) {
            this._aimDir = 10;
        }
        //设置目标点为 x、y 相对父节点的锚点的偏移位置。
        this._target = this.node.parent.convertToNodeSpaceAR(cc.p(x, y));
    },
    //更新函数
    update : function (dt) {
        //更新位置
        this._updatePosition();
        //更新瞄准
        this._updateAim();
        //更新攻击
        this._updateAttack();
        //更新帧
        this._enterFrameHandler(dt);
    },
    //销毁
    onDisable : function() {
        // clean the bullets
        //遍历子弹数组，设置子弹无效
        for (var i = this._bullets.length - 1; i >= 0; i--)
        {
            var bullet = this._bullets[i];
            bullet.doClean();
        }
        //置空子弹数组
        this._bullets = [];

        if (this._armature) {
            // remove the _armature from world clock
            dragonBones.WorldClock.clock.remove(this._armature);
        }
    },
    //增加子弹
    addBullet : function(bullet) {
        this._bullets.push(bullet);
    },
    //更新帧处理
    _enterFrameHandler : function (dt) {
        // 遍历子弹数组，更新子弹，如果有子弹飞出屏幕，从数组中剔除掉
        for (var i = this._bullets.length - 1; i >= 0; i--)
        {
            var bullet = this._bullets[i];
            if (bullet.update())
            {
                this._bullets.splice(i, 1);
            }
        }
        dragonBones.WorldClock.clock.advanceTime(dt);
    },
    //混合动画切换状态时的回调函数
    _animationEventHandler: function(event) {
        //如果是混入动画
        if (event.type === dragonBones.EventObject.FADE_IN_COMPLETE) {
            //如果是其它动作切换到起跳，要设置跳跃状态变量、跳跃高度，随后将混合动画模式切换到 jump_2
            if (event.detail.animationState.name === "jump_1") {
                this._isJumpingB = true;
                this._speedY = -JUMP_SPEED;
                this._armature.animation.fadeIn("jump_2", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            } else if (event.detail.animationState.name === "jump_4") {
                this._updateAnimation();
            }
        }
        //如果是混出动画
        else if (event.type === dragonBones.EventObject.FADE_OUT_COMPLETE) {
            //如果由攻击状态切换到其它，要重置攻击状态变量
            if (event.detail.animationState.name === "attack_01") {
                this._isAttackingB = false;
                this._attackState = null;
            }
        }
    },
    //帧事件
    _frameEventHandler : function (event) {
        //如果是开火动作，计算当前枪口节点的位置
        if (event.detail.name === "onFire") {
            //获取骨骼节点相对于根节点的位置偏移
            var firePointBone = event.detail.armature.getBone("firePoint");
            var localPoint = cc.p(firePointBone.global.x, -firePointBone.global.y);

            var display = event.detail.armature.display;
            //通过相对位置点计算出世界坐标
            var globalPoint = display.convertToWorldSpace(localPoint);
            //将计算结果传给 _fire 函数并发射子弹
            this._fire(globalPoint);
        }
    },
    //开火
    _fire : function (firePoint) {
        //这里还加入了少许的随机干扰，模拟震动处理
        firePoint.x += Math.random() * 2 - 1;
        firePoint.y += Math.random() * 2 - 1;
        //提取子弹和射击火花的骨架
        var armature = this._armatureDisplay.buildArmature("bullet_01");
        var effect = this._armatureDisplay.buildArmature("fireEffect_01");
        var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
        //生成子弹
        var bullet = new DragonBullet();
        //对子弹进行初始化，从初始化函数中可以得出，子弹和射击火花也是骨骼动画
        bullet.init(this.node.parent._sgNode, armature, effect, radian + Math.random() * 0.02 - 0.01, 40, firePoint);
        //把子弹放入子弹数组
        this.addBullet(bullet);
    },
    //更新动作
    _updateAnimation : function() {
        //如果是起跳，直接返回
        if (this._isJumpingA) {
            return;
        }
        //如果是蹲下，以动作融合方式切换到 squat 动作
        if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            this._walkState = null;
            return;
        }
        //如果没有移动控制，以动作融合方式切换到 idle 动作
        if (this._moveDir === 0) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            this._walkState = null;
        } else {
            //如果有移动控制，且当前处于休闲状态，则以动作融合方式切换到行走
            if (!this._walkState) {
                this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            }
            //根据朝向设置动作播放速度
            if (this._moveDir * this._faceDir > 0) {
                this._walkState.timeScale = MAX_MOVE_SPEED_FRONT / NORMALIZE_MOVE_SPEED;
            } else {
                this._walkState.timeScale = -MAX_MOVE_SPEED_BACK / NORMALIZE_MOVE_SPEED;
            }
            //根据朝向设置 X 方向上的移动速度
            if (this._moveDir * this._faceDir > 0) {
                this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
            } else {
                this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
            }
        }
    },
    //更新位置
    _updatePosition : function() {
        //如果 X 方向的移动速度不为 0，更新 X 位置
        if (this._speedX !== 0) {
            this.node.x += this._speedX;
            var minX = -cc.visibleRect.width / 2;
            var maxX = cc.visibleRect.width / 2;
            if (this.node.x < minX) {
                this.node.x = minX;
            } else if (this.node.x > maxX) {
                this.node.x = maxX;
            }
        }
        //如果 Y 方向的移动位置不为 0，说明处于跳跃过程，计算重力对 Y 位置的影响
        if (this._speedY != 0) {
            if (this._speedY > 5 && this._speedY + G <= 5) {
                this._armature.animation.fadeIn("jump_3", -1, -1, 0, NORMAL_ANIMATION_GROUP);
            }

            this._speedY += G;

            this.node.y += this._speedY;
            //如果低于地面值，设置落地处理
            if (this.node.y < GROUND) {
                this.node.y = GROUND;
                this._isJumpingA = false;
                this._isJumpingB = false;
                this._speedY = 0;
                this._speedX = 0;
                this._armature.animation.fadeIn("jump_4", -1, -1, 0, NORMAL_ANIMATION_GROUP);
                if (this._isSquating || this._moveDir) {
                    this._updateAnimation();
                }
            }
        }
    },
    //更新瞄准
    _updateAim : function () {
        if (this._aimDir === 0) {
            return;
        }
        //根据目标点计算朝向
        this._faceDir = this._target.x > this.node.x ? 1 : -1;
        if (this.node.scaleX * this._faceDir < 0) {
            this.node.scaleX *= -1;
            if (this._moveDir) {
                this._updateAnimation();
            }
        }
        //计算胸部
        var aimOffsetY = this._armature.getBone("chest").global.y * this.node.scaleY;
        //计算枪要瞄准的斜率
        if (this._faceDir > 0) {
            this._aimRadian = Math.atan2(-(this._target.y - this.node.y + aimOffsetY), this._target.x - this.node.x);
        } else {
            this._aimRadian = Math.PI - Math.atan2(-(this._target.y - this.node.y + aimOffsetY), this._target.x - this.node.x);
            if (this._aimRadian > Math.PI) {
                this._aimRadian -= Math.PI * 2;
            }
        }
        //根据斜率判断是否更换方向
        let aimDir = 0;
        if (this._aimRadian > 0) {
            aimDir = -1;
        } else {
            aimDir = 1;
        }
        //如果有瞄准方向改变，切换动画
        if (this._aimDir != aimDir) {
            this._aimDir = aimDir;

            // Animation mixing.
            // 进行动作融合，并设置只影响 AIM_ANIMATION_GROUP 组的骨骼
            if (this._aimDir >= 0) {
                this._aimState = this._armature.animation.fadeIn(
                    "aimUp", 0, 1,
                    0, AIM_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup
                );
            } else {
                this._aimState = this._armature.animation.fadeIn(
                    "aimDown", 0, 1,
                    0, AIM_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup
                );
            }

            // 添加动画遮罩
            //_aimState.addBoneMask("pelvis");
        }
        //根据斜率设置站起和蹲下的混合权重，即斜率的绝对值越大，触屏瞄准点越靠上或越靠下，站起或蹲下动作占的混合权重越大
        this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2);

        //权重调整后需要更新骨架
        //_armature.invalidUpdate("pelvis"); // Only update bone mask.
        this._armature.invalidUpdate();
    },
    //更新攻击
    _updateAttack : function() {
        if (!this._isAttackingA || this._isAttackingB) {
            return;
        }
        //设置当前处于攻击状态
        this._isAttackingB = true;

        // Animation mixing.
        //使用动作融合切换到 attack_01 动作
        this._attackState = this._armature.animation.fadeIn(
            "attack_01", -1, -1,
            0, ATTACK_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup
        );
        //设置融出时间，并设置仅 pelvis 骨骼节点树进行混合
        this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
        this._attackState.addBoneMask("pelvis");
    }
});

//子弹类
var DragonBullet = cc.Class({
    name: 'DragonBullet',
    _speedX : 0,
    _speedY : 0,

    _armature : null,
    _armatureDisplay : null,
    _effect : null,
    //初始化子弹
    init : function (parentNode, armature, effect, radian, speed, position) {
        this._speedX = Math.cos(radian) * speed;
        this._speedY = -Math.sin(radian) * speed;
        //计算出射击位置
        var thePos = parentNode.convertToNodeSpace(position);

        this._armature = armature;
        this._armatureDisplay = this._armature.display;
        this._armatureDisplay.setPosition(thePos);
        this._armatureDisplay.rotation = radian * dragonBones.DragonBones.RADIAN_TO_ANGLE;
        //播放 idle 动作
        this._armature.animation.play("idle");
        //如果有射击效果动画，设置到合适位置并播放它
        if (effect) {
            this._effect = effect;
            var effectDisplay = this._effect.display;
            effectDisplay.rotation = radian * dragonBones.DragonBones.RADIAN_TO_ANGLE;
            effectDisplay.setPosition(thePos);
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;
            if (Math.random() < 0.5) {
                effectDisplay.scaleY *= -1;
            }

            this._effect.animation.play("idle");

            dragonBones.WorldClock.clock.add(this._effect);
            parentNode.addChild(effectDisplay);
        }

        dragonBones.WorldClock.clock.add(this._armature);
        parentNode.addChild(this._armatureDisplay);
    },
    //更新函数，如果飞出屏幕，释放并返回 true，如果在屏幕内则返回 false
    update : function() {
        //按着方向和速度飞行
        this._armatureDisplay.x += this._speedX;
        this._armatureDisplay.y += this._speedY;
        //如果离开屏幕就销毁
        var worldPos = this._armatureDisplay.parent.convertToWorldSpace(this._armatureDisplay.getPosition());
        if (
            worldPos.x < -100 || worldPos.x >= cc.visibleRect.width + 100 ||
            worldPos.y < -100 || worldPos.y >= cc.visibleRect.height + 100
        ) {
            //销毁
            this.doClean();
            return true;
        }

        return false;
    },
    //释放
    doClean : function() {
        dragonBones.WorldClock.clock.remove(this._armature);
        this._armatureDisplay.removeFromParent();
        this._armature.dispose();

        if (this._effect) {
            dragonBones.WorldClock.clock.remove(this._effect);
            this._effect.display.removeFromParent();
            this._effect.dispose();
        }
    }
});
} // end of !cc.runtime
