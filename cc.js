
var size = cc.view.getDesignResolutionSize();

// this 是 object
this[name + "_prefab"];

资源属性的声明
    //cc.Vec2是类型，cc.v2只是一个创建二维向量简便写法
    pos  : cc.v2(10, 20),
    pos: {
        default: null,
        type: cc.Vec2
    }
    color: new cc.Color(255, 255, 255, 128)
    color: cc.color(0,0,0,255)          
    size : cc.size(0,0)  

    cc.Vec2
    cc.Color
    cc.Rect
    cc.Boolean
    cc.String
    cc.Float
    cc.Integer

    onLoad: function () {
        var spriteFrame = this.spriteFrame;
        var texture = this.texture;
        //通过 Texture rect rotated offset 和 originalSize 设置 SpriteFrame
        spriteFrame.setTexture(texture);
    }
    
CC_EDITOR   是否为编辑器环境
CC_PREVIEW  是否为预览环境
CC_JSB  是否为JSB环境
CC_DEBUG    是否为调试环境
CC_WECHATGAME   是否为微信小游戏环境
CC_WECHATGAME_SUB   是否为微信小游戏子域环境

//设计分辨率
let designSize=cc.view.getDesignResolutionSize();
//屏幕物理分辨率 也就是手机分辨率。
let frameSize=cc.view.getFrameSize();
 //获取视图的大小，以点为单位。 
let winSize=cc.director.getWinSize();
//获取运行场景的可见大小。
let visiSize=cc.director.getVisibleSize();
let winSizePixels=cc.director.getWinSizeInPixels();

winSize = visiSize = winSizePixels。一般使用visiSize即可

cc.winSize  Size 为当前的游戏窗口的大小

// 调试信息
cc.debug.setDisplayStats(false);

// instantiate node from prefab
var scene = cc.director.getScene();
var node = cc.instantiate(prefabAsset);
node.parent = scene;

var node = new cc.Node();
cc.log(cc.isValid(node));    // true
node.destroy();
cc.log(cc.isValid(node));    // true, still valid in this frame
// after a frame...
cc.log(cc.isValid(node));    // false, destroyed in the end of last frame

member: {
    default: [],
    type: cc.Integer// type: cc.Float  type: cc.Boolean  type: cc.String
}

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


cc.game.on(cc.game.EVENT_HIDE, (event)=>{
    cc.log("game onPause - StorageUtil");
    if(this.intervalId) 
    {
        clearTimeout(this.intervalId);
        this.intervalId = null;
    }
});
cc.game.on(cc.game.EVENT_SHOW, (event)=>{
    cc.log("game onResume - StorageUtil");
});

代码控制适配
let frameSize = cc.view.getFrameSize();
let bFitWidth = (frameSize.width / frameSize.height) < (750 / 1334)
cc.Canvas.instance.fitWidth = bFitWidth;
cc.Canvas.instance.fitHeight = !bFitWidth;

cc.js.getClassName(obj); //param {Object|Function} return {String}
cc.js.isNumber(obj);
cc.js.isString(obj);


cc.visibleRect.width, cc.visibleRect.height
术语
    CCClass：使用 cc.Class 声明的类。
    原型对象：调用 cc.Class 时传入的字面量参数。
    实例成员：包含“成员变量”和“成员方法”。
    静态成员：包含“静态变量”和“类方法”。
    运行时：项目脱离编辑器独立运行时，或者在模拟器和浏览器里预览的时候。
    序列化：解析内存中的对象，将它的信息编码为一个特殊的字符串，以便保存到硬盘上或传输到其它地方。

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
    cc.sys.localStorage.getItem('gold')
    var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
移除键值对
    cc.sys.localStorage.removeItem(key)
对玩家存档进行加密
    //选择一个适用的加密算法和第三方库，比如 encryptjs， 将下载好的库文件放入你的项目
    var encrypt=require('encryptjs');
    var secretkey= 'open_sesame'; // 加密密钥
    var dataString = JSON.stringify(userData);
    var encrypted = encrypt.encrypt(dataString,secretkey,256);
    cc.sys.localStorage.setItem('userData', encrypted);

    var cipherText = cc.sys.localStorage.getItem('userData');
    var userData=JSON.parse(encrypt.decrypt(cipherText,secretkey,256));



cc.find("Canvas/player1/playerName")//找当前场景中的节点

//定义一个枚举类型。
//用户可以把枚举值设为任意的整数，如果设为 -1，系统将会分配为上一个枚举值 + 1
var LState = cc.Enum({
    Init:0,
    CheckVersion:1,
})

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