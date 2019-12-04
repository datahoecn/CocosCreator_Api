
cc.Class({
    extends: cc.Component,

    properties: {
        tid: ""
    },

    onEnable: function() {
        this.getComponent(cc.Label).string = Global.text_json[this.tid][Global.language];
    },
});