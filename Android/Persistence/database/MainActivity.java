查看表
    .sdk 的 platform-tools 路径添加到 系统变量 path 中
    .打开 cmd 输入 adb shell
    .如果是 $ 符号，输入 su ,如果提示 not found 是因为模拟器有 play store, 使用没 play store
    .输入 cd /data/data/com.example.database/databases/      com.example.database 是包名
        如果提示 No such file or directory 是因为没创建数据库
    .输入 ls 查看，
    .输入 sqlite3 BookStore.db 打开数据库
    .  .table 查看有那些表
    .  .schema 查看建表语句
    . select * from Book;  查看 Book 是表名
    . 输入 .exit 或 .quit 退出数据库编辑
    .输入 exit  退出设备控制台
    adb devices 显示设置
    如果 sqlite 出现 ...> 输入 ; 回车

SQLiteOpenHelper是一个抽象类，需要创建一个自己的帮助类去继承它。
SQLiteOpenHelper中有两个抽象方法，分别是onCreate() 和onUpgrade() ，
必须在自己的帮助类里面重写这两个方法，然后分别在这两个方法中去实现创建、升级数据库的逻辑。

SQLiteOpenHelper中有两个非常重要的实例方法：getReadableDatabase() 和getWritableDatabase() 
这两个方法都可以创建或打开一个现有的数据库（如果数据库已存在则直接打开，否则创建一个新的数据库），
并返回一个可对数据库进行读写操作的对象。不同的是，当数据库不可写入的时候（如磁盘空间已满），
getReadableDatabase() 方法返回的对象将以只读的方式去打开数据库，而getWritableDatabase() 方法则将出现异常。

SQLiteOpenHelper中有两个构造方法可供重写，一般使用参数少一点的那个构造方法即可。
这个构造方法中接收4个参数，第一个参数是Context，第二个参数是数据库名，创建数据库时使用的就是这里指定的名称。
第三个参数允许我们在查询数据的时候返回一个自定义的Cursor，一般都是传入null 。
第四个参数表示当前数据库的版本号，可用于对数据库进行升级操作。
构建出SQLiteOpenHelper的实例之后，再调用它的 getReadableDatabase() 或 getWritableDatabase() 方法就能够创建数据库了，
数据库文件会存放在/data/data/<package name>/databases/目录下。此时，重写的onCreate() 方法也会得到执行，

Book表，表中有id（主键）、作者、价格、页数和书名等列

integer 表示整型，real 表示浮点型，text 表示文本类型，blob 表示二进制类型
使用 primary key 将id 列设为主键，并用autoincrement 关键字表示id 列是自增长的。

调用了SQLiteDatabase的execSQL() 方法去执行这条建表语句
没有BookStore.db这个数据库，会创建该数据库并调用MyDatabaseHelper中的onCreate()，有就不创建不调用

若 BookStore.db数据库已经存在了，点击Create database，
MyDatabaseHelper 中的 onCreate() 方法都不会再次执行，因此新添加的表也就无法得到创建了。
version ++ 调用 onUpgrade 执行了两条DROP 语句，如果发现数据库中已经存在Book表或Category表了，就将这两张表删除掉，onCreate 也会调用


