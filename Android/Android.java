限定符
	大小
		small 	提供给小屏幕设备的资源
		normal 	提供给中等屏幕设备的资源
		large 	提供给大屏幕设备的资源
		xlarge 	提供给超大屏幕设备的资源

	分辨率
		ldpi 	提供给低分辨率设备的资源（120dpi以下）
		mdpi 	提供给中等分辨率设备的资源（120dpi~160dpi）
		hdpi 	提供给高分辨率设备的资源（160dpi~240dpi）
		xhdpi 	提供给超高分辨率设备的资源（240dpi~320dpi）
		xxhdpi 	提供给超超高分辨率设备的资源（320dpi~480dpi）

	方向
		land  提供给横屏设备的资源
		port  提供给竖屏设备的资源

	如 layout-large

最小宽度限定符
	屏幕宽度大于 600 就加载这个文件下的布局
	layout-sw600dp

Log.v() verbose 打印那些最为琐碎的、意义最小的日志
Log.d() debug	打印一些调试信息
Log.i() info    打印一些比较重要的数据
Log.w() warn  	打印一些警告信息
Log.e() error 	打印错误信息

Table 自动补齐
Alt + Enter 自动 import

如果没有声明活动为主活动，程序依旧可以安装。一般作为第三方服务供其它应用调用，如支付宝快捷支付服务

重写方法快捷键 Ctrl + O(Mac control + O)

对话框
	<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    android:orientation="vertical"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent">

	    <TextView
	        android:layout_width="match_parent"
	        android:layout_height="wrap_content"
	        android:text="This is a dialog activity" />
	</LinearLayout>

	<activity android:name=".DialogActivity"
				android:theme = "@style/Theme.AppCompat.Dialog">
	</activity>


Toast 是一种非常友好的提醒方式
import android.widget.Toast;
// 第一个参数是 Context，上下文，活动本身就是一个 Context
// 第二个参数是显示内容
// 第三个是显示时长，内置常量 Toast.LENGTH_SHORT Toast.LENGTH_LONG
Toast.makeText(FirstActivity.this, "You clicked Btn", Toast.LENGTH_SHORT).show();
