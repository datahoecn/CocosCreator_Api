广播分为两种
	标准广播：一种完全异步执行的广播，所有接收器几乎同时能接受到
	有序广播：一种同步执行的广播，优先级高的广播接收器先收到，可以截断广播，这样后面就接收不到

注册广播一般由两种方式
	在代码中注册，称为动态注册
	在 AnddroidManifest.xml 注册，称为静态注册

动态注册 必须程序启动才能接收广播
	1.创建一个类 NetworkChangeReceiver，继承 BroadcastReceiver , 
	2.重写父类的 onReceive() 方法，由广播时，就会执行 onReceive
	3.创建 IntentFilter 实例，并添加一个值 "android.net.conn.CONNECTIVITY_CHANGE" , 网络变化时，发的就是这个 CONNECTIVITY_CHANGE
	4.创建 NetworkChangeReceiver 实例，调用 registerReceiver 注册
	5.在 onDestroy 取消注册 unregisterReceiver

	7.connectivityManager 是一个系统服务类，管理网络连接，需要注册权限 ACCESS_NETWORK_STATE
	8.isAvailable 判断当前是否有网络 

静态注册 可以未启动就能接收广播
	1.在 com.example.broadcast 下，右击 New -> Other -> Broadcast Receiver , 
	命名：BootCompleteReceiver , Enabled 是否启动，Exported 是否接收本程序以外的广播, 自动在 AnddroidManifest 注册
	2.在 AnddroidManifest 添加 <intent-filter> BOOT_COMPLETED , 系统启动完会发送 BOOT_COMPLETED
	3.注册权限 RECEIVE_BOOT_COMPLETED

package com.example.broadcast;

import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private IntentFilter intentFilter;
    private NetworkChangeReceiver networkChangeReceiver;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        intentFilter = new IntentFilter();
        intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
        networkChangeReceiver = new NetworkChangeReceiver();
        registerReceiver(networkChangeReceiver, intentFilter);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(networkChangeReceiver);
    }

    class NetworkChangeReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
            if (networkInfo != null && networkInfo.isAvailable()) {
                Toast.makeText(context, "network is available", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(context, "network is unavailable", Toast.LENGTH_SHORT).show();
            }

        }
    }
}
