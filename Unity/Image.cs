
Rect Transform 		所有UI元素都是以矩形（rectangle，简称rect）来表现的。
RectTransform 		是继承自Transform的一个组件，是所有UI元素都具有也必须具有的组件。
Blueprint Mode

Blueprint Mode 		在Scene窗口中让移动工具的操作不受元素的旋转和缩放影响
Raw Edit Mode 		对Pivot的操作不会改变Pos X、Pos Y、Pos Z
Pivot  				UI元素的轴心。0对应于左下角，1对应于右上角

Image Type 			显示的类型，有Simple（简单）、Sliced（切片）、Tiled（砖块）以及Filled（填充）4种类型

Preserve Aspect 	简单、填充类型特有参数，是否保留精灵的原图形，而不进行自动剔除

Fill Center 		切片、填充类型特有参数，是否显示切片精灵的中心部分
Fill Method 		填充类型特有参数，填充方法，有Horizontal（水平）、Vertical（垂直）、Radial（弧形）、Radial180（180度弧形）以及Radial360（360度弧形）5种类型
Fill Origin 		填充类型特有参数，填充的基准点
Fill Amount 		填充类型特有参数，填充量，值域为[0,1]
Fill Clockwise 		弧形填充类型特有参数，填充方向是否是顺时针方向

Set Native Size 	点击该按钮使显示与原图尺寸对应

切片类型，当精灵为九宫格时，适用于类型为Sliced的Image。左上、左下、右上、右下4个边角将保持原尺寸，其余部分将被拉伸。

平铺类型，当精灵设置九宫格，4个角保存原图大小，其他区域将被重复绘制



RawImage原始图片
	RawImage是显示普通Texture2D贴图。因为每一张RawImage都会增加一个额外的Drawcall，
	所以最好只用于一直使用的大尺寸图片（如与屏幕同等大小的图片）或临时显示的图片