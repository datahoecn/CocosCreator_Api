var menu = {
　　    
　　　　// 当前状态
　　　　currentState: 'hide',
　　
　　　　// 绑定事件
　　　　initialize: function() {
　　　　　　var self = this;
　　　　　　self.on("hover", self.transition);
　　　　},
　　
　　　　// 状态转换
　　　　transition: function(event){
　　　　　　switch(this.currentState) {
　　　　　　　　case "hide":
　　　　　　　　　　this.currentState = 'show';
　　　　　　　　　　doSomething();
　　　　　　　　　　break;
　　　　　　　　case "show":
　　　　　　　　　　this.currentState = 'hide';
　　　　　　　　　　doSomething();
　　　　　　　　　　break;
　　　　　　　　default:
　　　　　　　　　　console.log('Invalid State!');
　　　　　　　　　　break;
　　　　　　}
　　　　}
　　
　　};