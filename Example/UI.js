全局唯一变量或模块，方便别的模块直接调用
var Global = {
    uiManager: null,
    //全局变量
    APPID: "123456",
}

module.exports = cc.Global = Global;

// 不用设为插件，可直接全局调用
window.Global = {
    uiManager: null,
    //全局变量
    APPID: "123456",
}
