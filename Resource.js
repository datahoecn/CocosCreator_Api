
资源属性的声明
	color: new cc.Color(255, 255, 255, 128)
	//cc.Vec2是类型，cc.v2只是一个创建二维向量简便写法
    pos  : cc.v2(10, 20),
    pos: {
        default: null,
        type: cc.Vec2
    }
    color: cc.color(0,0,0,255)          
    size : cc.size(0,0)  

	cc.Vec2 cc.Color cc.Rect
	cc.Boolean cc.String cc.Float cc.Integer

    onLoad: function () {
        var spriteFrame = this.spriteFrame;
        var texture = this.texture;
        //通过 Texture rect rotated offset 和 originalSize 设置 SpriteFrame
        spriteFrame.setTexture(texture);
    }

艺术数字资源 (LabelAtlas)
	艺术数字资源 是一种用户自定义的资源，它可以用来配置艺术数字字体的属性
	新建 -> 艺术数字配置
	使用艺术数字资源
		新建一个 Label 组件，然后将新建好的艺术数字资源拖拽到节点的 Label 组件的 Font 属性上即可

资源导入导出(.fire 场景文件和 .prefab 预制文件)
	在主菜单选择 文件 -> 资源导出

图像资源的自动剪裁
	导入图像资源后生成的 SpriteFrame 会进行自动剪裁，去除原始图片周围的透明像素区域

	Trim 勾选后将在渲染 Sprite 图像时去除图像周围的透明像素
	Size Mode 用来将节点的尺寸设置为原图或原图裁剪透明像素后的大小
		TRIMMED 选择这个选项，会将节点的尺寸（size）设置为原始图片裁剪掉透明像素后的大小。
		RAW 选择这个，会将节点尺寸设置为原始图片包括透明像素的大小。
		CUSTOM 自定义尺寸

	自带位置信息的序列帧动画
	有很多动画师在绘制序列帧动画时，会使用一张较大的画布，
	然后将角色在动画中的运动直接通过角色在画布上的位置变化表现出来。
	在使用这种素材时，我们需要将 Sprite 组件 的 Trim 设为 false，
	将 Size Mode 设为 RAW。这样动画在播放每个序列帧时，都将使用原始图片的尺寸，并保留图像周围透明像素的信息，
	这样才能正确显示绘制在动画中的角色位移。

	而 Trim 设为 true，则是在位移完全由角色位置属性控制的动画中，更推荐使用的方式。

	在 TexturePacker 中输出图集资源时，
	Sprites 分类下的 Trim mode 请选择 Trim，一定不要选择 Crop, flush position，
	否则透明像素剪裁信息会丢失，您在使用图集里的资源时也就无法获得原始图片未剪裁的尺寸和偏移信息了。

为了提高资源管理效率，建议将导入的 plist 和 png （如果有使用贴图）文件存放在单独的目录下，不要和其他资源混在一起。

	粒子资源（ParticleSystem）
		粒子使用的 png 贴图文件或 base64 格式的内置图片文件可能会有不正确的预乘信息，
		导致渲染出的粒子不能正确显示透明区域。如果出现这种情况，
		请手动修改粒子 plist 文件中的 blendFuncSource 属性到下面的值：
			<key>blendFuncSource</key>
    		<integer>770</integer>

    声音资源
    	Web Audio
    		通过 Web Audio 方式加载的声音资源，在引擎内是以一个 buffer 的形式缓存的。
			这种方式的优点是兼容性好，问题比较少。缺点是占用的内存资源过多。
		DOM Audio
			通过生成一个标准的 audio 元素来播放声音资源，缓存的就是这个 audio 元素
			使用标准的 audio 元素播放声音资源的时候，在某些浏览器上可能会遇到一些限制。比如：每次播放必须是用户操作事件内才允许播放（Web Audio 只要求第一次），且只允许播放一个声音资源等。
			如果是比较大的音频如背景音乐，建议使用 DOM Audio
		动态选择加载
			音频默认是使用 Web Audio 的方式加载并播放的，只有在不支持的浏览器才会使用 DOM 模式
			cc.loader.load(cc.url.raw('resources/background.mp3'), callback);

	骨骼动画资源（Spine）
		骨骼动画所需资源有：
			.json 骨骼数据
			.png 图集纹理
			.txt/.atlas 图集数据

	骨骼动画资源（DragonBones）
		DragonBones 骨骼动画资源有：
		.json 骨骼数据
		.json 图集数据
		.png 图集纹理

	瓦片图资源（TiledMap）
		地图所需资源有：
		.tmx 地图数据
		.png 图集纹理
		.tsx tileset 数据配置文件（部分 tmx 文件需要）

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

每一个不同的组件都继承至一个抽象的Componet类，通过这样的方法我们能够在运行时动态的添加组件，识别组件

只负责挂载脚本，执行逻辑，不包含任何渲染相关内容。通常我们将这些节点放置在场景根层级，和 Canvas 节点并列

层级管理器 里选中一个节点，然后按 Cmd/Ctrl + F 就可以在 场景编辑器 里聚焦这个节点
选中一个节点后按 Cmd/Ctrl + D 会在该节点相同位置复制一个同样的节点

全局变量访问
	// Globals.js, this file can have any name
	window.Global = {
	    backNode: null,
	    backLabel: null,
	};
	// Back.js
	cc.Class({
	    extends: cc.Component,
	    onLoad: function () {
	        Global.backNode = this.node;
	        Global.backLabel = this.getComponent(cc.Label);
	    }
	});
	// AnyScript.js
	cc.Class({
	    extends: cc.Component,
	    // start 会在 onLoad 之后执行，所以这时 Global 已经初始化过了
	    start: function () {
	        var text = 'Back';
	        Global.backLabel.string = text;
	    }
	});

模块访问
	// Global.js, now the filename matters
	module.exports = {
	    backNode: null,
	    backLabel: null,
	};
	// Back.js
	//每个脚本都能用 require + 文件名(不含路径) 来获取到对方 exports 的对象
	var Global = require("Global");
	cc.Class({
	    extends: cc.Component,

	    onLoad: function () {
	        Global.backNode = this.node;
	        Global.backLabel = this.getComponent(cc.Label);
	    }
	});

获得其它组件
	var label = this.getComponent(cc.Label);
	var rotate = this.getComponent("SinRotate");//传入一个类名,类名就是脚本的文件名

	//在节点上也有一个 getComponent 方法，它们的作用是一样的
	this.node.getComponent(cc.Label) === this.getComponent(cc.Label)

属性检查器设置组件
	//拖动节点 "Player" 到 属性检查器,不用 getComponent
	var Player = require("Player");
        player: {
            default: null,
            type: Player
        }