//导入 i18n 的脚本
//i18n 是一个多语言翻译字典，通过 textKey 查询相应语言的翻译结果
const i18n = require('i18n');
cc.Class({
    //创建了派生于 Cocos 的 Label 类
    extends: cc.Label,
    properties: {
        //增加查询用的键值字符串参数
        textKey: {
            //默认文字
            default: 'TEXT_KEY',
            //是否支持多行
            multiline: true,
            //鼠标悬浮在属性框上时显示的提示文字
            tooltip: 'Enter i18n key here',
            notify: function () {
                //更新时，查询字典获取本地字符串参数中 Label 的 String 值
                this.string = this.localizedString;
            }
        },
        //增加本地字符串参数
        localizedString: {
            //是否重载数据的 Get 和 Set
            override: true,
            //鼠标悬浮在属性框上时显示的提示文字
            tooltip: 'Here shows the localized string of Text Key',
            //获取文本字符串的处理函数
            get: function () {
                return i18n.t(this.textKey);
            },
            //设置文本字符串的处理函数
            set: function (value) {
                this.textKey = value;
                if (CC_EDITOR) {
                    cc.warn('Please set label text key in Text Key property.');
                }
            }
        },
    },

    //组件被加载时调用的函数，一般在这里进行初始化处理。
    //onLoad 函数则通过 textKey 这个文本键值从 i18n 中取得了相应的字符串
    onLoad () {
        //如果已为当前本地字符串参数设置了值，将查询字典获取本地字符串参数中 Label 的 String 值
        if (this.localizedString) {
            this.string = this.localizedString;
        }
    }
});