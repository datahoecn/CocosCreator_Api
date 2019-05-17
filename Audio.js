AudioSource 是组件，可以添加到场景中
    audioSource:{
        default: null,
        type: cc.AudioSource
    }
    this.audioSource.play();
    this.audioSource.pause();
    this.audioSource.stop();
    this.audioSource.resume();
    this.audioSource.getCurrentTime();//获取当前播放时长
    this.audioSource.getDuration();//获取当前声音文件总时长

    //audioSource没有播放结束的回调，需要手动添加
    var audio = this.audioSource.audio;
    audio.on("ended", () => {
        console.log("播放结束");
    });

AudioEngine 是引擎提供的纯 API，只能在脚本中进行调用，可以同时并行播放多个音轨
    clip: {
        default: null,
        type: cc.AudioClip
    }
    //通过 cc.audioEngine 获取声音引擎
    cc.audioEngine.getMaxAudioInstance();//可同时存在多少个声音效果并行播放
    //return {Number} audioId, clip can be array
    var id = cc.audioEngine.play(clip, loop, volume);//The audio clip to play.Whether the music loop or not.Volume size
    cc.audioEngine.stop(id);
    cc.audioEngine.stopAll();
    cc.audioEngine.pauseAll();
    cc.audioEngine.resumeAll();
    //设置声音在播放完成后的回调函数
    cc.audioEngine.setFinishCallback(id, callback);

    //判断是否有 playMusic playEffect 方法
    ['playMusic', 'playEffect'].forEach(function (name) {
        if (!cc.audioEngine[name]) {
            cc.warn('.' + name + ' is not found!');
        }
    });

var audioUrl = "/music/click.mp3"
cc.loader.loadRes(audioUrl, cc.AudioClip, (err, audioClip) => {
    if(err){
        console.log("playEffect error:" + err);
    }else{
        cc.audioEngine.play(audioClip, false, 0.3);
    }               
})

