RenderMode 的渲染模式有3种
	Screen Space-Overlay
	Screen Space-Camera
	World Space

	Screen Space-Overlay（屏幕空间-覆盖模式）的画布会填满整个屏幕空间，
	并将画布下的所有UI元素置于屏幕的最上层，
	或者说画布的画面永远“覆盖”其他普通3D画面
	Pixel Perfect：只有RenderMode为Screen类型时才有的选项。使UI元素像素对应，效果就是边缘清晰不模糊。
	Sort Layer：Sort Layer是uGUI专用的设置，用以指明画布的深度。

	Screen Space-Camera（屏幕空间-摄像机模式）和Screen Space-Overlay相似，画布也是填满整个屏幕空间，
	如果屏幕尺寸被改变，画布将自动改变尺寸来匹配屏幕。不同的是，在该模式下，画布会被放置在指定摄像机的前方。
	在这种渲染模式下，画布会看起来绘制在一个与摄像机固定距离的平面上。所有UI元素都由该摄像机渲染，
	因此摄像机的设置会影响UI画面。在此模式下，UI元素是由perspective也就是视角设定的，视角广度由Field of View设置。
 	Render Camera：摄像机。
	Plane Distance：画布平面距离摄像机的距离。
	Sorting Layer：Sorting Layer是uGUI专用的设置，用以指明画布的深度。
	Order in Layer：在相同Sorting Layer下的画布显示先后顺序。数字越高，显示的优先级也就越高。

	World Space即世界空间模式。在此渲染模式下，画布被视作与场景中其他普通游戏对象性质相同的类似一张面片（Plane）的对象。
	画布的尺寸可以通过Rect Transform设置，所有UI元素可能位于普通3D物体的前面或者后面显示。当UI为场景的一部分时，可使用这个模式。
	它有一个独有的参数Event Camera，用来指定接收事件的摄像机，可以通过画布上的GraphicRaycaster组件发射射线产生事件。