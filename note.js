svn checkout https://172.16.1.98/svn/math/design/Math/assets --username=lijie --password=123456 /Users/xhkj/Desktop/math/assets


模块设置是针对发布 Web 版游戏时引擎中使用的模块进行裁剪，
  达到减小发布版引擎包体的效果。在列表中选中的模块在打包时将被引擎包括，未选中的模块会被裁剪掉。
动态合图
  在项目运行时动态的将贴图合并到一张大贴图中。当渲染一张贴图的时候，
  动态合图系统会自动检测这张贴图是否已经被加入到了动态合图系统，
  如果没有，并且此贴图又符合动态合图的条件，就会将此贴图合并到动态合图系统生成的大贴图中

  目前动态合图系统只支持精灵（Sprite）渲染组件的合图
  // 将相应的 SpriteFrame 添加到动态合图系统中
  cc.dynamicAtlasManager.insertSpriteFrame(spriteFrame);

  注意：在场景加载前，动态合图系统会进行重置，SpriteFrame 贴图的引用和 uv 都会恢复到初始值。

  贴图限制
    只有贴图宽高都小于 512 的贴图才可以进入到动态合图系统
    //用户可以根据需求修改这个限制
    cc.dynamicAtlasManager.maxFrameSize = 512;

  如果希望看到动态合图的效果，那么可以开启调试来看到最终生成的大图
  cc.dynamicAtlasManager.showDebug(true); // 会创建一个ScrollView展示

自动图集资源（静态合图）
  新建 -> 自动图集配置
  自动图集资源 将会以当前文件夹下的所有 SpriteFrame 作为碎图资源
  在打包后重新生成的 SpriteFrame 将会保留这些配置

  生成图集
    预览项目或者在 Cocos Creator 中使用碎图的时候都是直接使用的碎图资源
    在 构建项目 这一步才会真正生成图集到项目中。
    
渲染帧调试
https://spector.babylonjs.com/

由于 Creator 的 自动图集 功能是在项目导出的时候进行的，所以应该在发布后的项目中进行合批测试。
在导入 BMFont 的资源的时候，需要把 .fnt 和相应的 png 图片放在同一个目录下面。
LabelAtlas 底层渲染采用的跟 BMFont 一样的机制，所以也可以和 BMFont 及其它 UI 元素一起合图来实现批次渲染。
微信小游戏平台由于 Image 的内存占用原因，默认禁用了动态图集功能，如果对内存占用要求不高的游戏，可以自行通过 cc.dynamicAtlasManager.enabled = true 打开该功能，并且设置 cc.macro.CLEANUP_IMAGE_CACHE = false 禁止清理 Image 缓存。
默认 spine 的合批是关闭的，需要勾选 enableBatch 选项开启，spine 必需是同个 spine 资源创建的对象，且每个 spine 只有一种混合模式，一张贴图，才能进行批次合并，Dragonbones 同理。
单次 Draw call 的 Buffer 数据有限，当数据超过 Buffer 长度限制时，会重新申请新的 Buffer，不同的 Buffer 也会是不同的批次。



meta 
    {  
      "ver": "1.0.0",  //版本
      "uuid": "911560ae-98b2-4f4f-862f-36b7499f7ce3", //全局唯一id
      "asyncLoadAssets": false,  //异步加载
      "autoReleaseAssets": false,  //自动释放资源
      "subMetas": {}  //子元数据
    }
    
如果两个类相互引用，脚本加载阶段就会出现循环引用，循环引用将导致脚本加载出错

层级管理器 里选中一个节点，然后按 Cmd/Ctrl + F 就可以在 场景编辑器 里聚焦这个节点
选中一个节点后按 Cmd/Ctrl + D 会在该节点相同位置复制一个同样的节点

只负责挂载脚本，执行逻辑，不包含任何渲染相关内容。通常我们将这些节点放置在场景根层级，和 Canvas 节点并列
     

资源导入导出(.fire 场景文件和 .prefab 预制文件)
在主菜单选择 文件 -> 资源导出

var xmlhttp = cc.loader.getXMLHttpRequest();
xmlhttp.onreadystatechange=()=>{
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
        var dateStr = xmlhttp.getResponseHeader("Date");
        var date = new Date(dateStr);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var date1 = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        cc.log(year + "年" + month + "月" + date1 + "日" + hour + "时" + minutes + "分" + second + "秒");
    }
}
xmlhttp.open("GET", "https://www.baidu.com", true);
xmlhttp.setRequestHeader("If-Modified-Since", "baidu");
xmlhttp.send();

// 权重递增
this.counter +=  this.counter * 1.003;


图像资源（Texture）又经常被称作贴图、图片

console.trace() 会输出函数调用堆栈
console.table() 会把一个对象按表格形式输出
console.time() 和 console.timeEnd()得到一段代码的执行时间
// 一组信息
console.group("====第" + (this.wave_index + 1) + "波小怪====");
console.groupEnd();

console.assert(isDebug,'为false时输出的信息');// isDebug为false，打印'为false时输出的信息'
console.count('myFunction被执行的次数'); // myFunction被执行的次数: 1
console.dir(obj)// 输出obj详细
https://developer.chrome.com/devtools/docs/console-api

Draw Call//表示引擎对当前画面的绘制次数