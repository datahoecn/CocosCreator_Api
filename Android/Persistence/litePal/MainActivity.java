网址，也有教程
https://github.com/lijie00004/LitePal

声明
    dependencies {
        implementation 'org.litepal.android:java:3.0.0'
    }

在 app/src/main 目录下新建 assets 目录，在 assets 目录下新建 litepal.xml , 内容见范例
    <dbname>指定数据库名，<version>指定版本号，<list>指定所有的映射模型

在 Mainfest 添加 android:name="org.litepal.LitePalApplication"

创建 Book 类  生成 getter 和 setter 快捷方式，先将字段定义好，按下 Alt + Insert ，选择 Getter and Setter , 再使用 Shift 选中全部，点击 ok

使用<mapping>声明要配置的映射模型类
    <mapping class="com.example.litepal.Book" />

LitePal.getDatabase(); 创建数据库
    增加或删除类，或类的成员，只要版本号加1 ，升级数据库，就可以了
    添加数据 save
    更新数据 updateAll
        在Java中任何一种数据类型的字段都会有默认值，
        例如int 类型的默认值是0，boolean 类型的默认值是false ，String 类型的默认值是null 。
        那么当new出一个Book 对象时，其实所有字段都已经被初识化成默认值了，比如说pages 字段的值就是0。
        因此，如果我们想把数据库表中的pages 列更新成0，直接调用book.setPages(0) 是不可以的，
        因为即使不调用这行代码，pages 字段本身也是0，LitePal此时是不会对这个列进行更新的。
        对于所有想要将为数据更新成默认值的操作，LitePal统一提供了一个setToDefault() 方法，然后传入相应的列名就可以实现了
        Book book = new Bool();
        book.setTodefault("pages"); 将所有书的页数都更新为0，因为updateAll() 方法中没有指定约束条件
        book.updateAll();
    删除数据 deleteAll 第一个参数用于指定删除哪张表中的数据，Book.class就意味着删除Book表中的数据，后面的参数用于指定约束条件
    查询数据 findAll
        findFirst 询Book表中的第一条数据
        findLast 查询Book表中的最后一条数据
        
        select("name", "author").find(Book.class); 指定查询哪几列的数据，只查name 和author 这两列的数据
        where("pages > ?", "400").find(Book.class); 指定查询的约束条件
        order("price desc").find(Book.class); 指定结果的排序方式  将查询结果按照书价从高到低排序 其中desc 表示降序排列，asc 或者不写表示升序排列。
        limit(3).find(Book.class); 指定查询结果的数量 比如只查表中的前3条数据
        .limit(3).offset(1).find(Book.class); 指定查询结果的偏移量，比如查询表中的第2条、第3条、第4条数据
        组合
        查询Book表中第11~20条满足页数大于400这个条件的name 、author 和pages 这3列数据，并将查询结果按照页数升序排列
        LitePal.select("name", "author", "pages")
                              .where("pages > ?", "400")
                              .order("pages")  


package com.example.litepal;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import org.litepal.LitePal;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button createDatabse = findViewById(R.id.button);
        createDatabse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LitePal.getDatabase();
            }
        });
        Button addData = findViewById(R.id.button2);
        addData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Book book = new Book();
                book.setName("The Da VinCi Code");
                book.setAuthor("Dan Brown");
                book.setPages(454);
                book.setPrice(16.96);
                book.setPress("UnKnow");
                book.save();
            }
        });

        Button updateData = findViewById(R.id.button3);
        updateData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Book book = new Book();
                book.setPrice(14.95);
                book.setPress("Anchor");
                book.updateAll("name = ? and author = ?", "The Da VinCi Code", "Dan Brown");
            }
        });

        Button deleteButton = findViewById(R.id.button4);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                LitePal.deleteAll(Book.class, "price < ?", "15");
            }
        });

        Button queryButton = findViewById(R.id.button5);
        queryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                List<Book> books = LitePal.findAll(Book.class);
                for (Book book: books) {
                    Log.d("MainActivity", "book name is " + book.getName());
                    Log.d("MainActivity", "book author is " + book.getAuthor());
                    Log.d("MainActivity", "book pages is " + book.getPages());
                    Log.d("MainActivity", "book price is " + book.getPrice());
                    Log.d("MainActivity", "book press is " + book.getPress());
                }
            }
        });
    }
}
