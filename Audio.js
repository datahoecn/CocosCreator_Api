var audioUrl = "/music/click.mp3"
cc.loader.loadRes(audioUrl, cc.AudioClip, (err, audioClip) => {
    if(err){
        console.log("playEffect error:" + err);
    }else{
        cc.audioEngine.play(audioClip, false, this.bgmVolume);
    }               
})

AudioSource 组件只能串行播放声音，相当于只有一个音轨。
AudioEngine 是引擎内置的声音引擎库，可以同时并行播放多个音轨


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

//this.audioSource不是null并且this.audioSource是cc.AudioSource的实例
if (this.audioSource && this.audioSource instanceof cc.AudioSource) {
    this.audioSource.stop();
}


AudioEngine//AudioEngine 意为声音引擎，是 Cocos 引擎的一部分，在代码中直接调用即可。

//传入的声音文件
audio: {
        type: cc.AudioClip,
        default: null
    },

cc.audioEngine.getMaxAudioInstance();//同时可存在多少个声音效果并行播放

//return {Number} audioId, clip can be array
cc.audioEngine.play(clip, loop, volume);//The audio clip to play.Whether the music loop or not.Volume size
cc.audioEngine.stopAll();
cc.audioEngine.pauseAll();
cc.audioEngine.resumeAll();

//设置声音在播放完成后的回调函数
cc.audioEngine.setFinishCallback(audioID, callback);
