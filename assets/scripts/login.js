var audioMgr = require("audioMgr");
const max_width = 720;

cc.Class({
    extends: cc.Component,

    properties: {
        text_JsonAsset: cc.JsonAsset,
        speed_JsonAsset: cc.JsonAsset,
        attack_JsonAsset: cc.JsonAsset,
        hp_JsonAsset: cc.JsonAsset,
        gold_lb: cc.Label,
        cur_value:[cc.Label],
        need_gold: [cc.Label],
        sp_node: cc.Node,
        bgs: [cc.Node], // 背景图
        grounds: [cc.Node], // 背景图
        mute_node: cc.Node
    },

    onLoad() {
        cc.debug.setDisplayStats(false);

        // 读取本地存储
        this.readData();

        Global.text_json = this.text_JsonAsset.json;
        Global.speed_json = this.speed_JsonAsset.json;
        Global.attack_json = this.attack_JsonAsset.json;
        Global.hp_json = this.hp_JsonAsset.json;
    },

    start () {
        if(!Global.firstLogin){
            cc.loader.loadRes("prefabs/guide", function (err, prefab) {
                var guide = cc.instantiate(prefab);
                this.node.addChild(guide);
            }.bind(this));
        }

        this.mute_node.active = !Global.isPlay
        if(Global.isPlay){
            audioMgr.play_audio("audio/tank",true,"tank");
        }
        
        this.isOnce = false;
        // this.loadFile();
        this.gold_lb.string = Global.total_gold;
        this.update_speed(Global.speed_json[Global.speed_lv]);
        this.update_attack(Global.attack_json[Global.attack_lv]);
        this.update_life(Global.hp_json[Global.life_lv]);
        cc.director.preloadScene("main"); 
    },

    btn_start() {
        if(this.isOnce)return;
        this.isOnce = true;
        cc.director.loadScene("main"); 
        
    },
    readData() {
        Global.firstLogin = cc.sys.localStorage.getItem("firstLogin");
        
        Global.language = cc.sys.localStorage.getItem("language");
        if(!Global.language){
            if(cc.sys.language === cc.sys.LANGUAGE_CHINESE) {
                Global.language = "zh";
            }else {
                Global.language = "en";
            }
            cc.sys.localStorage.setItem("language", Global.language);
        }

        Global.level_num = cc.sys.localStorage.getItem("level_num");
        if(!Global.level_num){
            Global.level_num = 1;
            cc.sys.localStorage.setItem("level_num", 1);
        }
        Global.level_num -= 0;

        Global.total_gold = cc.sys.localStorage.getItem("total_gold");
        if(!Global.total_gold){
            Global.total_gold = 0;
            cc.sys.localStorage.setItem("total_gold", 0);
        }
        Global.total_gold -= 0;

        Global.speed_lv = cc.sys.localStorage.getItem("speed_lv");
        if(!Global.speed_lv){
            Global.speed_lv = 0;
            cc.sys.localStorage.setItem("speed_lv", 0);
        }
        Global.speed_lv -= 0;

        Global.attack_lv = cc.sys.localStorage.getItem("attack_lv");
        if(!Global.attack_lv){
            Global.attack_lv = 0;
            cc.sys.localStorage.setItem("attack_lv", 0);
        }
        Global.attack_lv -= 0;

        Global.life_lv = cc.sys.localStorage.getItem("life_lv");
        if(!Global.life_lv){
            Global.life_lv = 0;
            cc.sys.localStorage.setItem("life_lv", 0);
        }
        Global.life_lv -= 0;

        var isPlay = cc.sys.localStorage.getItem("isPlay");
        if(isPlay === "true"){
            Global.isPlay = true;
        }else if(isPlay === "false"){
            Global.isPlay = false;
        }else{
            Global.isPlay = true;
            cc.sys.localStorage.setItem("isPlay", true);
        }
    },

    // loadFile() {
    //     cc.loader.loadRes("configs/Attack", function (err, jsonAsset) {
    //         Global.attack_json = jsonAsset.json;
    //     }.bind(this));
    //     cc.loader.loadRes("configs/HP", function (err, jsonAsset) {
    //         Global.hp_json = jsonAsset.json;
    //     }.bind(this));
    //     cc.loader.loadRes("configs/Speed", function (err, jsonAsset) {
    //         Global.speed_json = jsonAsset.json;
    //     }.bind(this));
    // },

    btn_speed() {
        var gold_num = Global.speed_json[Global.speed_lv].Gold;
        if(gold_num <= Global.total_gold){
            Global.total_gold -= gold_num;
            cc.sys.localStorage.setItem("total_gold", Global.total_gold);
            this.gold_lb.string = Global.total_gold;

            Global.speed_lv++;
            cc.sys.localStorage.setItem("speed_lv", Global.speed_lv);
            this.update_speed(Global.speed_json[Global.speed_lv]);

            this.sp_node.x = -220;
            this.getComponent(cc.Animation).play("upgrade");
        }
        
    },
    btn_attack() {
        var gold_num = Global.attack_json[Global.attack_lv].Gold;
        if(gold_num <= Global.total_gold){
            Global.total_gold -= gold_num;
            cc.sys.localStorage.setItem("total_gold", Global.total_gold);
            this.gold_lb.string = Global.total_gold;

            Global.attack_lv++;
            cc.sys.localStorage.setItem("attack_lv", Global.attack_lv);
            this.update_attack(Global.attack_json[Global.attack_lv]);

            this.sp_node.x = 0;
            this.getComponent(cc.Animation).play("upgrade");
        }
    },
    btn_life() {
        var gold_num = Global.hp_json[Global.life_lv].Gold;
        if(gold_num <= Global.total_gold){
            Global.total_gold -= gold_num;
            cc.sys.localStorage.setItem("total_gold", Global.total_gold);
            this.gold_lb.string = Global.total_gold;

            Global.life_lv++;
            cc.sys.localStorage.setItem("life_lv", Global.life_lv);
            this.update_life(Global.hp_json[Global.life_lv]);

            this.sp_node.x = 220;
            this.getComponent(cc.Animation).play("upgrade");
        }
    },
    btn_audio() {
        this.mute_node.active = Global.isPlay
        if(Global.isPlay){
            audioMgr.pause_audio("tank");
        }
        Global.isPlay = !Global.isPlay;
        cc.sys.localStorage.setItem("isPlay", Global.isPlay);
        if(Global.isPlay){
            if(audioMgr.getAudio_id("tank")){
                audioMgr.resume_audio("tank");
            }else{
                audioMgr.play_audio("audio/tank",true,"tank");
            }
        }
    },
    update_speed(speed_obj) {
        this.cur_value[0].string = speed_obj.Speed + "/s";
        if(speed_obj.Gold >= 10000){
            this.need_gold[0].string = Math.floor(speed_obj.Gold / 1000) + "k";
        }else{
            this.need_gold[0].string = speed_obj.Gold;
        }
    },
    update_attack(attack_obj) {
        this.cur_value[1].string = attack_obj.Attack;
        if(attack_obj.Gold >= 10000){
            this.need_gold[1].string = Math.floor(attack_obj.Gold / 1000) + "k";
        }else{
            this.need_gold[1].string = attack_obj.Gold;
        }
    },

    update_life(life_obj) {
        this.cur_value[2].string = life_obj.HP;
        if(life_obj.Gold >= 10000){
            this.need_gold[2].string = Math.floor(life_obj.Gold / 1000) + "k";
        }else{
            this.need_gold[2].string = life_obj.Gold;
        }
    },

    update (dt) {
        // 背景图跑起来
        this.bgs.forEach((item) => {
            item.x -= 60 * dt;
            if(item.x <= -max_width) {
                item.x = max_width + max_width + item.x;
            }
        });

        this.grounds.forEach((item) => {
            item.x -= 160 * dt;
            if(item.x <= -max_width) {
                item.x = max_width + max_width + item.x;
            }
        });
    },
});
