1. 在 res 目录下新建 menu 文件夹；(右击 res 文件夹 -> New -> Directory)
2. 在 menu 目录下新建 main.xml; (右击 menu 文件夹 -> New -> Menu resource file)

	import android.view.Menu;
    import android.view.MenuItem;
    import android.widget.Toast;

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater 获得 MenuInflater 对象
		调用 inflate 给当前活动创建菜单，第一个参数是指定资源文件，第二个指定菜单项添加到哪个 Menu 这里使用的是参数 menu
		返回 true 显示创建的菜单，否则反之
	    getMenuInflater().inflate(R.menu.main, menu);
	    return true;
	}

	@Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.add_item:
                Toast.makeText(this, "You clicked Add", Toast.LENGTH_SHORT).show();
                break;
            case R.id.remove_item:
                Toast.makeText(this, "You clicked Remove", Toast.LENGTH_SHORT).show();
                break;
                default:
        }
        return true;
    }