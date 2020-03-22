1.在 com.example.newbroadcastreceiver 下，右击 New -> Other -> Broadcast Receiver , 
命名：BootCompleteReceiver , Enabled 是否启动，Exported 是否接收本程序以外的广播, 自动在 AnddroidManifest 注册
2.在 AnddroidManifest 添加 <intent-filter> MY_BROADCAST
3.sendBroadcast

标准广播改为有序广播：
    sendBroadcast 改为 sendOrderedBroadcast(intent, null); // 参数2 是与权限有关的字符串，这里传入 null 就行了
    <intent-filter android:priority="100"> // 优先级
    </intent-filter>
    // MyBroadcastReceiver.java 截断
    public void onReceive(Context context, Intent intent) {
        abortBroadcast();
    }



package com.example.newbroadcastreceiver;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent("com.example.broadcast.MY_BROADCAST");
                优先使用动态注册Receiver的方式，能动态注册绝不使用Manifest注册
                因为无法接收隐式广播消息
                intent.setPackage(getPackageName());
                sendBroadcast(intent);
            }
        });
    }
}


本地广播
    1.registerReceiver 注册
    2.sendBroadcast 发送
public class MainActivity extends AppCompatActivity {

    private IntentFilter intentFilter;

    private LocalReceiver localReceiver;

    private LocalBroadcastManager localBroadcastManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        localBroadcastManager = LocalBroadcastManager.getInstance(this); // 获取实例
        Button button = (Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent("com.example.broadcasttest.LOCAL_BROADCAST");
                localBroadcastManager.sendBroadcast(intent); // 发送本地广播
            }
        });
        intentFilter = new IntentFilter();
        intentFilter.addAction("com.example.broadcasttest.LOCAL_BROADCAST");
        localReceiver = new LocalReceiver();
        localBroadcastManager.registerReceiver(localReceiver, intentFilter); // 注册本地广播监听器
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        localBroadcastManager.unregisterReceiver(localReceiver);
    }

    class LocalReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            Toast.makeText(context, "received local broadcast", Toast.LENGTH_SHORT).show();
        }
    }

}
