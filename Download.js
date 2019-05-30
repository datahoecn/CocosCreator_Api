本实例提供了两种不同的下载方案，
一种调用 Native 文件下载任务，将资源文件下载并保存到本地存储后再加载使用，
另一种调用 cc.loader.load，将资源文件下载到内存，下载成功后在回调函数中直接使用该资源。
通常，我们选用第二种方式即可。因为下载文件被放置在临时目录中，不用时会被自动清理掉，不用考虑管理下载文件等问题。
但通过这种方式，我们无法获取到下载文件。 
Native 方法
 onLoad () {
    //如果当前不支持 JSB，则不能调用 Native 功能实现下载，直接返回
    if (!CC_JSB) {
        this.label.string = 'Downloader is a NATIVE ONLY feature.';
        return;
    }
    //创建一个 jsb 的 Downloader 实例
    this._downloader = new jsb.Downloader();
    //设置下载文件成功时的回调函数
    this._downloader.setOnFileTaskSuccess(this.onSucceed.bind(this));
    //设置下载过程中进度有变化时的回调函数
    this._downloader.setOnTaskProgress(this.onProgress.bind(this));
    //设置下载过程中有错误发生时的回调函数
    this._downloader.setOnTaskError(this.onError.bind(this));
    //将表示存储位置的变量字符串设置为设备可写目录下的指定目录
    this._storagePath = jsb.fileUtils.getWritablePath() + '/example-cases/downloader/';
    //创建指定目录
    this._inited = jsb.fileUtils.createDirectory(this._storagePath);
    //如果创建不成功，则提示错误，创建成功，完成初始化
    if (!this._inited) {
        this.label.string = 'Failed to create storage path, downloader won\'t work correctly';
    }
},

//文件下载成功的回调函数，读取下载文件并显示
onSucceed (task) {
    //
    var atlasRelated = false;
    //根据请求的资源类型做相应处理
    switch (task.requestURL) {
    case this.imgUrl:
        //如果是图片，调用 cc.loader.load 加载本地指定目录下的相应文件，文件路径存在 task 的 storagePath 变量中
        var self = this;
        cc.loader.load(task.storagePath, function (err, tex) {
            //从路径中创建 spriteFrame，并指定给当前 sprite 属性的 spriteFrame，实现换图
            var spriteFrame = new cc.SpriteFrame(tex);
            self.sprite.spriteFrame = spriteFrame;
            //显示 sprite
            self.sprite.node.active = true;
            //隐藏 Label
            self.label.node.active = false;
        });
        break;
    case this.txtUrl:
        //如果是文本，直接通过 jsb 读取文件，获取到字符串内容
        var content = jsb.fileUtils.getStringFromFile(task.storagePath);
        //隐藏 sprite
        this.sprite.node.active = false;
        //显示 Label
        this.label.node.active = true;
        //设置 Label 的文字内容。
        this.label.string = content.substr(0, 350);
        break;
    }
},

//下载过程有进度变化时的回调函数，未做处理
onProgress (task, bytesReceived, totalBytesReceived, totalBytesExpected) {

},

//下载过程有错误时的回调函数
onError (task, errorCode, errorCodeInternal, errorStr) {
    this.sprite.node.active = false;
    this.label.node.active = true;
    this.label.string = 'Failed to download file (' + task.requestURL + '): ' + errorStr + '(' + errorCode + ')';
},
    
//点击 Download Image 按钮时的响应函数
downloadImg () {
    //如果指定地址为空或者无法使用 jsb 进行存储，则返回
    if (!this.imgUrl || !this._inited) {
        return;
    }
    //调用 jsb 创建一个文件下载任务，从指定网址下载，并存储到指定存储目录下，命名为 download1.png
    this._imgTask = this._downloader.createDownloadFileTask(this.imgUrl, this._storagePath + 'download1.png');
},
    
//点击 Load Image(mem) 按钮时的响应函数
loadImg () {
    //如果指定地址为空或者无法使用 jsb 进行存储，则返回
    if (!this.tempImgUrl || !this._inited) {
        return;
    }
    //调用 cc.loader.load 从 tempImgUrl 网址下载图片，并在内存中加载
    var self = this;
    cc.loader.load(this.tempImgUrl, function (error, tex) {
        //如果出现错误，提示错误
        if (error) {
            console.log("Load remote image failed: " + error);
        }
        else {
            //如果正常下载成功，将内存中加载的纹理直接指定为 sprite 的纹理图
            var spriteFrame = new cc.SpriteFrame(tex);
            self.sprite.spriteFrame = spriteFrame;
            //显示 sprite
            self.sprite.node.active = true;
            //隐藏 Label
            self.label.node.active = false;
        }
    });
},
    
//点击 Download Text File 按钮时的响应函数
downloadTxt () {
    //如果指定地址为空或者无法使用 jsb 进行存储，则返回
    if (!this.txtUrl || !this._inited) {
        return;
    }
    //调用 jsb 创建一个文件下载任务，从指定网址下载，并存储到指定存储目录下，命名为 imagine.txt
    this._txtTask = this._downloader.createDownloadFileTask(this.txtUrl, this._storagePath + 'imagine.txt');
}
