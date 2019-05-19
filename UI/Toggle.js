CheckBox(复合控件)(Toggle)
  Target：组件绑定的节点(背景图)
  Interactable：是否响应交互，不勾选相当于禁用。
  Enable Auto Gray Effect ：勾选该值，禁用状态的背景图片将变灰。
  Is Checked：是否默认处于勾选状态。
  Check Mark：设置选中时对勾精灵图片(选中时显示的图片)
  Toggle Group：单选按钮组，将单选按钮加入该分组容器中，复选按钮不需要设置。
  Check Events：点击复选按钮时的响应函数数量。
  [0]：点击复选按钮时的第一个响应函数。
  CustomEventData：响应函数对应的参数

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