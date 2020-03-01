FileUtils
API   CCFileUtils.h
	1:jsb是javascript bind的代表，整个C/C++ 导出的绑定都在这个jsb里面,jsb 支持native，不支持h5（浏览器上无法运行jsb is not defined ）;
	2: FileUtils是本地文件读写的一个工具类,全局只有一个实例;
	3: jsb.fileUtils来获取文件读写工具类的实例;
	4: jsb.fileUtils.isDirectoryExist(path): 判断路径是否存在;
	5: jsb.fileUtils.createDirectory(path); 创建一个路径;
	6: jsb.fileUtils.getDataFromFile(path)获取二进制数据; // Uint8Array文本
	7: jsb.fileUtils.writeDataToFile(data,path); 写二进制数据; // Uint8Array 对象
	8: jsb.fileUtils.writeStringToFile(data,path); 写文本文件; // data String对象
	9: jsb.fileUtils.getStringFromFile(path); 获取文本数据; // data String
	9: jsb.fileUtils.removeFile(path); 删除掉一个文件;
	10: jsb.fileUtils.getWritablePath(); 获取文件的可写目录,是一个内部存储的目录，我们的手机OS会为每个APP分配一个可读写的路径，但是这个App如果卸载以后，这个数据也会被删除;
　　如果你要想保存到本地有又是持久的，你可以写入外部存储，外部存储的这个路径也是适用于fileUtils工具类的;

    onLoad: function () {
        // jsb.fileUtils 获取全局的工具类的实例, cc.director;
        // 如果是在电脑的模拟器上，就会是安装路径下模拟器的位置;
        // 如果是手机上，那么就是手机OS为这个APP分配的可以读写的路径; 
        // jsb --> javascript binding --> jsb是不支持h5的
        var writeable_path = jsb.fileUtils.getWritablePath();
        console.log(writeable_path);


        // 要在可写的路径先创建一个文件夹
        var new_dir = writeable_path + "new_dir";
        // 路径也可以是 外部存储的路径，只要你有可写外部存储的权限;
        // getWritablePath 这个路径下，会随着我们的程序卸载而删除,外部存储除非你自己删除，否者的话，卸载APP数据还在;
        if(!jsb.fileUtils.isDirectoryExist(new_dir)) {
            jsb.fileUtils.createDirectory(new_dir);
        }
        else {
            console.log("dir is exist!!!");
        }
        
        // 读写文件我们分两种,文本文件, 二进制文件;
        // (1)文本文件的读,返回的是一个string对象
        var str_data = jsb.fileUtils.getStringFromFile(new_dir + "/test_str_read.txt"); 
        console.log(str_data);
        str_data = "hello test_write !!!!!"
        jsb.fileUtils.writeStringToFile(str_data, new_dir + "/test_str_write.txt");
        // (2)二进制文件的读写, Uint8Array --> js对象
        var bin_array = jsb.fileUtils.getDataFromFile(new_dir + "/test_bin_read.png");
        console.log(bin_array[0], bin_array[1]); // 使用这个就能访问二进制的每一个字节数据;
        jsb.fileUtils.writeDataToFile(bin_array, new_dir + "/test_bin_write.png");
        // end 

        // 删除文件和文件夹
        // jsb.fileUtils.removeFile(new_dir + "/test_bin_write.png"); 
        // jsb.fileUtils.removeDirectory(new_dir);
    },