
RadioButton(单选按钮组)
ToggleContainer
所有包含 Toggle 组件的一级子节点都会自动被添加到该容器中
Allow Switch Off : 允许其中的按钮相互切换
ToggleContainer的child都是Toggle

properties: {
        radioButton: {
            default: [],
            type: cc.Toggle
        }
    },


//toggle的响应函数
radioButtonClicked: function(toggle) {
	//toggle是sender,默认参数
    var index = this.radioButton.indexOf(toggle);
    var title = "RadioButton";
    switch(index) {
      case 0:
          title += "1";
          break;
      case 1:
          title += "2";
          break;
      case 2:
          title += "3";
          break;
      default:
          break;
    }
    if(toggle.isChecked) {
        label.string = title + " is checked.";
    }
}