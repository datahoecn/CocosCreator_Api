Toggle
	“Toggle”开关、
	“Background”背景Image、
	“Checkmark”勾选图Image（默认是一张形状为“√”的图）
	“Lable”文字。

	Navigation 			前往的方式
	Is On 				开关是否为开启状态
	Toggle Transition 	开关转换，勾选图的切换方式，有None（无）和Fade（淡入淡出）两种方式
	Graphi 				指定一张Image作为勾选图
	Group 				所处的组
	On Value Changed 	值变换响应，事件响应


开关组（Toggle Group）
	可以不位于画布下
	private ToggleGroup toggleGroup;
    void Awake()
    {
        // 得到Toggle组
        toggleGroup = GetComponent<ToggleGroup>();
    }
	public void OnPress_Toggle()
    {
        Toggle selected = null;
        foreach(Toggle item in toggleGroup.ActiveToggles())
        {
            selected = item;
            break;
        }
        Debug.Log("选择了："+selected.transform.FindChild("Label").GetComponent<Text>().text);
    }