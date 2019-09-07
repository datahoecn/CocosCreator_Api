// cc.director.preloadScene("main", (completedCount, totalCount, item) => {            
        //     let p = completedCount/totalCount;
        //     this.progress_js.progress = p;
        //     this.progress_lb.string = parseInt(p * 100) + '%';
        // },() => {
        //     cc.director.loadScene("main"); 
        // });   


var xmlhttp = cc.loader.getXMLHttpRequest();
// xmlhttp.onreadystatechange=()=>{
        //     if (xmlhttp.readyState==4 && xmlhttp.status==200){
        //         var dateStr = xmlhttp.getResponseHeader("Date");
        //         var date = new Date(dateStr);
        //         var year = date.getFullYear();
        //         var month = date.getMonth() + 1;
        //         var date1 = date.getDate();
        //         var hour = date.getHours();
        //         var minutes = date.getMinutes();
        //         var second = date.getSeconds();
        //         cc.log(year + "年" + month + "月" + date1 + "日" + hour + "时" + minutes + "分" + second + "秒");
        //     }
        // }
        // xmlhttp.open("GET", "https://www.baidu.com", true);
        // xmlhttp.setRequestHeader("If-Modified-Since", "baidu");
        // xmlhttp.send();
// 权重递增
this.counter +=  this.counter * 1.003;

Anim			动画文件
Audios			音效文件
Config			配置文件
Loading			不用管这个， 这个是之前为了实现微信小游戏加载界面，把单独加载界面资源都放到里面。
Prefab 			Prefab
resources
Scene 			场景
Script 			代码
Texture 		UI和游戏图片资源

Global.js
	var Global = {
	    uiManager: null,
	    //全局变量
	    APPID: "123456",
	}

	module.exports = cc.Global = Global;




对象池
	在运行时进行节点的创建(cc.instantiate)和销毁(node.destroy)操作是非常耗费性能的
	通过创建 cc.NodePool 的实例来初始化一种节点的对象池

	初始化对象池
		properties: {
		    enemyPrefab: cc.Prefab
		},
		onLoad: function () {
		    this.enemyPool = new cc.NodePool();
		    let initCount = 5;
		    for (let i = 0; i < initCount; ++i) {
		        let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
		        this.enemyPool.put(enemy); // 通过 put 接口放入对象池
		    }
		}

	从对象池请求对象
		createEnemy: function (parentNode) {
		    let enemy = null;
		    if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
		        enemy = this.enemyPool.get();
		    } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
		        enemy = cc.instantiate(this.enemyPrefab);
		    }
		    enemy.parent = parentNode; // 将生成的敌人加入节点树
		    enemy.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
		}

	将对象返回对象池
		onEnemyKilled: function (enemy) {
		    // enemy 应该是一个 cc.Node
		    this.enemyPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
		}

	使用构造函数创建对象池时，可以指定一个组件类型或名称
	作为挂载在节点上用于处理节点回收和复用事件的组件。
	每个菜单项上有一个 MenuItem.js 组件
	// MenuItem.js
	cc.Class({
	    extends: cc.Component,

	    onLoad: function () {
	        this.node.selected = false;
	        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
	    },

	    unuse: function () {
	        this.node.off(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
	    },

	    reuse: function () {
	        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect, this.node);
	    }
	});
	let menuItemPool = new cc.NodePool('MenuItem');
	当使用 menuItemPool.get() 获取节点后，就会调用 MenuItem 里的 reuse 方法,注册点击事件
	当使用 menuItemPool.put(menuItemNode) 回收节点后，会调用 MenuItem 里的 unuse 方法,点击事件的反注册
	cc.NodePool.get() 可以传入任意数量类型的参数，这些参数会被原样传递给 reuse 方法

	清除对象池
		myPool.clear(); // 调用这个方法就可以清空对象池




加载和切换场景
	cc.director.loadScene("MyScene");
预加载场景//就算预加载还没完成，也可以调用 cc.director.loadScene
	cc.director.preloadScene("table", function () {
	    cc.log("Next scene preloaded");
	});
// 获取逻辑树的场景节点
var currentScene = cc.director.getScene();
this.mainNode = cc.director.getScene().getChildByName("Canvas");

