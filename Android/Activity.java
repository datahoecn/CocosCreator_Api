
.MainActivity.this：表示MainActivity对象，一般用在内部类中指示外面的this，如果在内部类直接用this
.getContext()：这个是View类中提供的方法，在继承了View的类中才可以调用，返回的是当前View运行在哪个Activity Context中
.getActivity():获得Fragment依附的Activity对象。Fragment里边的getActivity()
	不推荐使用原因如下：
	这个方法会返回当前Fragment所附加的Activity，当Fragment生命周期结束并销毁时，
	getActivity()返回的是null，所以在使用时要注意判断null或者捕获空指针异常。
	MainActivity activity = (MainActivity) getActivity();

销毁活动，finish()

import android.os.Bundle;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    隐藏自己的标题栏
    ActionBar actionBar = getSupportActionBar();
    if (actionBar != null) {
        actionBar.hide();
    }
}





活动状态
	运行状态 // 活动处于栈顶
	暂停状态 // 不处于栈顶，但可见
	停止状态 // 不处于栈顶，也不可见
	销毁状态 // 从栈移除

生命周期
	onCreate // 活动第一次创建调用
	onStart  // 活动由不可见变为可见
	onResume // 重新返回栈顶调用，包括第一次创建
	onPause	 // 不是栈顶时调用
	onStop   // 不可见调用
	onDestroy// 销毁之前调用
	onRestart// 重新启动
	// 初始化活动
	onCreate -> onStart -> onResume
	// 启动下个活动
	onPause -> onStop
	// 销毁下一个活动
	onRestart -> onStart -> onResume

	// 启动对话框
	onPause
	// 销毁对话框
	onResume

	// 销毁活动
	onPause -> onStop -> onDestroy

活动被回收，数据保存
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        if (savedInstanceState != null) {
            String tempData = savedInstanceState.getString("data_key");
        }
    }

	@Override
    protected void onSaveInstanceState(Bundle outSate) {
        super.onSaveInstanceState(outSate);
        String tempData = "Something you just typed";
        outSate.putString("data_key", tempData);
    }


活动的启动模式
	standard		// 默认启动模式，系统不会检查要启动的活动是否在栈中存在，每次启动都会创建一个新的实例
	singleTop 		// 如果栈顶是该活动，会直接使用它.如果不在栈顶，会创建新实例
	singleTask 		// 如果栈中存在该活动，会把这个活动之上的所有活动踢出栈
	singleInstance  // 会启用新的栈来管理这个活动(singleTask模式指定不同的taskAffinity, 也会启动一个栈)
					// 可以和其他程序共享这个实例
	// 打印当前返回栈的 id
	Log.d("SecondActivity", "Task id is " + getTaskId());

	<activity android:name=".FirstActivity"
        android:launchMode="singleTop"
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>