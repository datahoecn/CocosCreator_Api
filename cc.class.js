const i18n = require('i18n');

cc.Class({
    extends: cc.Component,
    //参数
    properties: {
        btn_1: {
            default: null,
            type: cc.Button
        },
        btn_2: cc.Button,

        label: {
            default: null,
            type: cc.Label
        },

        checkbox: {//Toggle
            default: null,
            type: cc.Toggle
        },

        radioButton: {//ToggleContainer
            default: [],
            type: cc.Toggle
        }

        progressBar: {
            type: cc.ProgressBar,
            default: null
        },
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
    },

    //加载时调用该函数完成初始化
    onLoad: function () {
        this._pingpong = true;
    },

    update: function (dt) {
    },

    onBtnLeftClicked: function() {
        console.log('Button clicked!');
        this.label.textKey = i18n.t("cases/02_ui/03_button/SimpleButton.js.1");

        this.progressBar.progress = 0;

        this.btn_1.interactable = false;//Interactable：是否响应交互，不勾选相当于禁用。
    },
});
