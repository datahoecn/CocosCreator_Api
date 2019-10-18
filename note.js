
如果两个类相互引用，脚本加载阶段就会出现循环引用，循环引用将导致脚本加载出错

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


图像资源（Texture）又经常被称作贴图、图片

console.trace() 会输出函数调用堆栈
console.table() 会把一个对象按表格形式输出
console.time() 和 console.timeEnd()得到一段代码的执行时间

Draw Call//表示引擎对当前画面的绘制次数