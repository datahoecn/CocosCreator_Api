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