回调函数
	var sceneName = 'scene-name';
	var onLaunched = function () {
	    console.log('Scene ' + sceneName + ' launched');
	};
	// 第一个参数为场景的名字，第二个可选参数为场景加载后的回调函数
	cc.director.loadScene(sceneName, onLaunched);



如果项目中的场景很多，随着新场景的切换，内存占用就会不断上升
除了使用 cc.loader.release 等 API 来精确释放不使用的资源
我们还可以使用场景的自动释放功能。要配置自动释放
可以在 资源管理器 中选中所需场景，然后在 属性检查器 中设置“自动释放资源”选项，该项默认关闭。

启用了某个场景的资源自动释放后，如果在脚本中保存了对该场景的资源的“特殊引用”
当场景切换后，由于资源已经被释放，这些引用可能会变成非法的，有可能引起渲染异常等问题
为了让这部分资源在场景切换时不被释放，我们可以使用 cc.loader.setAutoRelease 或者 cc.loader.setAutoReleaseRecursively 来保留这些资源。

“特殊引用”指的是以全局变量、单例、闭包、“特殊组件”、“动态资源”等形式进行的引用
“特殊组件”是指通过 cc.game.addPersistRootNode 方法设置的常驻节点及其子节点上的组件
并且这些组件中包含以字符串 URL 或 UUID，或者以除了数组和字典外的其它容器去保存的资源引用
“动态资源”指的是在脚本中动态创建或动态修改的资源。这些资源如果还引用到场景中的其它资源
则就算动态资源本身不应该释放，其它资源默认还是会被场景自动释放。

图像资源（Texture）又经常被称作贴图、图片

在 资源管理器 中，图像资源的左边会显示一个和文件夹类似的三角图标，点击就可以展开看到它的子资源（sub asset）
每个图像资源导入后编辑器会自动在它下面创建同名的 SpriteFrame 资源。
SpriteFrame 是核心渲染组件 Sprite 所使用的资源，设置或替换 Sprite 组件中的 spriteFrame 属性，就可以切换显示的图像

为什么会有 SpriteFrame 这种资源？
这样的设置是因为除了每个文件产生一个 SpriteFrame 的图像资源（Texture）之外
我们还有包含多个 SpriteFrame 的图集资源（Atlas）类型

var newStar = cc.instantiate(this.starPrefab);
// 在星星组件上暂存 Game 对象的引用
newStar.getComponent('Star').game = this;
        
settings 里保存项目相关的设置，如 构建发布 菜单里的包名、场景和平台选择等。这些设置需要和项目一起进行版本控制。

local 文件夹中包含该项目的本地设置，包括编辑器面板布局，窗口大小，位置等信息。您不需要关心这里的内容，只要按照您的习惯设置编辑器布局，这些就会自动保存在这个文件夹。一般 local 也不需要进入版本控制。

project.json 文件和 assets 文件夹一起，作为验证 Cocos Creator 项目合法性的标志
只用来规定当前使用的引擎类型和插件存储位置，不需要用户关心其内容。这个文件也应该纳入版本控制。

当用户按住 Alt/Option 的同时点击该按钮，除了执行这个文件夹自身的展开/折叠操作之外，还会同时展开/折叠该文件夹下的所有子节点。

拷贝/粘贴：将节点复制到剪贴板上，然后可以粘贴到另外的位置，或打开另一个场景来粘贴刚才拷贝的节点。
复制节点：生成和选中节点完全相同的节点副本，生成节点和选中节点在同一层级中。

锁定节点：鼠标移到节点上，左侧会有一个锁定按钮，节点锁定后无法在 场景编辑器 内选中该节点。

当在搜索按钮中选择 组件 类型时，搜索栏中会出现 t: 的符号，在后面输入需要查找的组件名称即可（例如 t:cc.Camera）。


程序运行到debugger就会自动停止运行	
console.trace() 会输出函数调用堆栈
console.table() 会把一个对象按表格形式输出
console.time() 和 console.timeEnd()得到一段代码的执行时间

Cannot read property 'style' of null
JS运行的时候你的页面还没有加载完成，所以你的JS代码找不到你的页面元素，就会抛出这个问题

Draw Call//表示引擎对当前画面的绘制次数