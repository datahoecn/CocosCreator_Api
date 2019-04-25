const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        showWindow: cc.Node,
        loadAnimTestPrefab: cc.Prefab,
        loadTips: cc.Label,
        loadList: {
            default: [],
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        // cur load Target
        this._curType = "";
        this._lastType = "";
        this._curRes = null;
        this._btnLabel = null;
        this._audioSource = null;
        this._isLoading = false;
        //D:\Documents\NewProject_1\assets\resources\test_assets
        this._urls = {
            Audio: "test_assets/audio",//audio.mp3
            Txt: "test_assets/text",//text.txt
            Texture: "test_assets/PurpleMonster",//PurpleMonster.png
            Font: "test_assets/font",//font.fnt
            Plist: "test_assets/atom.plist",//atom.plist 有无后缀都可
            SpriteFrame: "test_assets/image",//image.png
            Prefab: "test_assets/prefab",//prefab.prefab
            Animation: "test_assets/sprite-anim",//sprite-anim.anim
            Scene: "test_assets/scene",//scene.fire
            Spine: "spineboy/spineboy",//spineboy.json
            CORS: "http://tools.itharbors.com/res/logo.png",//必须有后缀
        };
        // registered event
        this._onRegisteredEvent();
    },

    _onRegisteredEvent: function () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }
    },

    _onClick: function (event) {
        if (this._isLoading) {
            return;
        }

        this._onClear();

        this._curType = event.target.name.split('_')[1];
        if (this._lastType !== "" && this._curType === this._lastType) {
            this._onShowResClick(event);
            return;
        }

        if (this._btnLabel) {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.1") + this._lastType;
        }

        this._lastType = this._curType;

        this._btnLabel = event.target.getChildByName("Label").getComponent("cc.Label");

        this.loadTips.textKey = this._curType + " Loading....";
        this._isLoading = true;

        this._load();
    },

    _load: function () {
        var url = this._urls[this._curType];
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
                break;
            case 'Spine':
                // specify the type to avoid the duplicated name from spine atlas
                cc.loader.loadRes(url, sp.SkeletonData, loadCallBack);
                break;
            case 'Font':
                cc.loader.loadRes(url, cc.Font, loadCallBack);
                break;
            case 'Plist':
                cc.loader.loadRes(url, cc.ParticleAsset, loadCallBack);
                break;
            case 'Animation':
            case 'Prefab':
            case 'Scene':
            case 'Texture':
            case 'Txt':
            case 'Audio':
                cc.loader.loadRes(url, loadCallBack);
                break;
            case 'CORS':
                cc.loader.load(url, loadCallBack);
                this.loadTips.textKey = "CORS image should report texImage2D error under WebGL and works ok under Canvas"
                break;
            default:
                cc.loader.load(url, loadCallBack);
                break;
        }
    },

    _loadCallBack: function (err, res) {
        this._isLoading = false;
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }
        this._curRes = res;
        if (this._curType === "Audio") {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.2");
        }
        else {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.3");
        }
        this._btnLabel.textKey += this._curType;
        this.loadTips.textKey = this._curType + " Loaded Successfully!";
    },

    _onClear: function () {
        this.showWindow.removeAllChildren(true);
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
            this._audioSource.stop();
        }
    },

    _onShowResClick: function (event) {
        if (this._curType === "Scene") {
            cc.director.runScene(this._curRes.scene);
            cc.loader.releaseAsset(this._curRes);
            this._curRes = null;

            return;
        }
        this._createNode(this._curType, this._curRes);
    },

    _createNode: function (type, res) {
        this.loadTips.textKey = "";
        var node = new cc.Node("New " + type);
        node.setPosition(0, 0);
        var component = null;
        switch (this._curType) {
            case "SpriteFrame":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = res;
                break;
            case "Texture":
            case "CORS":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = new cc.SpriteFrame(res);
                break;
            case "Audio":
                component = node.addComponent(cc.AudioSource);
                component.clip = res;
                component.play();
                this._audioSource = component;
                this.loadTips.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.4");
                break;
            case "Txt":
                component = node.addComponent(cc.Label);
                component.lineHeight = 40;
                component.string = res;
                break;
            case "Font":
                component = node.addComponent(cc.Label);
                component.font = res;
                component.lineHeight = 40;
                component.string = "This is BitmapFont!";
                break;
            case "Plist":
                component = node.addComponent(cc.ParticleSystem);
                component.file = res;
                component.resetSystem();
                break;
            case "Prefab":
                var prefab = cc.instantiate(res);
                prefab.parent = node;
                prefab.setPosition(0, 0);
                break;
            case "Animation":
                var loadAnim = cc.instantiate(this.loadAnimTestPrefab);
                loadAnim.parent = node;
                loadAnim.setPosition(0, 0);
                var AanimCtrl = loadAnim.getComponent(cc.Animation);
                AanimCtrl.addClip(res);
                AanimCtrl.play(res.name);
                break;
            case "Spine":
                component = node.addComponent(sp.Skeleton);
                component.skeletonData = res;
                component.animation = "walk";
                node.y = -248;
                break;
        }
        this.showWindow.addChild(node);
    }
});






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

    //加载场景后，使用
    this._curRes = res//加载的回调函数第二个参数
    cc.director.runScene(this._curRes.scene);
    cc.loader.releaseAsset(this._curRes);
    this._curRes = null;



    //如果在远程，则使用 load 方法处理
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
