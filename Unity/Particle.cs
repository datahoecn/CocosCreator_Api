Particle System基本模块
	Duration			持续时间，粒子系统发射粒子持续的时间
	Looping 			是否循环
	Prewarm 			预热，只有循环的粒子系统可以设置预热，即在发射粒子时就已经发射了一个周期
	Start Delay  		启动延迟，如果启动了预热将不能使用延迟选项，延迟发射粒子
	Start Lifetime  	初始生命周期，以秒为单位
	Start Speed 		初始速度
	Start Size 			初始尺寸
	Start Rotation 		初始旋转角度
	Start Color 		初始颜色
	Gravity Modifier	重力系数，对于在Physics Manager里设置的重力进行百分比缩放
	Inherit Velocity 	继承速度，初始速度
	Simulation Space 	模拟空间，选择在世界空间还是物体空间
	Play On Awake		唤醒时播放，是否自动播放
	Max Particles 		最大粒子数量


Emission模块
	Rate 				每秒或者每移动一个单位距离所产生的粒子
	Bursts 				当勾选时间选项时开启Burst选项
	Time and Number of Particles 在周期内到达某个时间点的时候发射指定数量的粒子，最多可以添加4组


Shape Module模块
	Shape 				发射体的形状。有球体、半球体、圆锥体、盒子、网格、圆圈、边缘。
						如果是网格，需要指定是从顶点、基本三角形发射，还是从边缘发射

	Random Direction 	当激活时，所有粒子将被赋予随机的初始方向。不激活时，
						球体从内向外随机发射；半球体从内向外随机发射但不包括底部；
						圆锥体/盒子从底部向顶部发射；网格/圆圈在截平面内从圈内向圈外发射；
						边缘，其实是一条线，线向一个固定方向发射

	Radius 				圆弧的度数（球体、半球体、圆锥体、圆圈、边缘）
	Angle 				圆锥体的角度，0是圆柱体，90是平面
	Box X,Y,Z 			为Box指定长宽高
	Mesh 				为Mesh指定网格
	Emit from Shell 	从体内还是体外发射粒子（球体、半球体），勾选时粒子在球面发射，不勾选时从球内发射
	Emit from 			从圆锥体的什么部位发射：Base从底部向顶部发射，Base Shell从底部的表面向顶部发射； 
						Volume从圆锥体内向外发射，Volume Shell从圆锥体的表面向外发射
	Arc 				圆圈专有属性：360为圆圈，小于360为扇形
	Emit From Edge 		圆圈专有属性：勾选时从圆圈的边缘发射，不勾选时从圆圈的中心发射


Velocity over Lifetime模块
	Velocity over Lifetime 模块设置整个生命周期的速度，参数说明如下所示。
		X,Y,Z：粒子在各个轴向的速度。
		Space：选择相对本地坐标系还是世界坐标系。
	Start Speed和Velocity的区别如下。
		float startSpeed：基础速度标量，主要表示速度的大小。
		Vector3 Velocity：速度向量，主要表示速度的方向。在某一个时间点的速度为startSpeed * Velocity。


Limit Velocity over Lifetime模块
	Limit Velocity over Lifetime模块主要用来限制粒子的速度，参数说明如下所示。
		Separate Axis：是否分X、Y、Z轴单独设置各个轴向的限定速度。
		Speed：设置限定速度。
		Space：选择相对本地坐标系还是世界坐标系。
		Dampen：当粒子速度的速度超过后限定速度后的衰减系数，范围是[0,1]。


Force over Lifetime模块
	Force over Lifetime模块对所有粒子施加力，使之具有加速度，参数说明如下所示。
		X,Y,Z：力在3个轴向的值。
		Space：选择相对本地坐标系还是世界坐标系。
	流体经常在流动中受到力的影响，例如从火中冒起的烟受热气的轻微的力作用，可以通过设置速度在生命周期中的曲线来达到。
	一开始烟受热气上升，但是热气遇到冷空气后不再对烟施力，烟升腾到顶部会回落。


Color over Lifetime模块
	Color over Lifetime模块用来处理粒子颜色在生命周期内的变化，参数Color用来处理粒子的颜色。
	很多自然的效果粒子的颜色是随时间变化的，例如火花飞溅的火星会在空气中冷却变暗乃至消失，那么最后以透明白色结束是最适合的。


Color by Speed模块
	粒子颜色也可以随速度变化，这就需要用到Color by Speed模块，该模块的参数如下所示。
	Color：粒子的颜色。
	Speed Range：颜色对应的速度范围。
	在火星四溅的效果中，快速的粒子会更亮（因为接触到更多的氧气，燃烧更剧烈），
	可以在Color的左端设置红色代表低速颜色，右段白色代表高速颜色。


Size over Lifetime模块
	Size over Lifetime模块根据生命周期设置粒子的大小，参数Size可以设置粒子在生命周期内的大小变化。
	烟雾等特效通常会在远离中心点的同时改变。
	例如，烟雾趋向于散开。这时曲线可以设置为上升的斜坡，可以和Color Over Lifetime一同使用，而燃料引起的火焰则是先上升再下降的曲线。


Size by Speed模块
	Size by Speed模块根据速度设置粒子的大小，参数如下所示。
		Size：曲线，定义粒子在速度范围内如何变化。
		Speed Range：速度最小值和速度最大值，对应Size曲线的两端。
	不光可以通过生命周期改变粒子大小，还可以通过速度。
	例如，爆炸效果中碎片向外飞溅。其中小碎片会飞得快些，而大碎片会飞得慢些。
	最好不要使用Limit Velocity Over Lifetime，除非想让粒子迅速缩小。


