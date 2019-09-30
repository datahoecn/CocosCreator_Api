
骨骼动画资源（Spine）
		骨骼动画所需资源有：
			.json 骨骼数据
			.png 图集纹理
			.txt/.atlas 图集数据
			
sp.Skeleton 组件
	Skeleton Data：骨骼动画文件。
	Default Skin：默认的身体部件套装名称，这里形象地称为“皮肤”，如果 Spine 中有多套皮肤信息，我们可以跟据需求为骨骼动画更换不同的皮肤套装，从而实现换装效果。
	Animation：默认的动作名称，一般会有多个动作供切换。
	Loop：用来设置是否循环播放。
	Premultiplied Alpha：在图片渲染时做半透明处理，它的重要意义在于可使带透明度的图片纹理正常进行线性插值，从而让旋转、缩放或者非整数的纹理坐标正常显示，否则就会像上面案例一样，在透明像素边缘产生奇怪的颜色（有兴趣者可以研究这里）。
	Time Scale：设置播放速度。
	Debug Slots：设置是否显示插槽。
	Debug Bones：设置是否显示骨骼。

	动作融合
		保证多个动作之间更平滑、自然地切换