

this.enemyDieParticle.stopSystem();
this.enemyDieParticle.resetSystem();

粒子资源（ParticleSystem）
		粒子使用的 png 贴图文件或 base64 格式的内置图片文件可能会有不正确的预乘信息，
		导致渲染出的粒子不能正确显示透明区域。如果出现这种情况，
		请手动修改粒子 plist 文件中的 blendFuncSource 属性到下面的值：
			<key>blendFuncSource</key>
    		<integer>770</integer>
    		
粒子特效
properties: {
        particle: cc.Node,
    },

this.particle.getComponent(cc.ParticleSystem).stopSystem()
this.particle.getComponent(cc.ParticleSystem).resetSystem()

粒子系统的组成
	主要有粒子、粒子发射器、粒子影响器。

粒子
	粒子就是一个结构体，
	通常包含一系列属性和随机变化范围。
	属性包含生命值、位置、缩放、旋转、角度、颜色、速度、加速度等一些常见的变化。
	当粒子产生时，随机变化范围可随机变化调整属性值。

粒子发射器
	粒子发射器主要用来产生、回收粒子。创建粒子系统时，
	首先把粒子发射器放在某个位置，
	之后设定生成粒子的数量及粒子的起始属性（往往随机设定生命值），创建并不断更新粒子。
	粒子在更新运动状态的同时，生命值会不断消耗直至死亡，死亡后的粒子将被发射器记录回收。
	为了保证同一时间内存活有固定数量的粒子，发射器会在合适的时间重新初始化并运行回收的粒子。

粒子影响器
	粒子影响器主要用来设定每个粒子属性的更新算法。
	该算法一般基于粒子生命值所处的生命周期状态，遵循从初始数值向终止数值变化。

粒子系统
	在游戏引擎中，粒子系统对粒子发射器、粒子影响器进行管理。
	常用来展现单一图片无法灵活持续展现的效果，比如模拟火焰、烟雾瀑布、爆炸、雨雪天气等

粒子的代码实现
	https://blog.csdn.net/honghaier/article/details/8537146

粒子编辑器
	Particle Designder，是一款在 Mac 上运行的编辑器
	Cocos2d Particle Builder 是一款在 Windows 上运行的编辑器。
	EffectHub Cocos2dx 特效编辑器
		http://www.effecthub.com/particle2dx

ParticleSystem
	propertie:
		Preview：设置是否开启预览，如果取消，编辑时将不再显示粒子效果。
		Play On Load：设置加载时是否播放。
		Auto Remove On Finish：设置播放完后是否自动销毁所在节点。
		File：设置粒子模版文件。

		Custom：设置是否自定义粒子属性。
			SpriteFrame：设置粒子显示的纹理图片。
			Duration：设置发射器生命周期，单位为秒，-1 代表持续发射。
			Emission Rate：设置发射器每秒产生粒子的数量。
			Life：设置粒子的运动时间和随机变化范围。
			Total Particles：设置粒子的总数量。
			Start Color：设置粒子的起始颜色。
			Start Color Var：设置粒子起始颜色的随机变化范围。
			End Color：设置粒子的终止颜色。
			End Color Var：设置粒子终止颜色的随机变化范围。
			Angle：设置粒子的角度及随机变化范围。
			Start Size：设置粒子起始大小和随机变化范围。
			End Size：设置粒子终止大小和随机变化范围。
			Start Spin：设置粒子起始自旋角度和随机变化范围。
			End Spin：设置粒子终止自旋角度和随机变化范围。
			Source Pos：设置发射器的位置。
			Pos Var：设置发射器位置的随机变化范围。
			Position Type：设置粒子定位的方式，Cocos 引擎提供了 FREE、RELATIVE、GROUPED 三种方式，FREE 表示自由模式，相对于屏幕自由，不会随着粒子节点移动而移动（可产生火焰、蒸汽等效果)，RELATIVE 为相对模式，相对于被绑定的 Node 静止，粒子发射器会随 Node 移动而移动，可用于制作移动角色身上的特效等，GROUPED 为打组模式，相对于发射点，粒子随发射器移动而移动。
			Emitter Mode：设置发射器的类型，分为 GRAVITY、RADIUS 两种。重力模式下，粒子系统中的所有粒子都会受到重力的约束，当然重力大小可自定义。不过，放射性粒子系统不受重力影响，粒子好像在空中一样，可以圆周方式旋转，也可犹如螺旋效果急速前进或后退。
			Gravity：设置重力方向，不止有 Y 方向，还有 X 方向。
			Speed：设置运动速度和随机变化范围。
			Tangential Accel：设置加速度及随机变化范围。
			Radial Accel：设置粒子径向加速度及变化范围，即平行于重力方向的加速度，只在重力模式下可用。
			Rotation is Dir：设置粒子的旋转是否作为其方向，只在重力模式下可用。
			Blend：用来设置 ALPHA 混合模式。
			Src Blend Factor：设置源混合方式。
			Dst Blend Factor：设置目标混合方式。