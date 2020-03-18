
_loadRes: function(url, type, cb) {
    cc.loader.loadRes(url, type, function(err, prefab) {
        if(!err) {
            cb(prefab);
        }
    })
}
_createPrefab(url) {
    var prefab = cc.loader.getRes(url, cc.Prefab);
    if (prefab !== null && typeof(prefab) !== "undefined") {
        return cc.instantiate(prefab);
    }
    return null;
}

if (CC_EDITOR) {
    Editor.Profile.load('profile://project/i18n.json', (err, profile) => {
        window.i18n.curLang = profile.data['default_language'];
        if (polyInst) {
            let data = loadLanguageData(window.i18n.curLang) || {};
            initPolyglot(data);
        }
    });
}

导致渲染出的粒子不能正确显示透明区域。请手动修改粒子 plist 文件中的 blendFuncSource 属性到下面的值：
    <key>blendFuncSource</key>
    <integer>770</integer>


延迟加载资源
    这个场景直接或间接依赖的所有贴图、粒子和声音都将被延迟到场景切换后才加载，使场景切换速度极大提升
    Spine 和 TiledMap 依赖的资源永远都不会被延迟加载。

如果这个预置需要反复执行 cc.instantiate，请选择“优化多次创建性能”，否则保持默认的“自动调整”即可。


当加载新场景时，旧场景的资源根据旧场景是否勾选“Auto Release Assets”，将会被释放或者保留。 
而使用 cc.loader.loadRes 或 cc.loader.loadResDir 动态加载的资源，则不受场景设置的影响，默认不自动释放。

loader
    method
        getXMLHttpRequest       Gets a new XMLHttpRequest instance.     var xhr = cc.loader.getXMLHttpRequest();
        load                    Load resources with a progression callback and a complete callback....
        loadRes                 Load resources from the "resources" folder inside the "assets" folder of your project.
        loadResArray            This method is like loadRes except that it accepts array of url.
        loadResDir              Load all assets in a folder inside the "assets/resources" folder of your project.
        getRes                  Get resource data by id. 
        getDependsRecursively   获取某个已经加载好的资源的所有依赖资源，包含它自身，并保存在数组中返回。
        release                 通过 id（通常是资源 url）来释放一个资源或者一个资源数组。
        releaseAsset            通过资源对象自身来释放资源。
        releaseRes              释放通过 loadRes 加载的资源。
        releaseResDir           释放通过 loadResDir 加载的资源。
        releaseAll              释放所有资源。
        setAutoRelease          设置当场景切换时是否自动释放资源。// (this.prefab, true) true是释放，false是不释放
        setAutoReleaseRecursively 设置当场景切换时是否自动释放资源及资源引用的其它资源。
        isAutoRelease           返回指定的资源是否有被设置为自动释放，不论场景的“Auto Release Assets”如何设置。

    // 如果在这个 prefab 中有一些和场景其他部分共享的资源，你不希望它们被释放，可以将这个资源从依赖列表中删除
    var deps = cc.loader.getDependsRecursively('prefabs/sample');
    var index = deps.indexOf(texture2d._uuid);
    if (index !== -1)
        deps.splice(index, 1);
    //通过 id（通常是资源 url）来释放一个资源或者一个资源数组
    cc.loader.release(deps);


    // getDependsRecursively一起使用
    cc.loader.release(prefab) // 只会release掉这个prefab所使用的json文件，而prefab所引用的spriteFrame以及其他的一些资源并不会释放掉
    var deps = cc.loader.getDependsRecursively(prefab);
    cc.loader.release(deps);

    资源释放//releaseRes释放通过 loadRes 加载的资源
    cc.loader.releaseRes("testassets/image", cc.SpriteFrame);
    cc.loader.releaseRes("testassets/anim");
    //释放特定的 Asset 实例,通过资源对象自身来释放资源
    cc.loader.releaseAsset(spriteFrame);
    
JSON 资源
         // 声明
        npcList: cc.JsonAsset,
        // 读取
        var json = this.npcList.json;

        动态加载：
        cc.loader.loadRes('configs/npc', function (err, jsonAsset) {
        });

文本资源
        如 .txt, .plist, .xml, .json, .yaml, .ini, .csv, .md，都会导入为 cc.TextAsset。
        组件关联一个 TextAsset：
        // 声明
        file: cc.TextAsset
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
    cc.loader.loadRes("testassets/anim", function (err, clip) {
        self.node.getComponent(cc.Animation).addClip(clip, "anim");
    });
加载 SpriteFrame
    //如果指定了类型参数，就会在路径下查找指定类型的资源
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


资源批量加载
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

加载场景
    cc.director.preloadScene("main", (completedCount, totalCount, item) => {            
        let p = completedCount/totalCount;
        this.progress_js.progress = p;
        this.progress_lb.string = parseInt(p * 100) + '%';
    },() => {
        cc.director.loadScene("main"); 
    });  

    cc.director.preloadScene('playScene', function () {
        cc.director.loadScene('playScene');
    });

用 cc.loader 加载资源是不会重复加载的，loader中是缓存的，如果之前加载过了之后是不会再加载，而是直接从缓存中调用。
可以用 cc.loader.getRes(url)查看是否已经加载过了


