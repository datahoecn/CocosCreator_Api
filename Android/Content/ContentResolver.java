内容提供器的用法一般有两种
	一种是使用现有的内容提供器来读取和操作相应程序中的数据
	另一种是创建自己的内容提供器给我们程序的数据提供外部访问接口

可以通过Context中的getContentResolver() 方法获取到该类的实例。

内容URI,由两部分组成：authority path
	authority是用于对不同的应用程序做区分的，一般为了避免冲突，都会采用程序包名的方式来进行命名。
	比如某个程序的包名是com.example.app，那么该程序对应的authority就可以命名为com.example.app.provider。
	path则是用于对同一应用程序中不同的表做区分的，通常都会添加到authority的后面。
	比如某个程序的数据库里存在两张表：table1和table2，这时就可以将path分别命名为/table1和/table2，
	然后把authority和path进行组合，内容URI就变成了com.example.app.provider/table1和com.example.app.provider/table2。
	不过，目前还很难辨认出这两个字符串就是两个内容URI，我们还需要在字符串的头部加上协议声明。
	因此，内容URI最标准的格式写法如下：
		content://com.example.app.provider/table1
		content://com.example.app.provider/table2

解析成Uri 对象
	Uri uri = Uri.parse("content://com.example.app.provider/table1")

查询table1表中的数据,返回的是一个Cursor 对象
	Cursor cursor = getContentResolver().query(
	    uri,			// 指定查询某个应用程序下的某一张表
	    projection,		// 指定查询的列名
	    selection, 		// 指定where 的约束条件
	    selectionArgs,  // 为where 中的占位符提供具体的值
	    sortOrder       // 指定查询结果的排序方式
    );

读取数据
	if (cursor != null) {
	 while (cursor.moveToNext()) {
	        String column1 = cursor.getString(cursor.getColumnIndex("column1"));
	        int column2 = cursor.getInt(cursor.getColumnIndex("column2"));
	    }
	    cursor.close();
	}

向 table1 表中添加一条数据
	ContentValues values = new ContentValues();
	values.put("column1", "text");
	values.put("column2", 1);
	getContentResolver().insert(uri, values);

更新这条新添加的数据
	ContentValues values = new ContentValues();
	values.put("column1", "");
	getContentResolver().update(uri, values, "column1 = ? and column2 = ?", new String[] {"text", "1"});

删除数据
	getContentResolver().delete(uri, "column2 = ?", new String[] { "1" });


访问其他应用程序的数据
	ContactsContract.CommonDataKinds.Phone 类提供了一个 CONTENT_URI 常量，而这个常量就是使用Uri.parse() 方法解析出来的结果。
	联系人姓名这一列对应的常量是 ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME ，
	联系人手机号这一列对应的常量是 ContactsContract.CommonDataKinds.Phone.NUMBER 

	<uses-permission android:name="android.permission.READ_CONTACTS" />

	package com.example.contactstest;

	import android.Manifest;
	import android.content.pm.PackageManager;
	import android.database.Cursor;
	import android.provider.ContactsContract;
	import android.support.annotation.NonNull;
	import android.support.v4.app.ActivityCompat;
	import android.support.v4.content.ContextCompat;
	import android.support.v7.app.AppCompatActivity;
	import android.os.Bundle;
	import android.widget.ArrayAdapter;
	import android.widget.ListView;
	import android.widget.Toast;

	import java.util.ArrayList;
	import java.util.List;

	public class MainActivity extends AppCompatActivity {

	    ArrayAdapter<String> adapter;

	    List<String> contactsList = new ArrayList<>();

	    @Override
	    protected void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        setContentView(R.layout.activity_main);
	        ListView contactsView = (ListView) findViewById(R.id.contacts_view);
	        adapter = new ArrayAdapter<String>(this, android.R.layout. simple_list_item_1, contactsList);
	        contactsView.setAdapter(adapter);
	        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
	            ActivityCompat.requestPermissions(this, new String[]{ Manifest.permission.READ_CONTACTS }, 1);
	        } else {
	            readContacts();
	        }
	    }

	    private void readContacts() {
	        Cursor cursor = null;
	        try {
	            // 查询联系人数据
	            cursor = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
	            if (cursor != null) {
	                while (cursor.moveToNext()) {
	                    // 获取联系人姓名
	                    String displayName = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
	                    // 获取联系人手机号
	                    String number = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
	                    contactsList.add(displayName + "\n" + number);
	                }
	                adapter.notifyDataSetChanged();
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        } finally {
	            if (cursor != null) {
	                cursor.close();
	            }
	        }
	    }

	    @Override
	    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
	        switch (requestCode) {
	            case 1:
	                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
	                    readContacts();
	                } else {
	                    Toast.makeText(this, "You denied the permission", Toast.LENGTH_SHORT).show();
	                }
	                break;
	            default:
	        }
	    }
	}


创建自己的内容提供器
	通过新建一个类去继承ContentProvider 的方式来创建一个自己的内容提供器。
	ContentProvider 类中有6个抽象方法，我们在使用子类继承它的时候，需要将这6个方法全部重写

	onCreate()
		初始化内容提供器的时候调用。
		通常会在这里完成对数据库的创建和升级等操作，
		返回true 表示内容提供器初始化成功，返回false 则表示失败。
	query()
		从内容提供器中查询数据。
		使用uri 参数来确定查询哪张表，projection 参数用于确定查询哪些列，selection 和selectionArgs 参数用于约束查询哪些行，sortOrder 参数用于对结果进行排序，查询的结果存放在Cursor 对象中返回。
	insert()
		向内容提供器中添加一条数据。
		使用uri 参数来确定要添加到的表，待添加的数据保存在values 参数中。添加完成后，返回一个用于表示这条新记录的URI。
	update()
		更新内容提供器中已有的数据。
		使用uri 参数来确定更新哪一张表中的数据，新数据保存在values 参数中，selection 和selectionArgs 参数用于约束更新哪些行，受影响的行数将作为返回值返回。
	delete()
		从内容提供器中删除数据。
		使用uri 参数来确定删除哪一张表中的数据，selection 和selectionArgs 参数用于约束删除哪些行，被删除的行数将作为返回值返回。
	getType()
		根据传入的内容URI来返回相应的MIME类型。

	以路径结尾就表示期望访问该表中所有的数据，以id结尾就表示期望访问该表中拥有相应id的数据
	一个标准的内容URI写法
		content://com.example.app.provider/table1
	加上一个id 表示调用方期望访问的是com.example.app这个应用的table1表中id为1的数据。
		content://com.example.app.provider/table1/1

		使用通配符的方式来分别匹配这两种格式的内容URI
			*：表示匹配任意长度的任意字符。
			#：表示匹配任意长度的数字。

			一个能够匹配任意表的内容URI格式
				content://com.example.app.provider/*
			一个能够匹配table1表中任意一行数据的内容URI格式
				content://com.example.app.provider/table1/#

UriMatcher中提供了一个 addURI() 方法，
	这个方法接收3个参数，可以分别把authority 、path 和一个自定义代码传进去。
	当调用UriMatcher的match() 方法时，就可以将一个Uri 对象传入，返回值是某个能够匹配这个Uri 对象所对应的自定义代码，
	利用这个代码，我们就可以判断出调用方期望访问的是哪张表中的数据了。修改MyProvider中的代码