var audioMgr = require("audioMgr");
const priceArr = [0,0,0,0,0,0,200,300,400,500,600,800,1000,1500,2000];

const disW = 230;
const disH = 150;
// const SCALE_ARR = [1, 1.05, 0.97, 1.01, 1];
cc.Class({
    extends: cc.Component,

    properties: {
        textJsonAsset: cc.JsonAsset,
        gold_lab: cc.Label,
        voice_spr: cc.Sprite,
        voiceOn_spf: cc.SpriteFrame,
        voiceOff_spf: cc.SpriteFrame,
        homeNode: cc.Node,
        skinMgrNode: cc.Node,
        standbyNode: cc.Node,
        contentNode: cc.Node,
        tipNode: cc.Node,
        successNode: cc.Node,
        exit_lab: cc.Label,


    },

    onLoad () {
        if (!Global.isOnceInit) {
            Global.textJson = this.textJsonAsset.json;
            this.readData();
        }
        
    },

    start () {
        if (!Global.isOnceInit) {
            cc.debug.setDisplayStats(false);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, Global.keyBoard);
        }
        Global.exit_lab = this.exit_lab;
        
        this.successNode.width = cc.winSize.width;
        this.successNode.height = cc.winSize.height;
        this.selectNode = this.contentNode.getChildByName("bg_7");
        this.buyNode = this.contentNode.getChildByName("btn_buy");
        this.buyNode.zIndex = 100;

        this.isOnce = false;
        this.isloader = false;
        this.loadRes();
        this.updateUI();
        cc.log(cc.winSize);

        Global.isOnceInit = true;
    },

    update (dt) {
        // this.countTime += dt;
        // if(this.countTime > 0.2) {
        //     this.countTime -= 0.2;
        //     this.standbyNode.scaleY = SCALE_ARR[this.standbyIndex];
        //     this.standbyIndex = ++this.standbyIndex % 5;
        // }
        
    },

    btnGame() {
        if(this.isOnce)return;
        audioMgr.play_audio("audios/click",false,"click");
        this.isOnce = true;
        Global.isOver = false;
        cc.director.preloadScene('main', function () {
            cc.director.loadScene('main');
        });
    },

    btnSkin() {
        if(!Global.skinAtlas) return;
        audioMgr.play_audio("audios/click",false,"click");

        this.standbyNode.y = 150;
        // 动画
        this.standbyNode.x -= 300;
        this.standbyNode.y += 200;
        this.standbyNode.scale = 0.1;
        // this.standbyNode.getComponent(cc.Animation).stop("standby");
        var act_0 = cc.scaleTo(0.8, 1);
        var act_1 = cc.jumpBy(0.8, cc.v2(300, -200), 150, 2);
        var act_2 = cc.spawn(act_0, act_1);
        this.standbyNode.runAction(act_2);

        this.homeNode.active = false;
        this.skinMgrNode.active = true;
        this.skinMgrNode.getChildByName("title").active = false;

        this.buySkinNum = Global.curSkinNum;

        this.buyNode.active = false;
        var posX = Global.curSkinNum % 3 * disW - disW;
        var posY = -Math.floor(Global.curSkinNum / 3) * disH - disH / 2;
        this.selectNode.x = posX;
        this.selectNode.y = posY;

        if(this.isloader)return;
        this.isloader = true;
        cc.loader.loadRes("prefabs/skin", function (err, prefab) {
            for (let index = 0; index < 15; index++) {
                var newNode = cc.instantiate(prefab);
                newNode.x = index % 3 * disW - disW;
                newNode.y = -Math.floor(index / 3) * disH - disH / 2;
                newNode.name = "skin_" + index;

                let event = new cc.Component.EventHandler();
                event.target = this.node;
                event.component = "login";
                event.handler = "btnClick";
                event.customEventData = index;
                let button = newNode.getComponent(cc.Button);
                button.clickEvents[0] = event;

                if (Global.skinConfig[index] == 0) {
                    let goldBgNode = newNode.getChildByName("goldBg");
                    goldBgNode.active = true;
                    let numNode = goldBgNode.getChildByName("num");
                    if (Global.goldNum < priceArr[index]) {
                        numNode.color = new cc.Color(220, 70, 100);
                    }
                    numNode.getComponent(cc.Label).string = priceArr[index];
                }

                let sp_spr = newNode.getChildByName("sp").getComponent(cc.Sprite);
                let name = "sp_" + index;
                sp_spr.spriteFrame = Global.skinAtlas._spriteFrames[name];
                let left_spr = sp_spr.node.getChildByName("leftHand").getComponent(cc.Sprite);
                left_spr.spriteFrame = Global.skinAtlas._spriteFrames[Global.handNames[index]];
                let right_spr = sp_spr.node.getChildByName("rightHand").getComponent(cc.Sprite);
                right_spr.spriteFrame = Global.skinAtlas._spriteFrames[Global.handNames[index]];

                this.contentNode.addChild(newNode);
            }
            
            
            // this.buyNode.x = posX;
            // this.buyNode.y = posY;

            // if(Global.skinConfig[Global.curSkinNum] == 0) {
            //     this.buyNode.active = true;
            // } else {
            //     this.buyNode.active = false;
            // }

        }.bind(this));
    },

    btnClick(e, index) {
        // this.buySkinNum
        if(index == this.buySkinNum)return;
        audioMgr.play_audio("audios/click",false,"click");

        var posX = index % 3 * disW - disW;
        var posY = -Math.floor(index / 3) * disH - disH / 2;
        this.selectNode.x = posX;
        this.selectNode.y = posY;
        if(Global.skinConfig[index] == 0) {
            this.buyNode.active = true;
            this.buyNode.x = posX;
            this.buyNode.y = posY;
            this.skinMgrNode.getChildByName("title").active = true;
        } else {
            this.buyNode.active = false;
            this.skinMgrNode.getChildByName("title").active = false;
        }
        
        this.buySkinNum = index;
        
        if (Global.skinConfig[index] == 1) {
            Global.curSkinNum = index;
            cc.sys.localStorage.setItem("curSkinNum", Global.curSkinNum);
        }

        this.updateStandby(index);

        // 动画
        this.standbyNode.x -= 300;
        this.standbyNode.y += 200;
        this.standbyNode.scale = 0.1;
        // this.standbyNode.getComponent(cc.Animation).stop("standby");
        var act_0 = cc.scaleTo(0.8, 1);
        var act_1 = cc.jumpBy(0.8, cc.v2(300, -200), 150, 2);
        var act_2 = cc.spawn(act_0, act_1);
        this.standbyNode.runAction(act_2);
    },

    updateStandby(index) {
        let name = "sp_" + index;
        this.display_spr.spriteFrame = Global.skinAtlas._spriteFrames[name];
        name = Global.handNames[index];;
        this.leftHand_spr.spriteFrame = Global.skinAtlas._spriteFrames[name];
        this.rightHand_spr.spriteFrame = Global.skinAtlas._spriteFrames[name];
        if(index + 1 == Global.skinNum) {
            name = "hammer_10";
        } else {
            name = "hammer_0";
        }
        this.hammer_spr.spriteFrame = Global.skinAtlas._spriteFrames[name];
    },


    btnBuy() {
        if (Global.goldNum < priceArr[this.buySkinNum]) {
            audioMgr.play_audio("audios/click",false,"click");
            if(!this.tipNode.active) {
                this.tipNode.y = -95;
                this.tipNode.active = true;
                this.tipNode.getComponent(cc.Label).string = Global.textJson["TID_HOMEUI_10"][Global.lang];
                setTimeout(() => {
                    if(this.tipNode) {
                        this.tipNode.active = false;
                    }
                }, 1000);
            }
        } else {
            audioMgr.play_audio("audios/clap",false,"clap");
            Global.goldNum -= priceArr[this.buySkinNum];
            cc.sys.localStorage.setItem("goldNum", Global.goldNum);

            Global.skinConfig[this.buySkinNum] = 1;
            cc.sys.localStorage.setItem("skinConfig", JSON.stringify(Global.skinConfig));

            Global.curSkinNum = this.buySkinNum;
            cc.sys.localStorage.setItem("curSkinNum", Global.curSkinNum);

            this.gold_lab.string = Global.goldNum;

            this.buyNode.active = false;
            for (let index = 0; index < 15; index++) {
                let item = this.contentNode.getChildByName("skin_" + index);
                let goldBgNode = item.getChildByName("goldBg");
                if (Global.skinConfig[index] == 0) {
                    goldBgNode.active = true;
                    let numNode = goldBgNode.getChildByName("num");
                    if (Global.goldNum < priceArr[index]) {
                        numNode.color = new cc.Color(220, 70, 100);
                    } else {
                        numNode.color = new cc.Color(255, 255, 255);
                    }
                    numNode.getComponent(cc.Label).string = priceArr[index];
                } else {
                    goldBgNode.active = false;
                }
            }
            this.skinMgrNode.getChildByName("title").active = false;

            this.successNode.active = true;
            this.tipNode.y = 500;
            this.tipNode.active = true;
            this.tipNode.getComponent(cc.Label).string = Global.textJson["TID_HOMEUI_11"][Global.lang];
            setTimeout(() => {
                if (this.tipNode) {
                    this.tipNode.active = false;
                    this.successNode.active = false;
                }
            }, 2000);

             // 动画
            var pos_y = this.standbyNode.y;
            this.standbyNode.y = 1000;
            var act_0 = cc.moveTo(0.6, cc.v2(0, pos_y)).easing(cc.easeBackOut());
            this.standbyNode.runAction(act_0);
        }
    },

    btnVoice() {
        audioMgr.play_audio("audios/click",false,"click");
        if(Global.isPlay) {
            this.voice_spr.spriteFrame = this.voiceOff_spf;
            audioMgr.pause_audio("main");
        } else {
            this.voice_spr.spriteFrame = this.voiceOn_spf;
            audioMgr.resume_audio("main", "audios/main", true);
        }
        Global.isPlay = !Global.isPlay;
        cc.sys.localStorage.setItem("isPlay", Global.isPlay);
    },

    btnClose() {
        audioMgr.play_audio("audios/click",false,"click");
        this.homeNode.active = true;
        this.skinMgrNode.active = false;
        this.standbyNode.stopAllActions();
        this.standbyNode.scale = 1;
        this.standbyNode.x = 0;
        this.standbyNode.y = -120;

        this.updateStandby(Global.curSkinNum);
    },

    updateUI() {
        this.homeNode.getChildByName("playerName").getComponent(cc.EditBox).string = Global.playerName;
        this.gold_lab.string = Global.goldNum;
        if(Global.isPlay) {
            this.voice_spr.spriteFrame = this.voiceOn_spf;
        } else {
            this.voice_spr.spriteFrame = this.voiceOff_spf;
        }
    },

    readData() {
        Global.lang = cc.sys.localStorage.getItem("lang");
        if(!Global.lang){
            if(cc.sys.language === cc.sys.LANGUAGE_CHINESE) {
                Global.lang = "zh";
            }else {
                Global.lang = "en";
            }
            cc.sys.localStorage.setItem("lang", Global.lang);
        }

        Global.goldNum = cc.sys.localStorage.getItem("goldNum");
        if(!Global.goldNum){
            Global.goldNum = 0;
            cc.sys.localStorage.setItem("goldNum", 0);
        }
        Global.goldNum -= 0;

        Global.playerName = cc.sys.localStorage.getItem("playerName");
        if(!Global.playerName){
            Global.playerName = "player";
            cc.sys.localStorage.setItem("playerName", "player");
        }
        cc.log("玩家名字：" + Global.playerName);

        Global.gameCount = cc.sys.localStorage.getItem("gameCount");
        if(!Global.gameCount){
            Global.gameCount = 0;
            cc.sys.localStorage.setItem("gameCount", 0);
        }
        Global.gameCount -= 0;

        var isPlay = cc.sys.localStorage.getItem("isPlay");
        if(isPlay === "true"){
            Global.isPlay = true;
        }else if(isPlay === "false"){
            Global.isPlay = false;
        }else{
            Global.isPlay = true;
            cc.sys.localStorage.setItem("isPlay", true);
        }

        Global.skinConfig = JSON.parse(cc.sys.localStorage.getItem("skinConfig"));
        if(Global.skinConfig == null){
            Global.skinConfig = [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0];
            cc.sys.localStorage.setItem("skinConfig", JSON.stringify(Global.skinConfig));
        }

        Global.curSkinNum = cc.sys.localStorage.getItem("curSkinNum");
        if(!Global.curSkinNum){
            Global.curSkinNum = 0;
            cc.sys.localStorage.setItem("curSkinNum", 0);
        }
        Global.curSkinNum -= 0;
        this.buySkinNum = Global.curSkinNum;
    },

    loadRes() {
        this.display_spr = this.standbyNode.getChildByName("sp").getComponent(cc.Sprite)
        var hammerNode = this.standbyNode.getChildByName("hammer");
        this.hammer_spr = hammerNode.getComponent(cc.Sprite);
        this.leftHand_spr = hammerNode.getChildByName("leftHand").getComponent(cc.Sprite);
        this.rightHand_spr = hammerNode.getChildByName("rightHand").getComponent(cc.Sprite);

        if (!Global.isOnceInit) {
            audioMgr.play_audio("audios/main",true,"main");
            cc.loader.loadRes("icon/skin", cc.SpriteAtlas, function (err, atlas) {
                Global.skinAtlas = atlas;
                this.updateStandby(Global.curSkinNum);
            }.bind(this));

            var pathName;
            if(Global.lang == "en") {
                pathName = "icon/iconEn";
            } else {
                pathName = "icon/iconZh";
            }
            cc.loader.loadRes(pathName, cc.SpriteAtlas, function (err, atlas) {
                Global.iconLang = atlas;
                this.homeNode.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = Global.iconLang._spriteFrames["gameName"];
            }.bind(this));
        } else {
            this.updateStandby(Global.curSkinNum);
            this.homeNode.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = Global.iconLang._spriteFrames["gameName"];
        }
    },

    editEnded(editBox, num) {
        var newName = editBox.string;
        if(newName.length == 0) {
            cc.log("什么也没输入");
            editBox.string = Global.playerName;
            return;
        }
        if(newName[0] == " ") {
            cc.log("名字首字母不能为空");
            editBox.string = Global.playerName;
            return;
        }
        newName = gblen(newName);
        editBox.string = newName;
        if(newName == Global.playerName) return;
        cc.log("玩家新名字：" + newName);
        Global.playerName = newName;
        cc.sys.localStorage.setItem("playerName", Global.playerName);
    }

});

var gblen = function(str) {    
    var len = 0;
    var newStr = "";
    for (var i=0; i< str.length; i++) {    
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {    
             len += 2;    
         } else {    
             len ++;    
         }
         newStr += str[i];
         if(len >= 12){
             return newStr;
         }
     } 
     return newStr;  
}   
