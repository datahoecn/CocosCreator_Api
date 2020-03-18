
cc.winSize  Size 为当前的游戏窗口的大小
//设计分辨率
let designSize = cc.view.getDesignResolutionSize();
//屏幕物理分辨率 也就是手机分辨率。
let frameSize = cc.view.getFrameSize();
 //获取视图的大小，以点为单位。 
let winSize = cc.director.getWinSize();
//获取运行场景的可见大小。
let visiSize = cc.director.getVisibleSize();
let winSizePixels = cc.director.getWinSizeInPixels();

winSize = visiSize = winSizePixels。一般使用 visiSize 即可
cc.visibleRect.width, cc.visibleRect.height

代码控制适配
let frameSize = cc.view.getFrameSize();
let bFitWidth = (frameSize.width / frameSize.height) < (750 / 1334)
cc.Canvas.instance.fitWidth = bFitWidth;
cc.Canvas.instance.fitHeight = !bFitWidth;

// 关闭调试信息
cc.debug.setDisplayStats(false);


Rect:
    properties:
        x       Number
        y       Number
        width   Number
        height  Number
        xMin    Number 矩形 x 轴上的最小值，等价于 rect.x。
        yMin    Number 矩形 y 轴上的最小值。
        xMax    Number 矩形 x 轴上的最大值。
        yMax    Number 矩形 y 轴上的最大值。
        center  Vec2 矩形的中心点。
        origin  Vec2 矩形的 x 和 y 坐标。
        size    Size 矩形的大小。
    method
        constructor     Rect类的构造函数。
        fromMinMax      根据指定 2 个坐标创建出一个矩形区域。
            cc.Rect.fromMinMax(cc.v2(10, 10), cc.v2(20, 20)); // Rect {x: 10, y: 10, width: 10, height: 10};
        clone           克隆一个新的 Rect。
            var a = new cc.Rect(0, 0, 10, 10);
            a.clone();// Rect {x: 0, y: 0, width: 10, height: 10}
        equals          是否等于指定的矩形。
            var a = new cc.Rect(0, 0, 10, 10);
            var b = new cc.Rect(0, 0, 10, 10);
            a.equals(b);// true;
        lerp            线性插值
        intersects      当前矩形与指定矩形是否相交。
            var a = new cc.Rect(0, 0, 10, 10);
            var b = new cc.Rect(0, 0, 20, 20);
            a.intersects(b);// true
        intersection    返回 2 个矩形重叠的部分。
            var a = new cc.Rect(0, 10, 20, 20);
            var b = new cc.Rect(0, 10, 10, 10);
            var intersection = new cc.Rect();
            a.intersection(intersection, b); // intersection {x: 0, y: 10, width: 10, height: 10};
        contains        当前矩形是否包含指定坐标点。
            var a = new cc.Rect(0, 0, 10, 10);
            var b = new cc.Vec2(0, 5);
            a.contains(b);// true
        containsRect    当前矩形是否包含指定矩形。
            var a = new cc.Rect(0, 0, 20, 20);
            var b = new cc.Rect(0, 0, 10, 10);
            a.containsRect(b);// true
        union           返回一个包含当前矩形和指定矩形的最小矩形。
            var a = new cc.Rect(0, 10, 20, 20);
            var b = new cc.Rect(0, 10, 10, 10);
            var union = new cc.Rect();
            a.union(union, b); // union {x: 0, y: 10, width: 20, height: 20};
        transformMat4   使用 mat4 对矩形进行矩阵转换。
        toString        转换为方便阅读的字符串
            var a = new cc.Rect(0, 0, 10, 10);
            a.toString();// "(0.00, 0.00, 10.00, 10.00)";
        set             从其它对象把所有属性复制到当前对象

this.node.getBoundingBoxToWorld().contains(event.getLocation())


cc.js.getClassName(obj); //param {Object|Function} return {String}
cc.js.isNumber(obj);
cc.js.isString(obj);


存储数据
    cc.sys.localStorage.setItem('gold', 100);
    复杂的对象数据
        userData = {
            name: 'Tracer',
            level: 1,
            gold: 100
        };
    //将对象序列化为 JSON 后保存
    cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
读取数据
    cc.sys.localStorage.getItem('gold');
    let tag = parseInt(cc.sys.localStorage.getItem("gunHeroType") || 0);
    var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
当我们不再需要一个存储条目时，可以通过下面的接口将其移除
    cc.sys.localStorage.removeItem(key)
对玩家存档进行加密
    // 选择一个适用的加密算法和第三方库，比如 encryptjs， 将下载好的库文件放入你的项目
    // https://www.npmjs.com/package/encryptjs
    var encrypt=require('encryptjs');
    var secretkey= 'open_sesame'; // 加密密钥
    var dataString = JSON.stringify(userData);
    var encrypted = encrypt.encrypt(dataString,secretkey,256);
    cc.sys.localStorage.setItem('userData', encrypted);
    读取
    var cipherText = cc.sys.localStorage.getItem('userData');
    var userData=JSON.parse(encrypt.decrypt(cipherText,secretkey,256));



cc.find("Canvas/player1/playerName")//找当前场景中的节点

cc.randomMinus1To1()//returns a random float between -1 and 1

跳转页面：
cc.sys.openURL('http://www.jianshu.com');

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

当前平台的功能
cc.sys.capabilities//Object

// 比如你用模拟器运行是原生版本，手机APP是原生版本。
// 对应的在浏览器里运行的是H5版本
// cc.sys.isNative 这个变量等同于 CC_JSB，通常情况下建议使用 CC_JSB
// 通过 CC_JSB 来判断是否为 native 环境（模拟器）
// 通过 cc.sys.isMobile 来判断是否为手机环境
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