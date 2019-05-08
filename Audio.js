onKeyDown (event) {
    switch(event.keyCode) {
        case cc.macro.KEY.a:
            this.accLeft = true;
            break;
        case cc.macro.KEY.d:
            this.accRight = true;
            break;
    }
},

onKeyUp (event) {
    switch(event.keyCode) {
        case cc.macro.KEY.a:
            this.accLeft = false;
            break;
        case cc.macro.KEY.d:
            this.accRight = false;
            break;
    }
},
// 初始化键盘输入监听,通过 systemEvent 来监听系统 全局 事件
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
// 取消键盘输入监听
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

update: function (dt) {
// 根据当前加速度方向每帧更新速度
    if (this.accLeft) {
        this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
        this.xSpeed += this.accel * dt;
    }
    // 根据当前速度更新主角的位置
    this.node.x += this.xSpeed * dt;
},


//audioSource没有播放结束的回调，需要手动添加
audioSource:{
    default: null,
    type: cc.AudioSource
}
var audio = this.audioSource.audio;
audio.on("ended", () => {
    console.log("播放结束");
});
this.audioSource.play();


scoreAudio: {
    default: null,
    type: cc.AudioClip
}
cc.audioEngine.playEffect(this.scoreAudio, false);




component = node.addComponent(cc.AudioSource);
component.clip = res;
component.play();
this._audioSource = component;
if (this._audioSource && this._audioSource instanceof cc.AudioSource) {
    this._audioSource.stop();
}


var audioUrl = "/music/click.mp3"
cc.loader.loadRes(audioUrl, cc.AudioClip, (err, audioClip) => {
    if(err){
        console.log("playEffect error:" + err);
    }else{
        cc.audioEngine.play(audioClip, false, 0.3);
    }               
})

AudioSource 组件只能串行播放声音，相当于只有一个音轨。
AudioEngine 是引擎内置的声音引擎库，可以同时并行播放多个音轨
AudioEngine 在代码中直接调用

AudioSource
	Clip：指定所包含的声音文件，支持 MP3、WAV、OGG 等格式，一般使用 MP3，它方便使用且兼容各个平台和系统，而 WAV 占用文件空间较大，iOS 平台对 OGG 的支持不好。
	Volume：设置音量大小，在 0~1 间调整
	Mute：静音开关。
	Loop：设置是否循环播放。
	Play On Load：设置是否加载完就自动播放。
	Preload：设置是否预加载声音，而不是播放时再加载。

audioSource: {
        type: cc.AudioSource,
        default: null
    },

this.audioSource.play();
this.audioSource.pause();
this.audioSource.stop();
this.audioSource.resume();
this.audioSource.getCurrentTime();//获取当前播放时长
this.audioSource.getDuration();//获取当前声音文件总时长







AudioEngine
    //传入的声音文件
    audio: {
            type: cc.AudioClip,//music_logo.mp3
            default: null
        },
    //通过 cc.audioEngine 获取声音引擎
    cc.audioEngine.getMaxAudioInstance();//可同时存在多少个声音效果并行播放
    //return {Number} audioId, clip can be array
    var id = cc.audioEngine.play(clip, loop, volume);//The audio clip to play.Whether the music loop or not.Volume size
    cc.audioEngine.stopAll();
    cc.audioEngine.pauseAll();
    cc.audioEngine.resumeAll();

    //设置声音在播放完成后的回调函数
    cc.audioEngine.setFinishCallback(audioID, callback);


    //判断是否有 playMusic playEffect 方法
    ['playMusic', 'playEffect'].forEach(function (name) {
        if (!cc.audioEngine[name]) {
            cc.warn('.' + name + ' is not found!');
        }
    });
