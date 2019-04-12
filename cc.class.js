const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        btn_1: {
            default: null,
            type: cc.Button
        },
        btn_2: cc.Button,

        lb_1: {
            default: null,
            type: cc.Label
        },
        lb_2: cc.Label

        checkbox: {//Toggle
            default: null,
            type: cc.Toggle
        },

        radioButton: {//ToggleContainer
            default: [],
            type: cc.Toggle
        }
    },

    onBtnLeftClicked: function() {
        console.log('Button clicked!');
        this.lb_2.textKey = i18n.t("cases/02_ui/03_button/SimpleButton.js.1");
    },
    onBtnLeftClicked: function() {
        console.log('Left button clicked!');
        this.btn_1.interactable = false;//Interactable：是否响应交互，不勾选相当于禁用。
    },

});
