碰撞系统
	//获取碰撞检测系统
	var manager = cc.director.getCollisionManager();
	//默认碰撞检测系统是禁用的，开启碰撞检测系统
	manager.enabled = true;
	//开启 debug 绘制
	manager.enabledDebugDraw = true;
	//显示碰撞组件的包围盒
	manager.enabledDrawBoundingBox = true;

	碰撞系统回调
		//碰撞节点的脚本中有以下函数，则会自动调用
		//other 产生碰撞的另一个碰撞组件
		//self  产生碰撞的自身的碰撞组件

		//当碰撞产生的时候调用
		onCollisionEnter: function (other, self) {
		    console.log('on collision enter');
		    // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
		    var world = self.world;
		    // 碰撞组件的 aabb 碰撞框
		    var aabb = world.aabb;
		    // 节点碰撞前上一帧 aabb 碰撞框的位置
		    var preAabb = world.preAabb;
		    // 碰撞框的世界矩阵
		    var t = world.transform;
		    // 以下属性为圆形碰撞组件特有属性
		    var r = world.radius;
		    var p = world.position;
		    // 以下属性为 矩形 和 多边形 碰撞组件特有属性
		    var ps = world.points;
		},

		//当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
		onCollisionStay: function (other, self) {
		    console.log('on collision stay');
		},

		//当碰撞结束后调用
		onCollisionExit: function (other, self) {
		    console.log('on collision exit');
		}

	tag	标签。当一个节点上有多个碰撞组件时，在发生碰撞后，可以使用此标签来判断是节点上的哪个碰撞组件被碰撞了


