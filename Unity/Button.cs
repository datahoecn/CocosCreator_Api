Navigation 		决定控制序列的属性
On Click 		用户点击该按钮所触发的函数

当我们创建UI后，Unity会自动生成名为“EventSystem”的对象，
该对象需要保留，否则所有UI将失去响应。



输入区域（Input Field）组件
	创建一个Image元素，并将Source Image设置为Background，宽高设置为150×140。
	再创建一个子元素Text并将宽高设置为100×100，取消勾选“Rich Text”富态字
	再次选中Image元素并添加输入区域（Input Field）组件，设置“Text”项为之前创建的Text元素，
	并将Highlighted Color设置为(200, 255, 255, 255)


Navigation 前往的方式
	Line Type
		Single Line：单行输入。
		Multi Line Submit：多行，回车为提交。
		Multi Line Newline：多行，回车为换行
	Placeholder 		Placeholder是显示初始文字的Text元素
	Caret Blink 		Rate 输入竖线闪烁的频率
	Selection Color 	选中文字的颜色
	Hide Mobile Input 	是否隐藏移动设备的输入