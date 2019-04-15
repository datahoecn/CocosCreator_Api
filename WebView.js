内嵌浏览器
	propertie:
		Url：当前浏览的网页地址。
		Webview Events：WebView 状态变化时的回调函数，如需要手动处理，可在这里增加函数参数
			//WebView 状态变化时的响应函数
			onWebFinishLoad: function (sender, event) {
		        var loadStatus = "";
		        if (event === cc.WebView.EventType.LOADED) {
		            loadStatus = " is loaded!";
		        } else if (event === cc.WebView.EventType.LOADING) {
		            loadStatus = " is loading!";
		        } else if (event === cc.WebView.EventType.ERROR) {
		            loadStatus = ' load error!';
		        }
		        this.labelStatus.string = this.url.string + loadStatus;
		    },

//visit 按钮按下时调用的函数
visitURL: function () {
    //设置 WebView 的 URL 为编辑框输入的网页地址，一旦修改 URL，WebView 将自动加载
    this.webview.url = this.url.string;
}


VideoPlayer
视频播放器

videoPlayer: {
    default: null,
    type: cc.VideoPlayer
},

play () {
    this.videoPlayer.play();
},

pause () {
    this.videoPlayer.pause();
},

stop () {
    this.videoPlayer.stop();
},

//切换全屏
toggleFullscreen () {
	//判断运行环境是否支持全屏，如果不支持显示相关提示及日志
    if (
        cc.sys.isBrowser &&
        cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ &&
        cc.sys.browserVersion <= 7.2 &&
        /Nexus 6/.test(navigator.userAgent)
    ) {
        this.tips.textKey = 'cases/02_ui/09_videoplayer/videoPlayer.nonsupport_fullscreen';
        return cc.log('May be crash, so prohibit full screen');
    }
    //如果支持则进行全屏设置
    this.videoPlayer.isFullscreen = true;
},

//切换是否显示视频的开关
toggleVisibility () {
    this.videoPlayer.enabled = !this.videoPlayer.enabled;
},

//切换是否保持横纵比的开关
keepRatioSwitch () {
    this.videoPlayer.keepAspectRatio = !this.videoPlayer.keepAspectRatio;
},

//取得当前视频播放器的状态
getStatus (event) {
    switch (event) {
        case cc.VideoPlayer.EventType.PLAYING:
            return 'PLAYING';
        case cc.VideoPlayer.EventType.PAUSED:
            return 'PAUSED';
        case cc.VideoPlayer.EventType.STOPPED:
            return 'STOPPED';
        case cc.VideoPlayer.EventType.COMPLETED:
            return 'COMPLETED';
        case cc.VideoPlayer.EventType.META_LOADED:
            return 'META_LOADED';
        case cc.VideoPlayer.EventType.CLICKED:
            return 'CLICKED';
        case cc.VideoPlayer.EventType.READY_TO_PLAY:
            return 'READY_TO_PLAY';
        default:
            return 'NONE';
    }
},

//视频播放器遇到指定事件时的回调函数
onVideoPlayerEvent (sender, event) {
    this.statusLabel.string = this.getStatus(event);
    //如果加载完成，取得视频总时长，显示在时长 Label 上
    if (event === cc.VideoPlayer.EventType.META_LOADED) {
        var duration = this.videoPlayer.getDuration();
        if (duration) {
            this.totalTime.string = duration.toFixed(2);
        }
        else {
            this.totalTime.string = 0;
        }
    }//点击屏幕事件
    else if (event === cc.VideoPlayer.EventType.CLICKED) {
        //正在播放，则暂停，否则播放
        if (this.videoPlayer.isPlaying()) {
            this.videoPlayer.pause();
        } else {
            this.videoPlayer.play();
        }
    }
},

//播放在线视频
playOnlineVideo () {
    //设置播放器的资源类型为远程地址
    this.videoPlayer.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
    //设置远程地址 URL
    this.videoPlayer.remoteURL = 'http://benchmark.cocos2d-x.org/cocosvideo.mp4';
    //启动播放
    this.videoPlayer.play();
},
//播放本地视频
playLocalVideo () {
    //设置播放器的资源类型为本地地址
    this.videoPlayer.resourceType = cc.VideoPlayer.ResourceType.LOCAL;
    //启动播放
    this.videoPlayer.play();
},

//每帧回调的更新函数，取得当前视频播放时间并显示在相应 Label 上
update () {
    if (this.currentTime && this.videoPlayer.currentTime) {
        this.currentTime.string = this.videoPlayer.currentTime.toFixed(2);
    }
}