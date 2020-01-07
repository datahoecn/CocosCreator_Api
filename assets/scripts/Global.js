
window.Global = {
   isAgain: false;
   keyBoard: function(event) {
      if(event.keyCode === 6) {
         if(Global.isAgain){
            cc.game.end();
         }else{
            Global.isAgain = true;
            Global.main.tip_lab.node.active = true;
            if(Global.main.language == "zh") {
               Global.main.tip_lab.string = "再次点击退出游戏";
            }else {
               Global.main.tip_lab.string = "Click again to exit the game";
            }
            setTimeout(() => {
               Global.isAgain = false;
               Global.main.tip_lab.node.active = false;
            }, 1000);
         }
   }
   // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, Global.keyBoard);
};

