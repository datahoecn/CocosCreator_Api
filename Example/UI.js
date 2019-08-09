全局唯一变量或模块，方便别的模块直接调用
var Global = {
    uiManager: null,
    //全局变量
    APPID: "123456",
}

module.exports = cc.Global = Global;



//onLoad 函数把自己赋值给了全局的Global.uiManager
cc.Class({
    extends: cc.Component,
    properties: {
        ui1: cc.Node,
    },
    onLoad() {
        cc.Global.uiManager = this;
    },
    start() {
    },
    showUI1(title) {
        this.ui1.getComponent("UI1").initData(title);
        this.ui1.active = true;
    },
});
// 别的脚本，直接调用
handleBtn1() {
    cc.Global.uiManager.showUI1("MainUI 传入信息")
}





当整体需要只显示一个界面
UIBoards = cc.Enum({
    GAMING: 0,//游戏界面
    START: 1,//开始界面
    GAMEEND: 2,//结算界面
    SHOP: 3, //商城界面
});
properties: {
    boards: [cc.Node],
},
//界面切换函数
switchBoard(index) {
    this.boards.forEach(node => {
        node.active = false;
    });
    this._preBoardIndex = this._curBoardIndex;
    this.boards[index].active = true;
    this._curBoardIndex = index;
},
