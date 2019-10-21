
如果项目中的场景很多，随着新场景的切换，内存占用就会不断上升
除了使用 cc.loader.release 等 API 来精确释放不使用的资源
我们还可以使用场景的自动释放功能

启用了某个场景的资源自动释放后，如果在脚本中保存了对该场景的资源的“特殊引用”
当场景切换后，由于资源已经被释放，这些引用可能会变成非法的，有可能引起渲染异常等问题
为了让这部分资源在场景切换时不被释放，我们可以使用 cc.loader.setAutoRelease 或者 cc.loader.setAutoReleaseRecursively 来保留这些资源。

当加载新场景时，旧场景的资源根据旧场景是否勾选“Auto Release Assets”，将会被释放或者保留。 
而使用 cc.loader.loadRes 或 cc.loader.loadResDir 动态加载的资源，则不受场景设置的影响，默认不自动释放。

loader
    method
        getXMLHttpRequest   Gets a new XMLHttpRequest instance.
        load                Load resources with a progression callback and a complete callback....
        loadRes             Load resources from the "resources" folder inside the "assets" folder of your project.
        loadResArray        This method is like loadRes except that it accepts array of url.
        loadResDir          Load all assets in a folder inside the "assets/resources" folder of your project.
        getRes              Get resource data by id. 
        getDependsRecursively   获取某个已经加载好的资源的所有依赖资源，包含它自身，并保存在数组中返回。
        release                 通过 id（通常是资源 url）来释放一个资源或者一个资源数组。
        releaseAsset            通过资源对象自身来释放资源。
        releaseRes              释放通过 loadRes 加载的资源。
        releaseResDir           释放通过 loadResDir 加载的资源。
        releaseAll              释放所有资源。
        setAutoRelease          设置当场景切换时是否自动释放资源。
        setAutoReleaseRecursively 设置当场景切换时是否自动释放资源及资源引用的其它资源。
        isAutoRelease           返回指定的资源是否有被设置为自动释放，不论场景的“Auto Release Assets”如何设置。

JSON 资源
        组件关联一个 JSON：
         // 声明
        npcList: {
            default: null,
            type: cc.JsonAsset,
        },
        // 读取
        var json = this.npcList.json;
        动态加载：
        cc.loader.loadRes('configs/npc', function (err, jsonAsset) {
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

加载 Prefab
    cc.loader.loadRes("prefabs/popUp", function (err, prefab) {
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
    cc.loader.loadRes("test/image", cc.SpriteFrame, function (err, spriteFrame) {
        self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });
加载图集中的 SpriteFrame
    // 加载 SpriteAtlas（图集），并且获取其中的一个 SpriteFrame
    // 注意 atlas 资源文件（plist）通常会和一个同名的图片文件（png）放在一个目录下, 所以需要在第二个参数指定资源类型
    cc.loader.loadRes("testassets/sheep", cc.SpriteAtlas, function (err, atlas) {
        var frame = atlas.getSpriteFrame('sheep_down_0');
        sprite.spriteFrame = frame;
    });

资源释放//releaseRes释放通过 loadRes 加载的资源
    cc.loader.releaseRes("testassets/image", cc.SpriteFrame);
    cc.loader.releaseRes("testassets/anim");
    //释放特定的 Asset 实例,通过资源对象自身来释放资源
    cc.loader.releaseAsset(spriteFrame);

资源批量加载
    // 加载 testassets 目录下所有资源
    cc.loader.loadResDir("testassets", function (err, assets) {
    });
    // 加载 test assets 目录下所有 SpriteFrame，并且获取它们的路径
    cc.loader.loadResDir("testassets", cc.SpriteFrame, function (err, assets, urls) {
        //利用多线程加载目录，时间可能比较长，加载完成后，利用 isValid 判断当前节点是否已被销毁，如果销毁直接返回
        if (!this.isValid) {
            return;
        }
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

refreshCallBack : function(event, customEventData){
    this.playSound("sound/click", false);
    cc.director.preloadScene('playScene', function () {
        cc.director.loadScene('playScene');
    });
},


用cc.loader 加载资源是不会重复加载的，loader中是缓存的，如果之前加载过了之后是不会再加载，而是直接从缓存中调用。
可以用cc.loader.getRes(url)查看是否已经加载过了

在游戏运行过程中加载图片创建精灵，或加载 MP3 文件播放音乐，
如果直接在中进主线程行，则会导致线程被 IO 操作、创建纹理等事情阻塞，从而造成卡顿。
这时我们可以借助多线程动态异步加载。
Cocos 提供了专门处理动态加载的类 cc.loader

可以加载本地资源，也可以加载远程的网络资源


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



