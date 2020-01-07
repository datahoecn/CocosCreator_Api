// var audioMgr = require("audioMgr");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        cc.debug.setDisplayStats(false);
        // 读取本地存储
        this.readData();
    },

    start () {
        this.isOnce = false;
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

    loadFile() {
        cc.loader.loadRes("configs/Attack", function (err, jsonAsset) {
            Global.attack_json = jsonAsset.json;
        }.bind(this));
        cc.loader.loadRes("prefabs/guide", function (err, prefab) {
            var guide = cc.instantiate(prefab);
            this.node.addChild(guide);
        }.bind(this));
    },
});
