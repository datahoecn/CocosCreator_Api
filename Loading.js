在游戏运行过程中加载图片创建精灵，或加载 MP3 文件播放音乐，
如果直接在主线程中进行，则会导致线程被 IO 操作、创建纹理等事情阻塞，从而造成卡顿。
这时我们可以借助多线程动态异步加载。Cocos 提供了专门处理动态加载的类 cc.loader
它不但可以加载本地资源，也可以加载远程的网络资源

有动态加载的资源都需放在项目的 resources 目录下。
如果不存在，可手动创建该目录，并将资源放在其中。

加载单个文件
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

    onLoad: function () {
        // cur load Target
        this._curType = "";
        this._lastType = "";
        this._curRes = null;
        this._btnLabel = null;
        this._audioSource = null;
        this._isLoading = false;
        // add load res url
        this._urls = {
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
        };
        // registered event
        // 注册监听按钮数组的触屏松开事件
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

    //根据资源类型调用 cc.loader，加载资源
    _load: function () {
        var url = this._urls[this._curType];

        //设置加载完成后的回调函数
        var loadCallBack = this._loadCallBack.bind(this);
        switch (this._curType) {
            case 'SpriteFrame':
                //图片
                cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
                break;

            case 'Spine':
                //Spine 动画
                cc.loader.loadRes(url, sp.SkeletonData, loadCallBack);
                break;

            case 'Font':
                //字体
                cc.loader.loadRes(url, cc.Font, loadCallBack);
                break;

            case 'Plist':
                //粒子系统
                cc.loader.loadRes(url, cc.ParticleAsset, loadCallBack);
                break;

            case 'Animation'://序列动作 Clip
            case 'Prefab'://预制体
            case 'Scene'://场景
            case 'Texture'://贴图
            case 'Txt'://文本
            case 'Audio'://声音

                cc.loader.loadRes(url, loadCallBack);
                break;

            case 'CORS'://这里有所不同，调用 cc.loader.load 从网络上下载资源
                cc.loader.load(url, loadCallBack);
                this.loadTips.textKey = "CORS image should report texImage2D error under WebGL and works ok under Canvas"
                break;

            default:
                cc.loader.load(url, loadCallBack);
                break;
        }

    },

    //加载完成或出错时的回调函数
    _loadCallBack: function (err, res) {
        //加载完成后，加载标记重置
        this._isLoading = false;
        //如果出错，打印日志并返回
        if (err) {
            cc.log('Error url [' + err + ']');
            return;
        }

        //显示提示
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
    //进行资源的显示
    _onShowResClick: function (event) {
        if (this._curType === "Scene") {
            cc.director.runScene(this._curRes.scene);
            cc.loader.releaseAsset(this._curRes);
            this._curRes = null;

            return;
        }
        this._createNode(this._curType, this._curRes);
    },
    //根据资源类型使用加载完成的资源文件创建相应资源节点
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
                component.string = res.text;
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
         //将创建的节点作为子节点放在 showWindow 下
        this.showWindow.addChild(node);
    }
});


加载整个目录
	 //加载目录下所有的资源
    onLoadAll: function () {
        if (this._hasLoading) { return; }
        this._hasLoading = true;
        this._clear();
        this._createLabel("Load All Assets");
        this.scrollView.scrollToTop();
        //调用 loadResDir 加载 resources 下 test_assets 目录中的所有资源
        cc.loader.loadResDir("test_assets", (err, assets) => {
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
                this._createLabel(info);
            }

            this._hasLoading = false;
            this.btnClearAll.active = true;
        });
    },

loadResDir 方法有两种形态：
	cc.loader.loadResDir("test_assets", (err, assets) => { ... });//加载指定目录下的所有资源
	cc.loader.loadResDir("test_assets", cc.SpriteFrame, (err, assets) => { ... });
		//加载指定目录下的图片文件，它的第二个参数为格式对象，用于指定要加载的对象类型
