EditBox
  Background Image：设置 BACKGROUND_SPRITE 的纹理，即编辑器背景图。
  KeyboardReturnType：设置回车键类型。
  Input Flag：指定输入标识，用于指定所输入内容的格式，主要有以下几种。
    PASSWORD：密码类型
    SENSITIVE：大小写区分类型
    INITIAL_CAPS_WORD：首字母大写
    INITIAL_CAPS_SENTENCE：首句话大写
    INITIAL_CAPS_ALL_CHARACTERS：所有字符大写
    DEFAULT：默认状态
  Input Mode：指定输入类型，主要有以下几种。
    ANY：表示可以输入任何类型。
    EMAIL_ADDR：表示输入电子邮件地址。
    NUMERIC：表示输入数字。
    PHONE_NUMERIC：表示输入电话号码。
    URL：表示输入互联网地址。
    DECIMAL：表示输入浮点数。
    SINGLE_LINE：表示输入单行普通文本。
  Placeholder：设置编辑框空白时显示的默认提示文字。
  Max Length：设置最大的输入字符数量。
  Stay On Top ：只应用于 Web 页面，可以确保编辑器始终处于层级顶层，防止被其它节点遮挡。
  Tab Index：当需要使用 Tab 健切换不同编辑框时，该项可用来指定 TAB 切换时的控件索引。
  Editing Did Began：设置输入开始时获取焦点触发的响应事件回调函数。
  Text Changed：设置每输入一个文字时的响应事件回调函数。
  Editing Did Ended：设置输入框失去焦点时触发的响应事件回调函数。
  Editing Return：设置输入完成后点击回车键时的响应事件回调函数。

  当你的鼠标在某个输入框中点一下，就是要输入了，这时，输入框中会出现光标，这个输入框获取了焦点；
  输完一个输入框，直接让光标跑到下一个输入框，或是跑到按钮上（按钮出现虚线框），给输入框或按钮设置焦点。
  this.editBox1.setFocus(true)