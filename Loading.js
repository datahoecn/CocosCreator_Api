JSON 资源
        组件关联一个 JSON：
         // 声明
        npcList: {
            default: null,
            type: cc.JsonAsset,
        },

        // 读取
        var json = this.npcList.json;
        loadNpc(json);
        动态加载：
        cc.loader.loadRes('configs/npc', function (err, jsonAsset) {
            loadNpc(jsonAsset.json);
        });

文本资源
        如 .txt, .plist, .xml, .json, .yaml, .ini, .csv, .md，都会导入为 cc.TextAsset。
        组件关联一个 TextAsset：
        // 声明
        file: {
            default: null,
            type: cc.TextAsset,
        },

        // 读取
        var text = this.file.text;
        动态加载：
        cc.loader.loadRes(url, function (err, file) {
            cc.log(file.text);
        });

动态加载资源
    if (err) {
        cc.log('Error url [' + err + ']');
        return;
    }
加载 Prefab
    cc.loader.loadRes("test assets/prefab", function (err, prefab) {
        var newNode = cc.instantiate(prefab);
        cc.director.getScene().addChild(newNode);
    });
加载 AnimationClip
    var self = this;
    cc.loader.loadRes("test assets/anim", function (err, clip) {
        self.node.getComponent(cc.Animation).addClip(clip, "anim");
    });
加载 SpriteFrame
    //如果指定了类型参数，就会在路径下查找指定类型的资源
    //需要获取 “子资源”（例如获取 Texture2D 生成的 SpriteFrame），需要声明类型。
    var self = this;
    cc.loader.loadRes("test  /image", cc.SpriteFrame, function (err, spriteFrame) {
        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
加载图集中的 SpriteFrame
    // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
    // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
    cc.loader.loadRes("test assets/sheep", cc.SpriteAtlas, function (err, atlas) {
        var frame = atlas.getSpriteFrame('sheep_down_0');
        sprite.spriteFrame = frame;
    });

资源释放//releaseRes释放通过 loadRes 加载的资源
    cc.loader.releaseRes("test assets/image", cc.SpriteFrame);
    cc.loader.releaseRes("test assets/anim");
    //释放特定的 Asset 实例,通过资源对象自身来释放资源
    cc.loader.releaseAsset(spriteFrame);

资源批量加载
    // 加载 test assets 目录下所有资源
    cc.loader.loadResDir("test assets", function (err, assets) {
    });
    // 加载 test assets 目录下所有 SpriteFrame，并且获取它们的路径
    cc.loader.loadResDir("test assets", cc.SpriteFrame, function (err, assets, urls) {
    });
    // 如果在这个 prefab 中有一些和场景其他部分共享的资源，你不希望它们被释放，可以将这个资源从依赖列表中删除
    var deps = cc.loader.getDependsRecursively('prefabs/sample');
    var index = deps.indexOf(texture2d._uuid);
    if (index !== -1)
        deps.splice(index, 1);
    //通过 id（通常是资源 url）来释放一个资源或者一个资源数组
    cc.loader.release(deps);

cc.director.preloadScene("main", (completedCount, totalCount, item) => {            
    let p = completedCount/totalCount;
    this.progress_js.progress = p;
    this.progress_lb.string = parseInt(p * 100) + '%';
},() => {
    cc.director.loadScene("main"); 
});  



用cc.loader 加载资源是不会重复加载的，loader中是缓存的，如果之前加载过了之后是不会再加载，而是直接从缓存中调用。
可以用cc.loader.getRes(url)查看是否已经加载过了

在游戏运行过程中加载图片创建精灵，或加载 MP3 文件播放音乐，
如果直接在主线程中进行，则会导致线程被 IO 操作、创建纹理等事情阻塞，从而造成卡顿。
这时我们可以借助多线程动态异步加载。
Cocos 提供了专门处理动态加载的类 cc.loader

可以加载本地资源，也可以加载远程的网络资源

所有动态加载的资源都需放在项目的 resources 目录下
如果不存在，可手动创建该目录，并将资源放在其中。

加载单个文件
    //在本地，使用 loadRes 方法处理
    progressCallback: function (err, res,) {
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }
        this._curRes = res;//后面可以用来释放资源
    },
    completeCallback: function (err, res,) {
        console.log("======================")

    },
    var progressCallback = this.progressCallback.bind(this);
    var url = "test_assets/audio"
    Audio: "test_assets/audio",
    Txt: "test_assets/text",
    Texture: "test_assets/PurpleMonster",
    Font: "test_assets/font",
    Plist: "test_assets/atom.plist",
    SpriteFrame: "test_assets/image",
    Prefab: "test_assets/prefab",
    Animation: "test_assets/sprite-anim",
    Scene: "test_assets/scene",
    Spine: "spineboy/spineboy",
    CORS: "http://tools.itharbors.com/res/logo.png",
    cc.loader.loadRes(url, cc.SpriteFrame, progressCallback, completeCallback);

    this._curRes = res//加载的回调函数第二个参数
    cc.director.runScene(this._curRes.scene);
    cc.loader.releaseAsset(this._curRes);//通过资源对象自身来释放资源


如果在远程，则使用 load 方法处理
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
//assets 是一个表，里面是：图片是一个表，plist的cc_SpriteAtlas是一个表，cc_SpriteFrame是一个表
//urls 是与 assets 对应的string
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


