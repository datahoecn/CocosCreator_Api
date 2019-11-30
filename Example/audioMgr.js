const volume = 0.3;
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

    // play_effect(path,isLoop,name) {
    //     if(this.audio_obj[name]){
    //         let id = cc.audioEngine.playEffect(this.audio_obj[name], isLoop, volume);
    //         this.audio_id[name] = id;
    //     }else{
    //         cc.loader.loadRes(path, cc.AudioClip, (err, audioClip) => {
    //             this.audio_obj[name] = audioClip;
    //             let id = cc.audioEngine.playEffect(audioClip, isLoop, volume);   
    //             this.audio_id[name] = id;       
    //         })
    //     }
    // },
    // play_music(path,isLoop,name) {
    //     if(this.audio_obj[name]){
    //         let id = cc.audioEngine.playMusic(this.audio_obj[name], isLoop, volume);
    //         this.audio_id[name] = id;
    //     }else{
    //         cc.loader.loadRes(path, cc.AudioClip, (err, audioClip) => {
    //             this.audio_obj[name] = audioClip;
    //             let id = cc.audioEngine.playMusic(audioClip, isLoop, volume);   
    //             this.audio_id[name] = id;      
    //         })
    //     }
    // },
    stop_audio(name) {
        if(!Global.isPlay)return;
        cc.audioEngine.stop(this.audio_id[name]);
    },
    pause_audio(name) {
        if(!Global.isPlay)return;
        cc.audioEngine.pause(this.audio_id[name]);
    },
    resume_audio(name) {
        if(!Global.isPlay)return;
        cc.audioEngine.resume(this.audio_id[name]);
    },
    getAudio_id(name){
        return this.audio_id[name];
    }

}

module.exports = audioMgr;