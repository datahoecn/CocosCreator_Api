var audioMgr = require("audioMgr");
cc.Class({
    extends: cc.Component,

    properties: {
        ani_1: [cc.Animation], // 爆炸动画
        par_1:[cc.ParticleSystem], // 爆炸粒子
        camera: cc.Animation,
        gold_node: cc.Node, // 金币节点
        attack_pars: [cc.ParticleSystem] // 击中粒子
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        Global.aniMgr = this;
        this.init();

    },

    init() {
        this.gold_num = 0; // 获得的金币数
        this.gold_node.active = false;
        // this.countTime = 0;

        this.par_index = 0; // 用于击中粒子
        this.ani_1_index = 0; // 用于爆炸动画和爆炸粒子
    },
    playPar(name, pos) {
        if(name == "attack"){
            this.par_index = this.par_index % 3;
            this.attack_pars[this.par_index].node.position = pos;
            this.attack_pars[this.par_index].resetSystem();
            this.par_index++;
        }
        
    },
    playAni(name, pos) {
        switch (name) {
            // case "box_explode":
            //     this.ani_1_index = this.ani_1_index % 3;
            //     this.ani_1[this.ani_1_index].node.position = pos;
            //     this.par_1[this.ani_1_index].node.position = pos;
            //     this.par_1[this.ani_1_index].resetSystem();
            //     var aniState = this.ani_1[this.ani_1_index].play("box_explode");
            //     //this.countTime = aniState.duration;
            //     this.ani_1_index++;
            //     break;
            // 屏幕震屏
            case "camera":
                this.camera.play("camera");
                break;
            // 爆炸效果
            case "ani_1":
                this.ani_1_index = this.ani_1_index % 3;
                this.ani_1[this.ani_1_index].node.position = pos;
                this.par_1[this.ani_1_index].node.position = pos;
                this.par_1[this.ani_1_index].resetSystem();
                this.ani_1[this.ani_1_index].play("box_explode");
                this.ani_1_index++;
                break;
            case "ani_2":
                this.ani_1_index = this.ani_1_index % 3;
                pos.x -= 30;
                this.ani_1[this.ani_1_index].node.position = pos;
                pos.x -= 30;
                this.par_1[this.ani_1_index].node.position = pos;
                this.par_1[this.ani_1_index].resetSystem();
                this.ani_1[this.ani_1_index].play("box_explode");
                this.ani_1_index++;
                break;
            // 金币动画
            case "gold_ani":
                this.playGoldAction(pos);
                break;
            default:
                break;
        }
    },

    playGoldAction(pos) {
        audioMgr.play_audio("audio/collect",false,"collect");
        this.gold_node.stopAllActions();
        this.gold_node.position = pos;
        this.gold_node.active = true;
        //this.gold_node.scale = 1;
        var new_pos_1 = cc.v2(-280, 520);
        var new_pos_2 = cc.v2(pos.x,520);
        var bezier = [pos, new_pos_2, new_pos_1];
        var bezierTo = cc.bezierTo(0.8, bezier);
        // var actionTo = cc.scaleTo(1, 0.8);
        this.gold_node.runAction(cc.sequence(bezierTo,cc.callFunc(() => {
            this.gold_node.active = false;
            Global.Canvas.upgradeGold(this.gold_num);
        })));
    },
    // update (dt) {
    //     if(Global.isOver)return;
    //     // if(this.countTime > 0){
    //     //     this.countTime -= dt;
    //     //     this.explode[this.ani_1_index].node.x -= Global.move_x * dt;
    //     // }
        
    //     // if(this.isMove) {
    //     //     this.box_explode.node.x -= Global.move_x;
    //     //     if(this.box_explode.node.x)
    //     // }
    // },
});
