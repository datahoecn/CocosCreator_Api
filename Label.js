Label
Src Blend Factor 设置为 ONE
Dst Blend Factor 设置为 ONE_MINUS_SRC_ALPHA
这两个属性表示绘制文字时，文字区域的像素颜色为文字像素的颜色，而非文字区域为背景色

Actual Font Size 是一个被锁定的显示选项。
当排版模式为 SHRINK 时，该属性表示对字体缩放调整后字体的实际大小。

Font Size 是用户设定的字体大小，在非 SHRINK 模式下，用户设定的字体大小就是实际大小。
Font Family 用来设置字体名称。本实例使用了系统字体，这里可以输入诸如 Arial、宋体、黑体这样的系统字体名称。
Line Height 代表文字的行高。当多行显示时，它对每一行的像素高度进行约束

Overflow 指定了文字的排版方式
	NONE（无排版）：文字设定区域大小等于文字实际显示区域大小。
	CLAMP（固定大小）：文字只显示在文字设定区域内，如果超出，则被裁切掉。
	SHRINK（自动缩放）：文字只显示在文字设定区域内，如果有超出，自动缩小，以使本身能全部显示。
	RESIZE_HEIGHT（高度自动调整）：文字区域的高度根据文本需要显示的大小自动调整，保证文字全部正确显示，但宽度不变。

Enable Wrap Text 用来设置是否自动换行。勾选它，系统会自行对区域中显示的文字进行换行。

Font 用来指定一个 TTF 格式的字体文件。本实例使用的是系统字体，保持默认值“None”即可。

勾选下面的 Use System Font 表示使用系统字体，实际项目中多会使用 TTF 字体文件或字图等方式显示字体。

BMFont Original Size 也是一个锁定项。当使用图集纹理显示字体时，该项用来表示文字大小。

Spacing X 用于设定两个字之间的横向距离，不过我所用的这版 Cocos Creator 似乎并未很好地支持它。

Text Key 和 Localized String 这两项分别用来设定本地化组件的参数。

利用 Bitmap Font Generator 工具生成所需字符对应的字图
http://www.angelcode.com/products/bmfont/

EditBox
String：TEXT_LABEL 要显示的文字，即编辑框的输入文字。
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
Font Size：设置字体大小。
Line Height：设置字体行高。
Font Color：设置字体颜色。
Placeholder：设置编辑框空白时显示的默认提示文字。
Placeholder Font Size：设置编辑框空白时默认提示文字的字体大小。
Placeholder Font Color：设置编辑框空白时默认提示文字的字体颜色。
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