Rotation over Lifetime模块
	Rotation over Lifetime模块用来让粒子在生命周期内旋转，参数Angular Velocity用来设置旋转的角速度（度/秒）。
	这个属性适合小型固体，如爆炸中的碎片。设置一个范围内的随意角速度会让效果看起来更真实，更自然，因为没有过多相似的粒子。


Rotation by Speed模块
	使用Rotation by Speed模块，可以通过速度来设置旋转，参数如下所示。
		Angular Velocity：旋转的角速度（度/秒）。
		Speed Range：当Angular Velocity为曲线时，该值对应速度最小值和速度最大值。
		该模块可以用来表现石头群从坡上滚落的效果。


External Forces模块
	外部力量模块。当勾选时，Wind Zone风域不仅可以作用于树木，还可以作用于粒子，参数如下所示。
	External Forces：是否激活外部力量。
	Multiplier：风域系数。
	地形系统可以通过Wind Zone对树木施加力产生风吹的效果，激活外部力量使得风域同样可以作用于粒子系统，
	Multiplier可以设置得大一些，因为起风时粒子通常会比树枝被吹得猛烈得多。


Collision模块
	Collision模块控制粒子如何与场景中的碰撞体碰撞，主要分为World和Planes两种。
	World参数
		Dampen 在碰撞后由于摩擦而损失速度的百分比。0代表在碰撞后不损失速度，1代表碰撞后速度为0
		Bounce 弹性，0表示碰撞后不会弹起，1表示会最大弹起
		Lifetime loss 碰撞所消耗的生命周期，0代表不会消耗，1代表完全消耗，也就是碰撞后粒子立刻消失
		Min Kill Speed 当碰撞后小于此速度值的粒子将会消失
		Collides With 粒子所能碰撞的layer层
		Collision Quality 碰撞的精确度，如果选择low的话，有时粒子会穿过碰撞体
		Send Collision Messages 如果激活，当有碰撞体受到粒子撞击时，会发送消息调用脚本中的OnParticleCollision()函数
	Plane参数
		Visualization 平面的显示方式。Grid：只在Scene视图下以线框的形式呈现。Solid：在Scene和Game视图下都会直接显示一个平面
		Scale Plane 缩放可视化的平面（只与显示有关）
		Dampen 在碰撞后由于摩擦而损失速度的百分比。0代表在碰撞后不损失速度，1代表碰撞后的速度为0
		Bounce 弹性。0表示碰撞后不会弹起，1表示会最大弹起
		Lifetime loss 碰撞所消耗的生命周期，0代表不会消耗，1代表完全消耗，也就是碰撞后粒子立刻消失
		Min Kill Speed 当碰撞后小于此速度值的粒子将会消失
		Particle Radius 粒子的大致尺寸，避免粒子与平面出现部分重叠
		Send Collision Messages 如果激活，当有碰撞体受到粒子撞击时，会发送消息调用脚本中的OnParticleCollision()函数


Sub Emitters模块(子发射器)
	Birth：在粒子系统的起始阶段最多创建2个子粒子系统。
	Collision：在粒子发生碰撞的时候最多创建2个子粒子系统。
	Death：在粒子系统生命周期结束的时候最多创建2个子粒子系统。


Texture Sheet Animation模块(使用帧动画显示动态的图像)
	Tiles 			贴图在XY方向切分的数量 ，或者说帧动画的总帧数
	Animation 		Whole Sheet：整个贴图是一组帧动画。Single Row：每一行是一组帧动画
	Random Row 		当Animation的模式为Single Row时，勾选此选项会随机挑选一行作为帧动画
	Row 			当Animation的模式为Single Row时，挑选指定一行作为帧动画
	Frame Over Time 帧动画随着时间的播放曲线，如某一刻播放第几帧
	Cycles 			在粒子系统的一个生命周期内，动画重复的数量


Renderer模块(决定如何根据贴图或者模型渲染粒子)
	Render Mode模式
		Billboard 			粒子永远朝着摄像机
		Stretched Billboard 粒子永远朝着摄像机并拉伸
		Horizontal Billboard 粒子与XZ轴组成的面平行并面向摄像机
		Vertical Billboard 	粒子与XY轴组成的面平行并面向摄像机
		Mesh 				根据模型而不是根据贴图渲染

	Billboard、Stretched Billboard、Horizontal Billboard和Vertical Billboard都属于广告板模式，即粒子永远朝向屏幕
	广告板模式基本参数
		Normal Direction 		法线方向。1表示法线指向屏幕，0表示法线平行于屏幕指向屏幕中心点
		Material 				渲染粒子的材质
		Sort Mode 				粒子系统中粒子的显示顺序。By Distance：离相机越近，渲染优先级越高。 Youngest First：越早发射的粒子，渲染优先级越高。Oldest First：越晚发射的粒子，渲染优先级越高
		Sorting Fudge 			排序校正，值越低越可能被渲染在其他透明物体之上
		Cast Shadows 			是否会投射阴影，只有实体材质的粒子会投射阴影
		Receive Shadows 		是否会接受投影，只有实体材质的粒子会接受投影
		Max Particle Size 		粒子的最大尺寸（浮点数，视口尺寸）
		Sorting Layer 			通常粒子系统与普通物体一样，按距离显示。但是当把几个粒子放在同一个Sorting Layer里时，将不再按照距离决定哪个粒子系统在前，而是Order in Layer高的显示在最前面
		Order in Layer 			顺序，值高的显示在前面
	Stretched Billboard的独有参数
		Camera Scale：根据相机移动的缩放比例。
		Speed Scale：根据单个粒子速度缩放比例。
		Length Scale：根据单个粒子长度缩放比例。
