// 体力
Global.startTime = cc.sys.localStorage.getItem('startTime');
if (Global.startTime == null || Global.startTime == undefined) {
    Global.startTime = Math.floor(Date.now() / 1000);
    cc.sys.localStorage.setItem('startTime', Global.startTime);
}
Global.startTime -= 0;

// 体力
Global.powerNum = cc.sys.localStorage.getItem('powerNum');
if (Global.powerNum == null || Global.powerNum == undefined) {
    Global.powerNum = MAX_POWER;
    cc.sys.localStorage.setItem('powerNum', MAX_POWER);
}
Global.powerNum -= 0;
if(Global.powerNum < MAX_POWER) {
    var curTime = Math.floor(Date.now() / 1000);
    var addNum = Math.floor((curTime - Global.startTime) / INTERVAL_TIME);
    if (addNum > 0) {
        Global.powerNum += addNum;
        if(Global.powerNum > MAX_POWER) {
            Global.powerNum = MAX_POWER;
        }
        cc.sys.localStorage.setItem('powerNum', Global.powerNum);
        Global.startTime += addNum * INTERVAL_TIME;
        cc.sys.localStorage.setItem('startTime', Global.startTime);
    }
}


updatePower() {
    cc.sys.localStorage.setItem('powerNum', ++Global.powerNum);
    this.powerNum_lab.string = Global.powerNum;
    
    Global.startTime = Math.floor(Date.now() / 1000);
    cc.sys.localStorage.setItem('startTime', Global.startTime);
},

start () {
    this.isCount = true;
    this.countTime = 0;

    if(Global.powerNum < MAX_POWER) {
        this.isCount = false;
        var curTime = Math.floor(Date.now() / 1000);
        this.subTime = INTERVAL_TIME - (curTime - Global.startTime);
        this.updateCountDown();
    }
},

update (dt) {
    if(this.isCount) return;
    this.countTime += dt;
    if (this.countTime > 1) {
        this.countTime -= 1;
        this.subTime -= 1;
        if (this.subTime < 1) {
            Global.home.updatePower();
            if(Global.powerNum < MAX_POWER) {
                this.subTime = INTERVAL_TIME;
                this.updateCountDown();
            } else {
                this.isCount = true;
                this.countDown.string = "";
            }
        } else {
            this.updateCountDown();
        }
    }
},

updateCountDown() {
    var minute = Math.floor(this.subTime / 60);
    var sec = this.subTime % 60;
    if(minute < 10) {
        minute = "0" + minute;
    }
    if(sec < 10) {
        sec = "0" + sec;
    }
    this.countDown.string = minute + " : " + sec;
},

startCountDown() {
    this.isCount = false;
    this.subTime = INTERVAL_TIME;
    this.updateCountDown();

    Global.startTime = Math.floor(Date.now() / 1000);
    cc.sys.localStorage.setItem('startTime', Global.startTime);
},


btn_start(e) {
    if(this.isStart)return;
    // 体力不足
    if(Global.powerNum < 1) {
        this.tip_lab.string = "体力不足";
        if(!this.tip_lab.node.active) {
            this.tip_lab.node.active = true;
            setTimeout(() => {
                this.tip_lab.node.active = false;
            }, 1000);
        }
        return;
    }
    this.isStart = true;
    // 开始记录时间
    if(Global.powerNum == MAX_POWER) {
        Global.main.startCountDown();
    }
    // 更新体力数
    cc.sys.localStorage.setItem('powerNum', --Global.powerNum);
    this.powerNum_lab.string = Global.powerNum;
},