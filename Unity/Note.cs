 Awake 游戏对象被创建时执行
OnDestroy 脚本销毁

Start
Update 用来更新逻辑
LateUpdate
FixedUpdate 固定间隔时间执行
OnGUI 用作测试功能，如创建测试按钮

OnEnable 脚本激活
OnDisable 脚本被禁用

enabled

string.IsNullOrEmpty(myName)


Debug.Log("aaaa");
Debug.LogWarning("bbbbb");
Debug.LogError("ccccc");

// Gui
	string text = "";
	string myName = "";
	void OnGUI() {
		GUILayout.Label("提交成功，名字：" + myName);
		if(GUILayout.Button("添加颜色", GUILayout.Width(100), GUILayout.Height(50))) {
			myName = text;
		}
		text = GUILayout.TextField(text);
	}

// 创建对象
	GameObject obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
	obj.AddComponent<Rigidbody>();
	obj.name = "Cube";
	obj.transform.position = new Vector3(0, 5f, 0);
	obj.transform.localPosition = new Vector3(0, 5f, 0);

// 获取游戏对象
	public GameObject Obj;

	private GameObject Obj;
	Obj = GameObject.Find("Cube");

	public Texture texture;
	private GameObject obj;
	

// Renderer
	private Renderer render;
	render = obj.GetComponent<Renderer>();
	render.material.color = Color.red;
	render.material.mainTexture = texture; // public Texture texture;

// 发送广播与消息
    // 向游戏对象所有 Monebehavior 脚本发送消息
    // 参数1 消息的名称 参数2 传递参数 参数3 是否必须有接收方法，一般不要求
	public GameObject receiver;
	receiver.SendMessage("ShowNumber", 100, SendMessageOptions.DontRequireReceiver);

	void ShowNumber(int number) {
    	Debug.Log("收到消息： " + number);
    }
// 克隆游戏对象
	public GameObject prefab;
	GameObject obj = Instantiate(prefab) as GameObject;
	obj.transform.position = new Vector3(0,3,0);

// 移动
	transform.Translate(Vector3 offset);
	相当于
	transform.position = transform.position + offset;

	cube.transform.Translate(new Vector3(-0.5f, 0f, 0f));
	cube.transform.position = cube.transform.position + new Vector3(0.5f, 0f, 0f);

// 缩放
	transform.localScale = new Vector3(x, y, z);
	transform.localScale *= 1.2f; // 放大1.2倍

	cube.transform.localScale *= 1.2f;

// 旋转
	transform.Rotate(); // 自转
	transform.RotateAround(); // 围绕某一个点旋转
	Vector3.right; // x 轴正方向
	Vector3.up; // y 轴正方向
	Vector3.forward; // z 轴正方向

	cube.transform.Rotate(new Vector3(0,10,0));
	cube.transform.RotateAround(cylinder.transform.position, Vector3.up, 10);
	// 四元数
	// 旋转
	float rotateSpeed = 50f;
	transform.rotation = Quaternion.Euler(0f,rotateSpeed * Time.time, 0);
    	
// 时间类
	Time.time; // 从游戏开始计时，到当前时间，受 Time.timeScale 影响，游戏暂停时该时间不增加
	Time.timeScale; // 时间流逝速度，1f
	Time.deltaTime; // 上一帧所消耗的时间
	Time.fixedTime; // 表示FixedUpdate已经执行的时间
	Time.fixedDeltaTime; // 固定更新上一帧所消耗的时间 0.2
	Time.realtimeSinceStartup; // 开始到当前真实时间

// 随机数
	Random.Range(); // 参数1 最小值，参数2 最大值
	Random.Range(0, 10); // 随机生成一个之间整数 min（包含）和 max（不包含）
	Random.Range(0f, 10f); // 随机生成一个之间的浮点数 min（包含）和max（包含）

