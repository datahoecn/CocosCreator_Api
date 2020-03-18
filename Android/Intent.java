Intent 可以指明当前组件想要执行的动作，还可以在不同组件之间传递数据
		一般用于启动活动、启动服务以及发送广播等

可以将数据保存在 Boundle 再把 Boundle 存放在 Intent 里

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
    intent.addCategory("MY_CATEGORY");




http // 网页
geo // 地理位置
tel // 拨打电话
展示一个网页
	// Intent.ACTION_VIEW 是内置的动作
	// 通过 Uri.parse 将网址字符串解析成一个 Uri 对象
	Intent intent = new Intent(Intent.ACTION_VIEW);
    intent.setData(Uri.parse(("http://www.baidu.com")));
    startActivity(intent);

在 <intent-filter> 中配置 <data> 更精确指定响应数据
只有 <data> 和 Intent 的 Data 一致，活动才能响应 Intent
	android:scheme 	// 指定协议部分，如 http
	android:host 	// 指定主机名部分，如 www.baidu.com
	android:port 	// 指定端口部分，一般紧随主机名后
	android:path  	// 指定主机名和端口之后的部分，如一段网址中跟在域名之后的内容
	android:mimeType// 指定可以处理的数据类型，允许使用通配符的方式进行指定

<activity android:name=".SecondActivity">
    <intent-filter>
        <action android:name="com.example.firstproject.ACTION_START" />
        <category android:name="android.intent.category.DEFAULT"/>
        <data android:scheme="http"/>
    </intent-filter>
</activity>


调用系统拨号界面
	Intent intent = new Intent(Intent.ACTION_DIAL); // 内置动作
    intent.setData(Uri.parse(("tel:10086")));
    startActivity(intent);


向下一个活动传递数据
    getStringExtra
    getIntExtra
    getBooleanExtra
    String data = "Hello SecondActivity";
    Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
    intent.putExtra("extra_data", data);
    startActivity(intent);


    Intent intent = getIntent();
    String data = intent.getStringExtra("extra_data");



返回数据给上一个活动
    startActivityForResult 在活动销毁时返回一个结果给上个活动
    Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
    startActivityForResult(intent, 111);

    @Override
    protected void  onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case 111:
                if (resultCode == RESULT_OK) {
                    String returnedData = data.getStringExtra("data_return");
                    Log.d("FirstActivity", returnedData);
                }
                break;
                default:
                    super.onActivityResult(requestCode,resultCode, data);
        }
    }

    SecondActivity
    setResult
    第一个参数时处理结果，RESULT_OK 和 RESULT_CANCELED
    第二个参数时带有数据的 Intent
    Intent intent = new Intent();
    intent.putExtra("data_return", "Hellow FirstActivity");
    setResult(RESULT_OK, intent);
    finish();

    如果通过 Back 返回上个活动，重写 onBackPressed
    @Override
    public void  onBackPressed() {
        Intent intent = new Intent();
        intent.putExtra("data_return", "Hellow FirstActivity");
        setResult(RESULT_OK, intent);
        finish();
    }

封装一个启动活动方法
    // FirstActivity.java
    public static void actionStart(Context context, String data1, String data2) {
        Intent intent = new Intent(context, SecondActivity.class);
        intent.putExtra("param1", data1);
        intent.putExtra("param2", data2);
        context.startActivity(intent);
    }

    FirstActivity.actionStart(FirstActivity.this, "data1", "data2");