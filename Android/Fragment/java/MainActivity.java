
碎片是一种可以嵌入获得当中的 UI 片段
    .通过继承 Fragment 类来创建碎片
    .在活动的布局文件中声明碎片
动态添加碎片步骤
    .创建待添加碎片的实例 AnotherRightFragment；
    .获取 FragmentManager
    .开启一个事务，调用 beginTransaction 开启；
    .向容器添加或替换碎片 replace
    .提交事务
package com.example.fragment;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button button = (Button) findViewById(R.id.button);
        button.setOnClickListener(this);
        replaceFragment(new RightFragment());
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button:
                replaceFragment(new AnotherRightFragment());
                break;
                default:
                    break;
        }
    }
    动态添加碎片
    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        参数1 id 参数2 碎片实例
        transaction.replace(R.id.right_layout, fragment);
            将事务添加的返回栈，
            如果添加，点击 Back 键会返回上一个碎片
            如果不添加，直接退出程序
            参数 一般传入 null 
            transaction.addToBackStack(null);
        transaction.commit();
    }
}

碎片和活动通信
    MainActivity.java
    RightFragment rightFragment = (RightFragment) getSupportFragmentManager().findFragmentById((R.id.right_layout));

    RightFragment.java
    MainActivity activity = (MainActivity) getActivity();
    如果需要 Context ，也可以使用 getActivity

碎片生命周期
    运行状态：碎片可见，所关联的活动处于运行状态
    暂停状态：碎片可见，所关联的活动处于暂停状态
    停止状态：所关联的活动处于停止状态，或者调用 FragmentTransaction.remove() or replace() 将碎片从活动中移除，并且调用了 addToBackStack
    销毁状态：当活动被销毁，关联的碎片也进入销毁状态，或者调用 FragmentTransaction.remove() or replace() 将碎片从活动中移除，没有调用了 addToBackStack

    活动的回调，碎片都有，以下是没有的：
        onAttach 当碎片和活动建立关联的时候调用
        onCreateView 为碎片创建视图（加载布局）时调用
        onActivityCreated 确保与碎片关联的活动一定已经创建完毕的时候调用
        onDestroyView 当与碎片关联的视图被移除的时候调用
        onDetach 当碎片和活动解除关联时调用

    启动碎片
        onAttach onCreate onCreateView onActivityCreated onStart onResume
    替换其它碎片，调用了 addToBackStack
        onPause onStop onDestroyView
    返回
        onCreateView onActivityCreated onStart onResume
    点击 Back 键
        onPause onStop onDestroyView onDestroy onDetach

在碎片中可以通过 onSaveInstanceState() 保存数据，
在 onCreate onCreateView onActivityCreated 中重新得到