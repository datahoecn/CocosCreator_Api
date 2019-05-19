Button
  Target：当前组件绑定的节点
  Transition：按钮按下时状态变化的过渡类型，
    共有无变化、图片变化、颜色变化和缩放变化四种效果可供选择
    SPRITE :
      Normal：普通状态下的背景图。
      Pressed：按下状态下的背景图。
      Hover：鼠标在其上悬停但未按下时的背景图。
      Disabled：禁用状态时的背景图。
  Interactable：是否响应交互，不勾选相当于禁用。
  Click Events：点击按钮时响应的函数数量
  [0]：设置第一个响应函数的三个参数，分别为响应的节点对象、对应的脚本组件、脚本组件中的响应函数。
  CustomEventData：响应函数对应的参数。

  var eventHandler = new cc.Component.EventHandler();
  eventHandler.target = this.node;//Node 目标节点
  eventHandler.component = "MainMenu";//String 目标组件名
  eventHandler.handler = "OnClick"//String 响应事件函数名

  var data = {
      c: 1111, 
  };
  eventHandler.customEventData = data;
  
  var button = node.getComponent(cc.Button);
  button.clickEvents[0] = eventHandler;//button.clickEvents.push(eventHandler);