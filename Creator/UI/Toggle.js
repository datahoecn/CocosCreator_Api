CheckBox(复合控件)(Toggle)
  isChecked 如果这个设置为 true，则 check mark 组件会处于 enabled 状态，否则处于 disabled 状态。
  checkMark cc.Sprite 类型，Toggle 处于选中状态时显示的图片
  toggleGroup cc.ToggleGroup 类型， Toggle 所属的 ToggleGroup，这个属性是可选的。如果这个属性为 null，则 Toggle 是一个 CheckBox，否则，Toggle 是一个 RadioButton。
  Target：组件绑定的节点(背景图)
  Interactable：是否响应交互，不勾选相当于禁用。
  Enable Auto Gray Effect ：勾选该值，禁用状态的背景图片将变灰。
  Check Events：点击复选按钮时的响应函数数量。

通过脚本代码添加回调
方法一
var checkEventHandler = new cc.Component.EventHandler();
checkEventHandler.target = this.node;
checkEventHandler.component = "cc.MyComponent"
checkEventHandler.handler = "callback";
checkEventHandler.customEventData = "foobar";

toggle.checkEvents.push(checkEventHandler);

callback: function(toggle, customEventData) {
    // 这里的 toggle 是事件发出的 Toggle 组件
    // 这里的 customEventData 参数就等于之前设置的 "foobar"
}


方法二
this.toggle.node.on('toggle', this.callback, this);