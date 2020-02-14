
富文本可以使用
`第<color=green>${this.wave_index + 1}</color>小怪\n`

艺术数字资源 (LabelAtlas)
	艺术数字资源 是一种用户自定义的资源，它可以用来配置艺术数字字体的属性
	新建 -> 艺术数字配置
	使用艺术数字资源
	新建一个 Label 组件，然后将新建好的艺术数字资源拖拽到节点的 Label 组件的 Font 属性上即可

string 			String 标签显示的文本内容。
horizontalAlign Label.HorizontalAlign.LEFT CENTER RIGHT 文本内容的水平对齐方式。
verticalAlign 	Label.VerticalAlign.TOP CENTER BOTTOM 文本内容的垂直对齐方式。
actualFontSize 	Number SHRINK 模式下面文本实际渲染的字体大小
fontSize 		Number 文本字体大小。
fontFamily 		String 文本字体名称, 只在 useSystemFont 属性为 true 的时候生效。
lineHeight 		Number 文本行高。
overflow 		Label.Overflow.NONE CLAMP SHRINK RESIZE_HEIGHT 文字显示超出范围时的处理方式。
				CLAMP 模式中，当文本内容超出边界框时，多余的会被截断
				SHRINK 模式，字体大小会动态变化，以适应内容大小。这个模式在文本刷新的时候可能会占用较多 CPU 资源
				在 RESIZE_HEIGHT 模式下，只能更改文本的宽度，高度是自动改变的
enableWrapText 	Boolean 是否自动换行。
font 			Font 文本字体。
useSystemFont 	Boolean 是否使用系统字体。
spacingX 		Number 文字之间 x 轴的间距（使用 BMFont 位图字体时生效）
cacheMode 		Label.CacheMode 文本缓存模式, 仅对 系统字体 或 ttf 字体有效



设置string后，node的宽度未变更,下一帧才刷新大小
在设置 label 所有属性后,执行一次 label._updateRenderData(true); 就能带当帧获取大小


LabelOutlineb

	properties
	 	color 				Color 改变描边的颜色   new cc.Color(0.5, 0.3, 0.7, 1.0);
		width 				Number 改变描边的宽度


