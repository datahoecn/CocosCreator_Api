const volume = 0.6;
var audioMgr = {
    audio_obj: {},
    audio_id: {},
    play_audio(path,isLoop,name) {
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
    play_callback(path,isLoop,name,callback) {
        if(!Global.isPlay)return;
        if(this.audio_obj[name]){
            let id = cc.audioEngine.play(this.audio_obj[name], isLoop, volume);
            this.audio_id[name] = id;
            cc.audioEngine.setFinishCallback(id, callback);
        }else{
            cc.loader.loadRes(path, cc.AudioClip, (err, audioClip) => {
                this.audio_obj[name] = audioClip;
                let id = cc.audioEngine.play(audioClip, isLoop, volume);   
                this.audio_id[name] = id;
                cc.audioEngine.setFinishCallback(id, callback);       
            })
        }
    },

    stop_audio(name) {
        if(!Global.isPlay)return;
        cc.audioEngine.stop(this.audio_id[name]);
    },
    pause_audio(name) {
        cc.audioEngine.pause(this.audio_id[name]);
    },
    resume_audio(name, path, isLoop) {
        var id = this.audio_id[name];
        if(id || id == 0) {
            cc.audioEngine.resume(this.audio_id[name]);
        }else{
            cc.loader.loadRes(path, cc.AudioClip, (err, audioClip) => {
                audioMgr.audio_obj[name] = audioClip;
                let id = cc.audioEngine.play(audioClip, isLoop, volume);   
                audioMgr.audio_id[name] = id;       
            })
        }
        
    },
    getAudio_id(name){
        return this.audio_id[name];
    }

}

module.exports = audioMgr;