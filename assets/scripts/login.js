var audioMgr = require("audioMgr");

onLoad () {
    if (!Global.isOnceInit) {
        this.readData();
    }
},

start () {
    if (!Global.isOnceInit) {
        cc.debug.setDisplayStats(false);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, Global.keyBoard);
    }
    Global.isOnceInit = true;
    this.isOnce = false;
    cc.log(cc.winSize.width, cc.winSize.height)
},

btnGame() {
    if(this.isOnce)return;
    this.isOnce = true;
    audioMgr.play_audio("audios/click",false,"click");
    cc.director.preloadScene('main', function () {
        cc.director.loadScene('main');
    });
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

    var isVoice = cc.sys.localStorage.getItem("isVoice");
    if(isVoice === "true"){
        Global.isVoice = true;
    }else if(isVoice === "false"){
        Global.isVoice = false;
    }else{
        Global.isVoice = true;
        cc.sys.localStorage.setItem("isVoice", true);
    }

    Global.skinConfig = JSON.parse(cc.sys.localStorage.getItem("skinConfig"));
    if(Global.skinConfig == null || Global.skinConfig == undefined){
        Global.skinConfig = [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0];
        cc.sys.localStorage.setItem("skinConfig", JSON.stringify(Global.skinConfig));
    }
},

loadAsset() {
    cc.loader.loadRes("prefabs/diamond", function (err, prefab) {
        this.diamondPre = prefab;
        undefined
    }.bind(this));
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
