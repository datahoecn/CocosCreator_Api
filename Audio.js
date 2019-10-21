

this.playSound("sound/select", false);
playSound : function(name, isLoop){
    cc.loader.loadRes(name, cc.AudioClip, function (err, clip) {
        if(err){
            return;
        }
        let audioID = cc.audioEngine.playEffect(clip, isLoop);
    });
},

Web Audio
    通过 Web Audio 方式加载的声音资源，在引擎内是以一个 buffer 的形式缓存的。
    这种方式的优点是兼容性好，问题比较少。缺点是占用的内存资源过多。
DOM Audio
    通过生成一个标准的 audio 元素来播放声音资源，缓存的就是这个 audio 元素
    使用标准的 audio 元素播放声音资源的时候，在某些浏览器上可能会遇到一些限制。比如：每次播放必须是用户操作事件内才允许播放（Web Audio 只要求第一次），且只允许播放一个声音资源等。
    如果是比较大的音频如背景音乐，建议使用 DOM Audio
动态选择加载
    音频默认是使用 Web Audio 的方式加载并播放的，只有在不支持的浏览器才会使用 DOM 模式
    // 使用 Web Audio 的方式加载
    cc.loader.load(cc.url.raw('resources/background.mp3'), callback);
    // 使用 DOM 模式加载
    //在 cc.loader 的 cache 中，缓存的 url 也会带有 ?useDom=1。建议不要直接填写资源的 url 尽量在脚本内定义一个 AudioClip
    cc.loader.load(cc.url.raw('resources/background.mp3?useDom=1'), callback);

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

