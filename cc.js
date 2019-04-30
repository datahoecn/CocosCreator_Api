//定义一个枚举类型。
//用户可以把枚举值设为任意的整数，如果设为 -1，系统将会分配为上一个枚举值 + 1
var LState = cc.Enum({
    Init:0,
    CheckVersion:1,
})


跳转页面：
cc.sys.openURL('http://www.jianshu.com');

cc.director.loadScene("login");

是否本地平台
cc.sys.isNative//Boolean

指示系统是否是网络浏览器
cc.sys.isBrowser (Boolean)

指示系统是否是移动系统
cc.sys.isMobile (Boolean)

指示运行平台
cc.sys.platform (Number)

指示运行系统的当前语言
cc.sys.language (String)

指示运行的os名称
cc.sys.os (String)

指示正在运行的浏览器类型
cc.sys.browserType (String)

指示正在运行的浏览器版本
cc.sys.browserVersion//Number

指示整个游戏窗口的真实像素分辨率
cc.sys.windowPixelResolution (Number)

本地存储组件，类似于安卓轻量级存储。存储、拿取、删除使用方式：
cc.sys.localStorage (Object)

cc.sys.localStorage.setItem("bgmVolume",v);
var t = cc.sys.localStorage.getItem("bgmVolume");
cc.sys.localStorage.removeItem("wx_account");

当前平台的功能
cc.sys.capabilities//Object

if (cc.sys.isNative) {
    cc.log("本地平台");
    if (cc.sys.isMobile) {
        cc.log("本地移动平台");
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            cc.log("本地Android平台");
        } else if (cc.sys.os == cc.sys.OS_IOS) {
            cc.log("本地ios平台");
        }
     } else {
         cc.log("Web平台");
     }
}