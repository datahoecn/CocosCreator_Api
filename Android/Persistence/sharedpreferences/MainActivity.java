获取 SharedPreferences
    getSharedPreferences("data", MODE_PRIVATE) 参数1 指定文件名称，如果不存在会创建，位置 /data/data/<package name>/shared_prefs/
                                                参数2 指定操作模式，目前只有 MODE_PRIVATE 表示只有当前程序才可读写
    PreferenceManager.getDefaultSharedPreferences(this) 静态方法 接收一个 Context 参数，自动将包名作为前缀来命名文件

调用 edit() 方法，获取 SharedPreferences.Editor
editor.clear();// 清除数据






package com.example.sharedpreferences;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button buttonSave = findViewById(R.id.button);
        buttonSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences.Editor editor = getSharedPreferences("data", MODE_PRIVATE).edit();
                editor.putString("name", "Tom");
                editor.putInt("age", 28);
                editor.putBoolean("married", false);
                editor.apply();
            }
        });
        Button buttonRead = findViewById(R.id.button2);
        buttonRead.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences pref = getSharedPreferences("data", MODE_PRIVATE);
                String name = pref.getString("name", "");
                int age = pref.getInt("age", 0);
                boolean married = pref.getBoolean("married", false);
                Log.d("MainActivity", "name is " + name);
                Log.d("MainActivity", "age is " + age);
                Log.d("MainActivity", "married is " + married);
            }
        });
    }
}
