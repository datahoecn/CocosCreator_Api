1.刚体控制对象移动。不建议用 Transform 建议用 Rigidbody.Addforce 来对对象施加力;
2.刚体单位质量能量小于 Rigidbody.sleepThreshold 物体将停止移动，此时为 Sleep 状态

Collider(碰撞器)
	Is Trigger		如激活，此碰撞器用于触发事件，并且被物理引擎忽略
	Material		引用何种物理材质决定了它和其他对象如何作用
	// Convex			如激活，该网格碰撞器将会和其他网格碰撞器碰撞。凸起的网格碰撞器限制在255个三角形面内
	// Mesh网格			用于碰撞所引用的网格

	void OnTriggerEnter(Collider other) {
    	Debug.Log(Time.time + ": 111 " + other.gameObject.name);
    }
    void OnTriggerStay(Collider other) {
    	Debug.Log(Time.time + ": 222 " + other.gameObject.name);
    }
    void OnTriggerExit(Collider other) {
    	Debug.Log(Time.time + ": 333 " + other.gameObject.name);
    }

    // 射线
    private Vector3 direction = new Vector3(1, 0, 0);
	private float distance = 1f;
    void Update()
    {
        transform.position += direction * Time.deltaTime;
        Ray ray = new Ray(transform.position, direction);
        RaycastHit info;
        if(Physics.Raycast(ray, out info, distance)) {
        	Debug.Log("前方有障碍物：" + info.collider.name);
        }
        Debug.DrawLine(ray.origin, ray.origin + direction * distance);
    }

// 关节
	Hinge Joint：链条关节 // 使刚体绕着固定点旋转
	Spring Joint：弹簧关节 // 让两个刚体分开并保持固定距离。也可设置一个数值，当作用力超过这个数值，关节关系会被打断
	Fixed Joint：固定关节
	Character Joint：角色关节
	Configurable Joint：可配置关节