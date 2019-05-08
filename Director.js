// 获取逻辑树的场景节点
var currentScene = cc.director.getScene();
this.mainNode = cc.director.getScene().getChildByName("Canvas");

cc.director.loadScene('game');//通过场景名称进行加载场景
preloadScene//预加载场景，你可以在任何时候调用这个方法。

var sceneName = 'scene-name';
var onLaunched = function () {
    console.log('Scene ' + sceneName + ' launched');
};
// 第一个参数为场景的名字，第二个可选参数为场景加载后的回调函数
cc.director.loadScene(sceneName, onLaunched);