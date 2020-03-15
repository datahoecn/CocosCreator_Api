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
