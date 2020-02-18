BlockInputEvents 组件
  BlockInputEvents 组件将拦截所属节点 bounding box 内的所有输入事件（鼠标和触摸），
  防止输入穿透到下层节点，一般用于上层 UI 的背景



const BlockEvents = ['touchstart', 'touchmove', 'touchend',
                     'mousedown', 'mousemove', 'mouseup',
                     'mouseenter', 'mouseleave', 'mousewheel'];

function stopPropagation (event) {
    event.stopPropagation();
}

const BlockInputEvents = cc.Class({
    name: 'cc.BlockInputEvents',
    extends: require('./CCComponent'),

    onEnable () {
        for (var i = 0; i < BlockEvents.length; i++) {
            this.node.on(BlockEvents[i], stopPropagation, this);
        }
    },
    onDisable () {
        for (var i = 0; i < BlockEvents.length; i++) {
            this.node.off(BlockEvents[i], stopPropagation, this);
        }
    }
});

cc.BlockInputEvents = module.exports = BlockInputEvents;
