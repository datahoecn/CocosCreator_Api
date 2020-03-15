AlertDialog 可以在当前的界面弹出一个对话框
这个对话框置顶于所有界面元素之上，能够屏蔽掉其他控件的交互能力


AlertDialog.Builder dialog = new AlertDialog.Builder(FirstActivity.this);
dialog.setTitle("This is Dialog");
dialog.setMessage("Something important");
dialog.setCancelable(false); // 是否可以用 Back 关闭对话框
// 设置确定按钮的点击事件
dialog.setPositiveButton("OK", new DialogInterface.OnClickListener() {
    @Override
    public void onClick(DialogInterface dialogInterface, int i) {
        
    }
});
// 设置取消按钮的点击事件
dialog.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
    @Override
    public void onClick(DialogInterface dialogInterface, int i) {
        
    }
});
dialog.show();

ProgressDialog 和 AlertDialog 类似
ProgressDialog 会在对话框中显示一个进度条

	ProgressDialog progressDialog = new ProgressDialog(FirstActivity.this);
	progressDialog.setTitle("This is Dialog");
	progressDialog.setMessage("Loading......");
	progressDialog.setCancelable(true);
	progressDialog.show();

	progressDialog.dismiss(); // 关掉对话框