在游戏运行过程中加载图片创建精灵，或加载 MP3 文件播放音乐，
如果直接在主线程中进行，则会导致线程被 IO 操作、创建纹理等事情阻塞，从而造成卡顿。
这时我们可以借助多线程动态异步加载。Cocos 提供了专门处理动态加载的类 cc.loader

可以加载本地资源，也可以加载远程的网络资源

有动态加载的资源都需放在项目的 resources 目录下。
如果不存在，可手动创建该目录，并将资源放在其中。

加载单个文件
在本地，使用 loadRes 方法处理，如果在远程，则使用 load 方法处理
cc.loader.loadRes(url, type, progressCallback, completeCallback);
cc.loader.load(resources, progressCallback, completeCallback);
//example,第四个参数可以不写
var loadCallBack = this._loadCallBack.bind(this);
cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
_loadCallBack: function (err, res) {
    //如果err是 null 表示没问题，res是一个表
    if (err) {
        cc.log('Error url [' + err + ']');
        return;
    }
}

加载整个目录
//调用 loadResDir 加载 resources 下 test_assets 目录中的所有资源
//assets是一个表，里面是：图片是一个表，plist的cc_SpriteAtlas是一个表，cc_SpriteFrame是一个表
//urls是与assets对应的string
0: cc_Texture2D {_super: null, _name: "", _objFlags: 0
1: cc_SpriteAtlas {_name: "bigProp_1.plist", _objFlags: 
2: cc_SpriteFrame {_name: "17", _objFlags: 0, _native: ""

0: "image/bigProps/bigProp_1"
1: "image/bigProps/bigProp_1"
2: "image/bigProps/bigProp_1/17"
cc.loader.loadResDir("test_assets", (err, assets,urls) => {
    //加载完成或遇到错误进入以下代码
    //利用多线程加载目录，时间可能比较长，加载完成后，利用 isValid 判断当前节点是否已被销毁，如果销毁直接返回
    if (!this.isValid) {
        return;
    }
    //通过参数 assets 数组获取所有资源
    this._assets = assets;
    //遍历 assets 数组，创建 Label 显示相关文件名或文本文件内容
    for (var i = 0; i < assets.length; ++i) {
        var asset = assets[i];
        var info = asset.toString();
        if (!info) {
            if (asset instanceof cc.JsonAsset) {
                info = JSON.stringify(asset.json, null, 4);
            }
            else {
                info = info || asset.name || cc.js.getClassName(asset);
            }
        }
    }
});

loadResDir 方法有两种形态：
	cc.loader.loadResDir("test_assets", (err, assets) => { ... });//加载指定目录下的所有资源
	cc.loader.loadResDir("test_assets", cc.SpriteFrame, (err, assets) => { ... });
		//加载指定目录下的图片文件，它的第二个参数为格式对象，用于指定要加载的对象类型
