package com.example.databasetest;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;

UriMatcher中提供了一个 addURI() 方法，这个方法接收3个参数，可以分别把authority 、path 和一个自定义代码传进去。这样，当调用UriMatcher的match() 方法时，就可以将一个Uri 对象传入，返回值是某个能够匹配这个Uri 对象所对应的自定义代码，利用这个代码，我们就可以判断出调用方期望访问的是哪张表中的数据了
MyProvider中新增了4个整型常量，其中TABLE1_DIR 表示访问table1表中的所有数据，TABLE1_ITEM 表示访问table1表中的单条数据，TABLE2_DIR 表示访问table2表中的所有数据，TABLE2_ITEM 表示访问table2表中的单条数据。接着在静态代码块里我们创建了UriMatcher的实例，并调用addURI() 方法，将期望匹配的内容URI格式传递进去，注意这里传入的路径参数是可以使用通配符的。然后当query() 方法被调用的时候，就会通过UriMatcher的match() 方法对传入的Uri 对象进行匹配，如果发现UriMatcher中某个内容URI格式成功匹配了该Uri 对象，则会返回相应的自定义代码，然后我们就可以判断出调用方期望访问的到底是什么数据了。
getType() 方法。它是所有的内容提供器都必须提供的一个方法，用于获取Uri 对象所对应的MIME类型。一个内容URI所对应的MIME字符串主要由3部分组成，Android对这3个部分做了如下格式规定。

必须以vnd 开头。

如果内容URI以路径结尾，则后接android.cursor.dir/ ，如果内容URI以id结尾，则后接android.cursor.item/ 。

最后接上vnd.<authority>.<path> 。
对于content://com.example.app.provider/table1这个内容URI，它所对应的MIME类型就可以写成：
vnd.android.cursor.dir/vnd.com.example.app.provider.table1

对于content://com.example.app.provider/table1/1这个内容URI，它所对应的MIME类型就可以写成：
vnd.android.cursor.item/vnd.com.example.app.provider.table1

首先在类的一开始，同样是定义了4个常量，
分别用于表示访问Book表中的所有数据、访问Book表中的单条数据、访问Category表中的所有数据和访问Category表中的单条数据。
然后在静态代码块里对UriMatcher进行了初始化操作，将期望匹配的几种URI格式添加了进去。
接下来就是每个抽象方法的具体实现了，先来看下onCreate() 方法，这个方法的代码很短，就是创建了一个MyDatabaseHelper的实例，然后返回true 表示内容提供器初始化成功，这时数据库就已经完成了创建或升级操作。

接着看一下query() 方法，在这个方法中先获取到了SQLiteDatabase的实例，然后根据传入的Uri 参数判断出用户想要访问哪张表，
再调用SQLiteDatabase的query() 进行查询，并将Cursor 对象返回就好了。
注意当访问单条数据的时候有一个细节，这里调用了Uri 对象的getPathSegments() 方法，
它会将内容URI权限之后的部分以“/”符号进行分割，并把分割后的结果放入到一个字符串列表中，
那这个列表的第0个位置存放的就是路径，第1个位置存放的就是id了。得到了id之后，再通过selection 和selectionArgs 参数进行约束，
就实现了查询单条数据的功能。

再往后就是insert() 方法，同样它也是先获取到了SQLiteDatabase的实例，然后根据传入的Uri 参数判断出用户想要往哪张表里添加数据，再调用SQLiteDatabase的insert() 方法进行添加就可以了。注意insert() 方法要求返回一个能够表示这条新增数据的URI，所以我们还需要调用Uri.parse() 方法来将一个内容URI解析成Uri 对象，当然这个内容URI是以新增数据的id结尾的。

接下来就是update() 方法了，相信这个方法中的代码已经完全难不倒你了。也是先获取SQLiteDatabase的实例，然后根据传入的Uri 参数判断出用户想要更新哪张表里的数据，再调用SQLiteDatabase的update() 方法进行更新就好了，受影响的行数将作为返回值返回。

下面是delete() 方法，是不是感觉越到后面越轻松了？因为你已经渐入佳境，真正地找到窍门了。这里仍然是先获取到SQLiteDatabase的实例，然后根据传入的Uri 参数判断出用户想要删除哪张表里的数据，再调用SQLiteDatabase的delete() 方法进行删除就好了，被删除的行数将作为返回值返回。

最后是getType() 方法，这个方法中的代码完全是按照上一节中介绍的格式规则编写的，相信已经没有什么解释的必要了。这样我们就将内容提供器中的代码全部编写完了。

另外还有一点需要注意，内容提供器一定要在AndroidManifest.xml文件中注册才可以使用。不过幸运的是，
由于我们是使用Android Studio的快捷方式创建的内容提供器，因此注册这一步已经被自动完成了。打开AndroidManifest.xml文件瞧一瞧
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.databasetest">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        ...
        <provider
            android:name=".DatabaseProvider"
            android:authorities="com.example.databasetest.provider"
            android:enabled="true"
            android:exported="true">
        </provider>
    </application>

</manifest>

可以看到，<application> 标签内出现了一个新的标签<provider> ，我们使用它来对DatabaseProvider这个内容提供器进行注册。
android:name 属性指定了DatabaseProvider的类名，android:authorities 属性指定了DatabaseProvider的authority，而enabled 和exported 属性则是根据我们刚才勾选的状态自动生成的，这里表示允许DatabaseProvider被其他应用程序进行访问。



添加数据的时候，首先调用了Uri.parse() 方法将一个内容URI解析成Uri 对象，然后把要添加的数据都存放到ContentValues 对象中，接着调用ContentResolver 的insert() 方法执行添加操作就可以了。注意insert() 方法会返回一个Uri 对象，这个对象中包含了新增数据的id，我们通过getPathSegments() 方法将这个id取出，稍后会用到它。