数据进行的操作4种，即CRUD。
C代表添加（Create），R代表查询（Retrieve），U代表更新（Update），D代表删除（Delete）
    insert() 用于添加数据的，每次点击都会创建新的。参数1 表名
        参数2 用于在未指定添加数据的情况下给某些可为空的列自动赋值NULL ，一般我们用不到这个功能，直接传入null 即可。
        参数3 是一个 ContentValues 对象，它提供了一系列的put() 方法重载，用于向ContentValues 中添加数据，
            只需要将表中的每个列名以及相应的待添加数据传入即可。
        将id 列设置为自增长了，它的值会在入库的时候自动生成
    update() 用于对数据进行更新，参数1 表名，
        参数2是ContentValues 对象，要把更新数据在这里组装进去。
        第三、第四个参数用于约束更新某一行或某几行中的数据，不指定的话默认就是更新所有行。
        第三个参数对应的是SQL语句的where 部分，表示更新所有 name 等于? 的行，而? 是一个占位符，
        可以通过第四个参数提供的一个字符串数组为第三个参数中的每个占位符指定相应的内容。
        因此上述代码想表达的意图是将名字是The Da Vinci Code的这本书的价格改成10.99。
    delete() 专门用于删除数据，第一个参数仍然是表名，
        第二、第三个参数又是用于约束删除某一行或某几行的数据，不指定的话默认就是删除所有行。
        范例通过第二、第三个参数来指定仅删除那些页数超过500页的书
    query() 方法用于对数据进行查询，最短的一个方法重载也需要传入7个参数。
        第一个参数表名，第二个参数用于指定去查询哪几列，如果不指定则默认查询所有列。
        第三、第四个参数用于约束查询某一行或某几行的数据，不指定则默认查询所有行的数据。
        第五个参数用于指定需要去group by的列，不指定则表示不对查询结果进行group by操作。
        第六个参数用于对group by之后的数据进行进一步的过滤，不指定则表示不进行过滤。
        第七个参数用于指定查询结果的排序方式，不指定则表示使用默认的排序方式
        table           from table_name             指定查询的表名
        columns         select column1, column2     指定查询的列名
        selection       where column = value        指定where 的约束条件
        selectionArgs       -                       为where 中的占位符提供具体的值
        groupBy         group by column             指定需要group by 的列
        having          having column = value       对group by 后的结果进一步约束
        orderBy         order by column1, column2   指定查询结果的排序方式
        范例 第一个参数指明去查询Book表，后面的参数全部为null 。
        这就表示希望查询这张表中的所有数据，查询完之后就得到了一个Cursor 对象，
        接着调用它的moveToFirst() 方法将数据的指针移动到第一行的位置，
        然后进入了一个循环当中，去遍历查询到的每一行数据。在这个循环中可以通过Cursor 的getColumnIndex() 方法获取到某一列在表中对应的位置索引，
        然后将这个索引传入到相应的取值方法中，就可以得到从数据库中读取到的数据了

package com.example.database;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    private MyDatabaseHelper dbHelper;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        dbHelper = new MyDatabaseHelper(this, "BookStore.db", null, 2);
        Button createButton = findViewById(R.id.button);
        createButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dbHelper.getWritableDatabase();
            }
        });

        Button addData = findViewById(R.id.button2);
        addData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                ContentValues values = new ContentValues();
                // 开始组装第一条数据
                values.put("name", "The Da VinCi Code");
                values.put("author", "Dan Brown");
                values.put("pages", 454);
                values.put("price", 16.96);
                db.insert("Book", null, values); // 插入第一条数据
                values.clear();
                // 开始组装第二条数据
                values.put("name", "The Lost Symbol");
                values.put("author", "Dan Brown");
                values.put("pages", 510);
                values.put("price", 19.95);
                db.insert("Book", null, values); // 插入第二条数据
            }
        });

        Button updateData = findViewById(R.id.button3);
        updateData.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                ContentValues values = new ContentValues();
                values.put("price", 10.99);
                db.update("Book", values, "name = ?", new String[] { "The Da VinCi Code" });
            }
        });

        Button deleteButton = findViewById(R.id.button4);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                db.delete("Book", "pages > ?", new String[] { "500" });
            }
        });

        Button queryButton = findViewById(R.id.button5);
        queryButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SQLiteDatabase db = dbHelper.getWritableDatabase();
                // 查询Book表中所有的数据
                Cursor cursor = db.query("Book", null, null, null, null, null, null);
                if (cursor.moveToFirst()) {
                    do {
                        // 遍历Cursor对象，取出数据并打印
                        String name = cursor.getString(cursor.getColumnIndex("name"));
                        String author = cursor.getString(cursor.getColumnIndex("author"));
                        int pages = cursor.getInt(cursor.getColumnIndex("pages"));
                        double price = cursor.getDouble(cursor.getColumnIndex("price"));
                        Log.d("MainActivity", "book name is " + name);
                        Log.d("MainActivity", "book author is " + author);
                        Log.d("MainActivity", "book pages is " + pages);
                        Log.d("MainActivity", "book price is " + price);
                    } while (cursor.moveToNext());
                }
                cursor.close();
            }
        });
    }
}