物理系统
	//开启物理系统
		cc.director.getPhysicsManager().enabled = true;
	//绘制物理调试信息
		cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
	    cc.PhysicsManager.DrawBits.e_pairBit |
	    cc.PhysicsManager.DrawBits.e_centerOfMassBit |
	    cc.PhysicsManager.DrawBits.e_jointBit |
	    cc.PhysicsManager.DrawBits.e_shapeBit
	    ;
    	//设置绘制标志位为 0，即可以关闭绘制。
    	cc.director.getPhysicsManager().debugDrawFlags = 0;
    //设置物理重力
	    //默认的重力加速度是 (0, -320) 像素/秒^2，物理单位到像素单位上的相互转换，即 (0, -10) 米/秒^2
	    //重力加速度为 0
	    cc.director.getPhysicsManager().gravity = cc.v2();
	    //每秒加速降落 640 像素
	   	cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
	//设置物理步长
		//物理系统是按照一个固定的步长来更新物理世界的，默认这个步长即是你的游戏的帧率：1/framerate
		var manager = cc.director.getPhysicsManager();
		// 开启物理步长的设置
		manager.enabledAccumulator = true;
		// 物理步长，默认 FIXED_TIME_STEP 是 1/60
		manager.FIXED_TIME_STEP = 1/30;
		// 每次更新物理系统处理速度的迭代次数，默认为 10
		manager.VELOCITY_ITERATIONS = 8;
		// 每次更新物理系统处理位置的迭代次数，默认为 10
		manager.POSITION_ITERATIONS = 8;
		//降低物理步长和各个属性的迭代次数，都会降低物理的检测频率，所以会更有可能发生刚体穿透的情况
	查询物体
		点测试
			//测试是否有碰撞体会包含一个世界坐标系下的点，
			//如果测试成功，则会返回一个包含这个点的碰撞体。
			//如果有多个碰撞体同时满足条件，下面的接口只会返回一个随机的结果。
			var collider = cc.director.getPhysicsManager().testPoint(point);
		矩形测试
			//测试指定的一个世界坐标系下的矩形，
			//如果一个碰撞体的包围盒与这个矩形有重叠部分，则这个碰撞体会给添加到返回列表中。
			var colliderList = cc.director.getPhysicsManager().testAABB(rect);
		射线测试
			//检测给定的线段穿过哪些碰撞体，我们还可以获取到碰撞体在线段穿过碰撞体的那个点的法线向量和其他一些有用的信息。
			//type指定检测的类型
				cc.RayCastType.Any//检测射线路径上任意的碰撞体，一旦检测到任何碰撞体，将立刻结束检测其他的碰撞体，最快。
				cc.RayCastType.Closest//检测射线路径上最近的碰撞体，这是射线检测的默认值，稍慢
				cc.RayCastType.All//检测射线路径上的所有碰撞体，检测到的结果顺序不是固定的。
								  //在这种检测类型下一个碰撞体可能会返回多个结果，
								  //这是因为 box2d 是通过检测夹具(fixture)来进行物体检测的，而一个碰撞体中可能由多个夹具(fixture)组成的
				cc.RayCastType.AllClosest//检测射线路径上所有碰撞体，但是会对返回值进行删选，只返回每一个碰撞体距离射线起始点最近的那个点的相关信息，最慢。
			var results = cc.director.getPhysicsManager().rayCast(p1, p2, type);
			for (var i = 0; i < results.length; i++) {
			    var result = results[i];
			    var collider = result.collider;//射线穿过的是哪一个碰撞体
			    var point = result.point;//射线与穿过的碰撞体在哪一点相交
			    var normal = result.normal;//碰撞体在相交点的表面的法线向量
			    var fraction = result.fraction;//相交点在射线上的分数
			}

	刚体
		质量
			var mass = rigidbody.getMass();
		移动速度
			// 获取移动速度
			var velocity = rigidbody.linearVelocity;
			// 设置移动速度
			rigidbody.linearVelocity = velocity;
		移动速度衰减系数
			// 获取移动速度衰减系数
			var damping = rigidbody.linearDamping;
			// 设置移动速度衰减系数
			rigidbody.linearDamping = damping;
			//获取刚体上某个点的移动速度
			var velocity = rigidbody.getLinearVelocityFromWorldPoint(worldPoint);
			//传入一个 cc.Vec2 对象作为第二个参数来接收返回值
			var velocity = cc.v2();
			rigidbody.getLinearVelocityFromWorldPoint(worldPoint, velocity);
			//刚体的 get 方法都提供了 out 参数来接收函数返回值
		旋转速度
			//获取旋转速度
			var velocity = rigidbody.angularVelocity;
			// 设置旋转速度
			rigidbody.angularVelocity = velocity;
			//固定旋转
			rigidbody.fixedRotation = true;
		开启碰撞监听
			rigidbody.enabledContactListener = true;
	刚体类型
		//静态刚体，零质量，零速度，即不会受到重力或速度影响，但是可以设置他的位置来进行移动。
		cc.RigidBodyType.Static
		//动态刚体，有质量，可以设置速度，会受到重力影响
		cc.RigidBodyType.Dynamic
		//运动刚体，零质量，可以设置速度，不会受到重力的影响，但是可以设置速度来进行移动。
		cc.RigidBodyType.Kinematic
		//动画刚体，会根据当前 旋转或位移 属性与目标 旋转或位移 属性计算出所需的速度，并且赋值到对应的 移动或旋转 速度上，主要用于刚体与动画编辑结合使用。
		cc.RigidBodyType.Animated
	刚体方法
		//获取刚体世界坐标值
			// 直接获取返回值
			var out = rigidbody.getWorldPosition();
			// 或者通过参数来接收返回值
			out = cc.v2();
			rigidbody.getWorldPosition(out);
		//获取刚体世界旋转值
			var rotation = rigidbody.getWorldRotation();
		//局部坐标与世界坐标转换
			// 世界坐标转换到局部坐标
				var localPoint = rigidbody.getLocalPoint(worldPoint);
				// 或者
				localPoint = cc.v2();
				rigidbody.getLocalPoint(worldPoint, localPoint);
			// 局部坐标转换到世界坐标
				var worldPoint = rigidbody.getWorldPoint(localPoint);
				// 或者
				worldPoint = cc.v2();
				rigidbody.getLocalPoint(localPoint, worldPoint);
			// 局部向量转换为世界向量
				var worldVector = rigidbody.getWorldVector(localVector);
				// 或者
				worldVector = cc.v2();
				rigidbody.getWorldVector(localVector, worldVector);
				var localVector = rigidbody.getLocalVector(worldVector);
				// 或者
				localVector = cc.v2();
				rigidbody.getLocalVector(worldVector, localVector);
	获取刚体质心
		//当对一个刚体进行力的施加时，一般会选择刚体的质心作为施加力的作用点，这样能保证力不会影响到旋转值。
		// 获取本地坐标系下的质心
		var localCenter = rigidbody.getLocalCenter();
		// 或者通过参数来接收返回值
		localCenter = cc.v2();
		rigidbody.getLocalCenter(localCenter);
		// 获取世界坐标系下的质心
		var worldCenter = rigidbody.getWorldCenter();
		// 或者通过参数来接收返回值
		worldCenter = cc.v2();
		rigidbody.getWorldCenter(worldCenter);
	力与冲量
		//移动一个物体有两种方式，可以施加一个力或者冲量到这个物体上。
		//力会随着时间慢慢修改物体的速度，而冲量会立即修改物体的速度。

		// 施加一个力到刚体上指定的点上，这个点是世界坐标系下的一个点
		rigidbody.applyForce(force, point);
		// 或者直接施加力到刚体的质心上
		rigidbody.applyForceToCenter(force);
		// 施加一个冲量到刚体上指定的点上，这个点是世界坐标系下的一个点
		rigidbody.applyLinearImpulse(impulse, point);

		力与冲量也可以只对旋转轴产生影响，这样的力叫做扭矩
			// 施加扭矩到刚体上，因为只影响旋转轴，所以不再需要指定一个点
			rigidbody.applyTorque(torque);

			// 施加旋转轴上的冲量到刚体上
			rigidbody.applyAngularImpulse(impulse);

	碰撞回调
		//在刚体所在的节点上挂一个脚本，脚本中添加上你需要的回调函数即可。
		//selfCollider 指的是回调脚本的节点上的碰撞体
		//ohterCollider 指的是发生碰撞的另一个碰撞体
		//contact是一个 cc.PhysicsContact 类型的实例
		// 只在两个碰撞体开始接触时被调用一次
	    onBeginContact: function (contact, selfCollider, otherCollider) {
	    },

	    // 只在两个碰撞体结束接触时被调用一次
	    onEndContact: function (contact, selfCollider, otherCollider) {
	    },

	    // 每次将要处理碰撞体接触逻辑时被调用
	    onPreSolve: function (contact, selfCollider, otherCollider) {
	    },

	    // 每次处理完碰撞体接触逻辑时被调用
	    onPostSolve: function (contact, selfCollider, otherCollider) {
	    }

	    worldManifold//世界坐标系下的信息
	    	//points碰撞点数组
	    	//normal碰撞点上的法向量
	    	var worldManifold = contact.getWorldManifold();
			var points = worldManifold.points;
			var normal = worldManifold.normal;