// 数学类
	Mathf.Abs(a); // 返回 a 的绝对值
	Mathf.Clamp(a, min, max); // 将 a 限制在 min 和 max 之间
	Mathf.Lerp(from, to, a); // 插入值，返回 from + to(1 - a)
	Mathf.Min(a, b, c); // 返回两个或n个数的最小值
	Mathf.Max(a, b, c);
	Mathf.Pow(a, b); // a 的 b 次方
	Mathf.Deg2Rad; // 常量浮点数，0.0174532924f, 用于角度转换弧度
	Mathf.Rad2Deg; // 常量浮点数，57.29578f, 用于弧度转换角度
	Mathf.Pi; // 常量浮点数，表示圆周率3.141592653
	Mathf.Sin(a); // 弧度 a 的正弦值
	Mathf.Cos(a);
	Mathf.Tan(a);

// 计算机输入
	void Update() {
		// 按下键盘A
		if(Input.GetKeyDown(KeyCode.A)) {

		}
		// 按住键盘A
		if(Input.GetKey(KeyCode.A)) {

		}
		// 抬起键盘A
		if(Input.GetKeyUp(KeyCode.A)) {

		}
		// 左Shift KeyCode.LeftShift

		// 按下鼠标左键, 右键参数为1
		if(Input.GetMouseButtonDown(0)) {

		}
		// 按住鼠标左键
		if(Input.GetMouseButton(0)) {

		}
		if(Input.GetMouseButtonUp(0)) {

		}
		// Fire1 按钮
		if(Input.GetButtonDown("Fire1")) {
		}
		if(Input.GetButton("Fire1")) {
		}
		if(Input.GetButtonUp("Fire1")) {
		}
		// 方向
		float axisH = Input.GetAxis("Horizontal");

	}

// Fire1 按钮（键盘鼠标输入）
	Name 						名字
	Descriptive Name 			控制设置中显示的正值名称
	Descriptive Negative Name   控制设置中显示的负值名称
	Negative Button    			该按钮用于负方向移动轴
	Position Button 			该按钮用于正方向移动轴
	Alt Negative Button    		备选按钮用于负方向移动轴
	Alt Position Button 		备选按钮用于正方向移动轴
	// 填写 3 表示当松开对应按钮后，输出值会以 3/s 的速度迅速归零
	Gravity 					当没有相关按钮按下时，回归 0 的速度，单位 /秒
	// 填写 0.001 表示当输出在 [-0.001,0.001] 之间时会被忽略不计
	Dead 						模拟的死区大小。设定范围内所有模拟设备的值为 0
	// 填写 3 表示当按下对应按钮后，输出值会议 3/s 的速度变化，当按下的是正向按钮时会迅速到达 1，反之亦然
	Sensitivity 				灵敏度，单位 /秒，仅用于数码设备
	Snap 						如果启用，当按下相反方向的按钮，该轴值将重设为 0
	Invert 						如果启用，负按钮将提供正值，反之亦然
	Type 						控制轴的输入设备类型
	Axis 						连接设备的轴将控制这个轴
	Joy Num  					连接操纵杆将控制这个轴
	
// 移动设备输入
	Touch 
		fingerId 	手指的编号，整型
		phase    	手指的阶段，枚举类型，Began 开始，Moved 移动，Stationary 静止，Ended 手指离开屏幕，Canceled 系统关闭触控
		position 	手指触屏的位置，Vector2 类型，左下角为原点

	void OnGUI() {
    	foreach(Touch touch in Input.touches) {
    		GUILayout.Label(" " + touch.fingerId);
    		GUILayout.Label(" " + touch.phase);
    		GUILayout.Label(" " + touch.position);
    	}
    }

// 重力感应
	void OnGUI() {
		GUILayout.Label("X " + Input.acceleration.x);
		GUILayout.Label("Y " + Input.acceleration.y);
		GUILayout.Label("Z " + Input.acceleration.z);
    }

// 当前游戏运行的朝向
	Input.deviceOrientation
// 当前游戏是否支持手指触控操作
	Input.touchSupported
// 是否支持多点触控
	Input.multiTouchEnabled