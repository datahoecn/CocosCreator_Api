Intent 可以指明当前组件想要执行的动作，还可以在不同组件之间传递数据
		一般用于启动活动、启动服务以及发送广播等

显示 Intent
	import android.content.Intent;

	// 第二个参数指想要启动的目标活动
	Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
    startActivity(intent);

隐式 Intent
	<activity android:name=".SecondActivity">
        <intent-filter>
            <action android:name="com.example.firstproject.ACTION_START" />
            <category android:name="android.intent.category.DEFAULT"/>
        </intent-filter>
    </activity>

	import android.content.Intent;

	// 默认 会将 DEFAULT category 添加到 intent
	Intent intent = new Intent("com.example.firstproject.ACTION_START");
    startActivity(intent);

    // 每个 Intent 只能指定一个 action 但却能指定多个 category

    <category android:name="MY_CATEGORY"/>
    intent.addCategory(("MY_CATEGORY"));


启动其他程序的活动
	// 展示一个网页
	// Intent.ACTION_VIEW 是内置的动作
	// 通过 Uri.parse 将网址字符串解析成一个 Uri 对象
	Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.setData(Uri.parse(("http://www.baidu.com")));
    startActivity(intent);