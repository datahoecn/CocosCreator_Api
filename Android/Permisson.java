Android现在将所有的权限归成了两类，一类是普通权限，一类是危险权限
    危险权限需要进行运行时权限处理，普通权限只需要在AndroidManifest.xml文件中添加一下权限声明就可以了。
    普通权限指的是那些不会直接威胁到用户的安全和隐私的权限，对于这部分权限申请，系统会自动帮我们进行授权，而不需要用户再去手动操作了
    危险权限则表示那些可能会触及用户隐私或者对设备安全性造成影响的权限，如获取设备联系人信息、定位设备的地理位置等，对于这部分权限申请，必须要由用户手动点击授权才可以，否则程序就无法使用相应的功能。
危险权限
    每个危险权限都属于一个权限组，我们在进行运行时权限处理时使用的是权限名，但是用户一旦同意授权了，那么该权限所对应的权限组中所有的其他权限也会同时被授权。   
    CALENDAR
        READ_CALENDAR 
        WRITE_CALENDAR
    CAMERA
        CAMERA
    CONTACTS
        READ_CONTACTS 
        WRITE_CONTACTS 
        GET_ACCOUNTS
    LOCATION
        ACCESS_FINE_LOCATION 
        ACCESS_COARSE_LOCATION
    MICROPHONE
        RECORD_AUDIO

    PHONE
        READ_PHONE_STATE 
        CALL_PHONE 
        READ_CALL_LOG 
        WRITE_CALL_LOG 
        ADD_VOICEMAIL 
        USE_SIP 
        PROCESS_OUTGOING_CALLS
    SENSORS
        BODY_SENSORS
    SMS
        SEND_SMS 
        RECEIVE_SMS 
        READ_SMS 
        RECEIVE_WAP_PUSH 
        RECEIVE_MMS
    STORAGE
        READ_EXTERNAL_STORAGE 
        WRITE_EXTERNAL_STORAGE


拨打电话
    ContextCompat.checkSelfPermission() 方法接收两个参数，第一个参数是Context ，第二个参数是具体的权限名，
    比如打电话的权限名就是 Manifest.permission.CALL_PHONE ，
    然后我们使用方法的返回值和 PackageManager.PERMISSION_GRANTED 做比较，
    相等就说明用户已经授权，不等就表示用户没有授权。

    如果已经授权执行 call() 方法。如果没有授权，调用 ActivityCompat.requestPermissions() 方法来向用户申请授权，
    requestPermissions() 方法接收3个参数，第一个参数要求是Activity的实例，第二个参数是一个String 数组，
    我们把要申请的权限名放在数组中即可，第三个参数是请求码，只要是唯一值就可以了，这里传入了1。

    调用完了requestPermissions() 方法之后，系统会弹出一个权限申请的对话框，
    然后用户可以选择同意或拒绝我们的权限申请，不论是哪种结果，
    最终都会回调到onRequestPermissionsResult() 方法中，而授权的结果则会封装在grantResults 参数当中。
    这里我们只需要判断一下最后的授权结果，如果用户同意的话就调用call() 方法来拨打电话，
    如果用户拒绝的话我们只能放弃操作，并且弹出一条失败提示。
    
// <uses-permission android:name="android.permission.CALL_PHONE" />

package com.example.runtimepermission;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button makeCall = findViewById(R.id.button);
        makeCall.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(MainActivity.this, new String[]{
                            Manifest.permission.CALL_PHONE
                    }, 1);
                } else {
                    call();
                }

            }
        });
    }

    private void call() {
        try {
            Intent intent = new Intent(Intent.ACTION_CALL);
            intent.setData(Uri.parse("tel:10086"));
            startActivity(intent);
        } catch (SecurityException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case 1:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    call();
                } else {
                    Toast.makeText(this, "You denied the permission", Toast.LENGTH_SHORT).show();
                }
                break;
                default:
        }
    }
}
