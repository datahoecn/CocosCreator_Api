Clear Flags
	清除标记。决定屏幕的哪部分将被清除。
	该项一般用于使用多台摄像机来描绘不同游戏对象的情况。
	Skybox：天空盒。该模式为默认没置，在屏幕中空白的部分将显示当前摄像机的天空盒。如果当前摄像机没有设置天空盒，它会默认使用背景色。
	Solid Color：纯色。选择该模式后，屏幕上的空白部分将显示当前摄像机的背景色。
	Depth Only：深度相机，只渲染采集到的画面。
	Don't Clear：不清除，每帧渲染画面叠加在上一帧画面之上

Background	背景颜色

Culling Mask   剔除遮罩。摄像机将看到勾选的层，忽略未被勾选的层

Projection 投射方式
	Perspective：透视。摄像机以透视方式渲染画面，拍摄区域是一个截锥体。
	Orthographic：正交。摄像机以正交方式渲染画面，拍摄区域是一个长方体

Field of View  透视模式的视野范围

Size 正交模式摄像机视口大小

Clipping Planes 剪裁平面。
	Near：近点。可视区域距离摄像机最近的点。
	Far：可视区域距离摄像机最远的点

Viewport Rect
	视口矩形。决定摄像机画面显示在屏幕的区域。
	参数X、Y决定区域起点，W、H决定区域宽高。
	屏幕坐标系是左下角为原点X=0，Y=0，屏幕最上方Y=1，屏幕最右方X=1。
	例如X=0，Y=0，W=1，H=1（默认）表示画面显示于整个屏幕。X=0.5，Y=0，W=0.5，H=1表示画面显示于右半屏幕

Depth
	该项用于控制多个摄像机的渲染优先级，数值越大优先级越高。优先级高的摄像机拍摄的画面将覆盖在优先级低的摄像机的画面上

Rendering Path
	渲染路径。该项用于指定摄像机的渲染方法。
	Use Player Settings：摄像机将使用设置的渲染方法，即Project Settings下Player中的设置。
	Forward：快速渲染。摄像机将对所有游戏对象将按每种材质一个通道的方式来渲染。
	Deferred：延迟光照。摄像机先对所有游戏对象进行一次无光照渲染，再进行光照渲染。
	Legacy Vertex Lit：顶点光照。摄像机将对所有的游戏对象作为顶点光照对象来渲染。
	Legacy Deferred (light prepass)：旧的延迟光照

Target Texture
	目标纹理。将摄像机画面输出到一张贴图而不是屏幕，可用于实现画中画或者画面特效

Occlusion Culling
	是否剔除物体背向摄像机的部分

HDR
	高动态光照渲染。该项用于启用摄像机的高动态范围渲染功能。
	因为人眼对低范围的光照强度更为敏感，所以使用高动态范围渲染能够让场景更为真实，光照的变化不会显得太突兀