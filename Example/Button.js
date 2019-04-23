
//用节点的监听控制button的回调函数
cc.Class({
    extends: cc.Component,

    properties: {
        source: "",        //资源名
        safeTime: 5,       //安全触摸时间
    },

    on_click: function() {
        if(this.source === "") {
            cc.gl.audioMgr.playEffect("click.mp3");
        } else {
            cc.gl.audioMgr.playEffect(this.source);
        }
    },

    onLoad () {
        this.safeTimer = this.safeTime;
        this.button = this.getComponent(cc.Button);
        this.clickEvents = this.button.clickEvents;
        this.button.clickEvents = [];
	},

    start () {
        var callback = function(dt) {
            this.safeTimer -= dt;
            if(this.safeTimer <= 0) {
                this.button.clickEvents = this.clickEvents;
                this.safeTimer = this.safeTime;
                this.unschedule(callback, this);
            }
        }.bind(this)

        this.node.on("touchend", function(e) {
            this.on_click();
            if(this.safeTimer === this.safeTime) {
                this.schedule(callback, 0);
            }
        }.bind(this));
    },
});