查询数据的时候，同样是调用了Uri.parse() 方法将一个内容URI解析成Uri 对象，然后调用ContentResolver 的query() 方法去查询数据，查询的结果当然还是存放在Cursor 对象中的。之后对Cursor 进行遍历，从中取出查询结果，并一一打印出来。

更新数据的时候，也是先将内容URI解析成Uri 对象，然后把想要更新的数据存放到ContentValues 对象中，再调用ContentResolver 的update() 方法执行更新操作就可以了。注意这里我们为了不想让Book表中的其他行受到影响，在调用Uri.parse() 方法时，给内容URI的尾部增加了一个id，而这个id正是添加数据时所返回的。这就表示我们只希望更新刚刚添加的那条数据，Book表中的其他行都不会受影响。
删除数据的时候，也是使用同样的方法解析了一个以id结尾的内容URI，然后调用ContentResolver 的delete() 方法执行删除操作就可以了。由于我们在内容URI里指定了一个id，因此只会删掉拥有相应id的那行数据，Book表中的其他数据都不会受影响。

public class DatabaseProvider extends ContentProvider {

    public static final int BOOK_DIR = 0;

    public static final int BOOK_ITEM = 1;

    public static final int CATEGORY_DIR = 2;

    public static final int CATEGORY_ITEM = 3;

    public static final String AUTHORITY = "com.example.databasetest.provider";

    private static UriMatcher uriMatcher;

    private MyDatabaseHelper dbHelper;

    static {
        uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
        uriMatcher.addURI(AUTHORITY, "book", BOOK_DIR);
        uriMatcher.addURI(AUTHORITY, "book/#", BOOK_ITEM);
        uriMatcher.addURI(AUTHORITY, "category", CATEGORY_DIR);
        uriMatcher.addURI(AUTHORITY, "category/#", CATEGORY_ITEM);
    }

    @Override
    public boolean onCreate() {
        dbHelper = new MyDatabaseHelper(getContext(), "BookStore.db", null, 2);
        return true;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        // 查询数据
        SQLiteDatabase db = dbHelper.getReadableDatabase();
        Cursor cursor = null;
        switch (uriMatcher.match(uri)) {
            case BOOK_DIR:
                cursor = db.query("Book", projection, selection, selectionArgs, null, null, sortOrder);
                break;
            case BOOK_ITEM:
                String bookId = uri.getPathSegments().get(1);
                cursor = db.query("Book", projection, "id = ?", new String[] { bookId }, null, null, sortOrder);
                break;
            case CATEGORY_DIR:
                cursor = db.query("Category", projection, selection, selectionArgs, null, null, sortOrder);
                break;
            case CATEGORY_ITEM:
                String categoryId = uri.getPathSegments().get(1);
                cursor = db.query("Category", projection, "id = ?", new String[] { categoryId }, null, null, sortOrder);
                break;
            default:
                break;
        }
        return cursor;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        // 添加数据
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        Uri uriReturn = null;
        switch (uriMatcher.match(uri)) {
            case BOOK_DIR:
            case BOOK_ITEM:
                long newBookId = db.insert("Book", null, values);
                uriReturn = Uri.parse("content://" + AUTHORITY + "/book/" + newBookId);
                break;
            case CATEGORY_DIR:
            case CATEGORY_ITEM:
                long newCategoryId = db.insert("Category", null, values);
                uriReturn = Uri.parse("content://" + AUTHORITY + "/category/" + newCategoryId);
                break;
            default:
                break;
        }
        return uriReturn;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        // 更新数据
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        int updatedRows = 0;
        switch (uriMatcher.match(uri)) {
            case BOOK_DIR:
                updatedRows = db.update("Book", values, selection, selectionArgs);
                break;
            case BOOK_ITEM:
                String bookId = uri.getPathSegments().get(1);
                updatedRows = db.update("Book", values, "id = ?", new String[] { bookId });
                break;
            case CATEGORY_DIR:
                updatedRows = db.update("Category", values, selection, selectionArgs);
                break;
            case CATEGORY_ITEM:
                String categoryId = uri.getPathSegments().get(1);
                updatedRows = db.update("Category", values, "id = ?", new String[] { categoryId });
                break;
            default:
                break;
        }
        return updatedRows;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        // 删除数据
        SQLiteDatabase db = dbHelper.getWritableDatabase();
        int deletedRows = 0;
        switch (uriMatcher.match(uri)) {
            case BOOK_DIR:
                deletedRows = db.delete("Book", selection, selectionArgs);
                break;
            case BOOK_ITEM:
                String bookId = uri.getPathSegments().get(1);
                deletedRows = db.delete("Book", "id = ?", new String[] { bookId });
                break;
            case CATEGORY_DIR:
                deletedRows = db.delete("Category", selection, selectionArgs);
                break;
            case CATEGORY_ITEM:
                String categoryId = uri.getPathSegments().get(1);
                deletedRows = db.delete("Category", "id = ?", new String[] { categoryId });
                break;
            default:
                break;
        }
        return deletedRows;
    }

    @Override
    public String getType(Uri uri) {
        switch (uriMatcher.match(uri)) {
            case BOOK_DIR:
                return "vnd.android.cursor.dir/vnd.com.example.databasetest. provider.book";
            case BOOK_ITEM:
                return "vnd.android.cursor.item/vnd.com.example.databasetest. provider.book";
            case CATEGORY_DIR:
                return "vnd.android.cursor.dir/vnd.com.example.databasetest. provider.category";
            case CATEGORY_ITEM:
                return "vnd.android.cursor.item/vnd.com.example.databasetest. provider.category";
        }
        return null;
    }

}