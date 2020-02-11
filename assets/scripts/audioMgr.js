const volume = 0.6;
var audioMgr = {
    audio_obj: {},
    audio_id: {},
    curBgName: "bg",
    playAudio(path,isLoop,name) {
        if(!Global.isPlay)return;
        if(this.audio_obj[name]){
            let id = cc.audioEngine.play(this.audio_obj[name], isLoop, volume);
            this.audio_id[name] = id;
        }else{
            cc.loader.loadRes(path, cc.AudioClip, (err, audioClip) => {
                this.audio_obj[name] = audioClip;
                let id = cc.audioEngine.play(audioClip, isLoop, volume);   
                this.audio_id[name] = id;       
            })
        }
    },

    stopAudio(name) {
        if(!Global.isPlay)return;
        cc.audioEngine.stop(this.audio_id[name]);
    },
    pauseAudio(name) {
        cc.audioEngine.pause(this.audio_id[name]);
    },
    resumeAudio(name) {
        cc.audioEngine.resume(this.audio_id[name]);
    },

    playClick() {
        if(!Global.isPlay)return;
        this.playAudio("audios/click",false,"click");
    },



    isFail: false,
    playFail() {
        if(!Global.isPlay)return;
        if(this.curBgName != "bg") {
            cc.audioEngine.stop(this.audio_id[this.curBgName]);
        }
        this.curBgName = "fail";
        this.isFail = true;
        this.pause_audio("main");
        this.play_audio("audios/fail",false,"fail");
        setTimeout(() => {
            if(this.curBgName != "fail")return;
            this.curBgName = "bg";
            this.isFail = false;
            this.resume_audio("main");
        }, 5000);
    },
}

module.exports = audioMgr;