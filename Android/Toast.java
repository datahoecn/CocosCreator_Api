Toast 是一种非常友好的提醒方式

import android.widget.Toast;
// 第一个参数是 Context，上下文，活动本身就是一个 Context
// 第二个参数是显示内容
// 第三个是显示时长，内置常量 Toast.LENGTH_SHORT Toast.LENGTH_LONG
Toast.makeText(FirstActivity.this, "You clicked Btn", Toast.LENGTH_SHORT).show();