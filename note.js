
层级管理器 里选中一个节点，然后按 Cmd/Ctrl + F 就可以在 场景编辑器 里聚焦这个节点
选中一个节点后按 Cmd/Ctrl + D 会在该节点相同位置复制一个同样的节点

只负责挂载脚本，执行逻辑，不包含任何渲染相关内容。通常我们将这些节点放置在场景根层级，和 Canvas 节点并列
     
svn checkout https://172.16.1.98/svn/math/design/Math/assets --username=lijie --password=123456 /Users/xhkj/Desktop/math/assets

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


// 获取逻辑树的场景节点
var currentScene = cc.director.getScene();
this.mainNode = cc.director.getScene().getChildByName("Canvas");


如果项目中的场景很多，随着新场景的切换，内存占用就会不断上升
除了使用 cc.loader.release 等 API 来精确释放不使用的资源
我们还可以使用场景的自动释放功能。要配置自动释放
可以在 资源管理器 中选中所需场景，然后在 属性检查器 中设置“自动释放资源”选项，该项默认关闭。

启用了某个场景的资源自动释放后，如果在脚本中保存了对该场景的资源的“特殊引用”
当场景切换后，由于资源已经被释放，这些引用可能会变成非法的，有可能引起渲染异常等问题
为了让这部分资源在场景切换时不被释放，我们可以使用 cc.loader.setAutoRelease 或者 cc.loader.setAutoReleaseRecursively 来保留这些资源。


图像资源（Texture）又经常被称作贴图、图片


console.trace() 会输出函数调用堆栈
console.table() 会把一个对象按表格形式输出
console.time() 和 console.timeEnd()得到一段代码的执行时间

Draw Call//表示引擎对当前画面的绘制次数