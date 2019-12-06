Android
    1. 在 app 下 新建文件夹 libs

    2. 把 SDK 拷贝到 libs 文件夹里

    3. 在 AndroidManifest.xml 文件里增加如下：
        <uses-permission android:name="android.permission.INTERNET"/>
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE">
        <uses-permission android:name="android.permission.READ_PHONE_STATE">

    4.在 AppActivity.java 文件里增加如下：
    	import com.tendcloud.tenddata.TalkingDataGA;
    	import com.tendcloud.tenddata.TDGAAccount;
    	import android.content.SharedPreferences;
    	import android.util.Log;

    	protected void onCreate(Bundle savedInstanceState) {
    	    super.onCreate(savedInstanceState);
    	    TalkingDataGA.init(this, "F69AD027C4004BCFA2E35E0B01C57791", "play.Android.com");
    	    loadData();
    	}

    	static String mDebugTag = "================AppActivity: ";
        static void logError(String msg) {
            Log.e(mDebugTag, msg);
        }

        public static void TalkingEvnet(String str) {
            TalkingDataGA.onEvent(str);
        }

        void loadData() {
            SharedPreferences sp = getPreferences(MODE_PRIVATE);
            int max=1000000000,min=10000000;
            long randomNum = System.currentTimeMillis();  
            randomNum = (randomNum%(max-min)+min);
            String ran = Long.toString(randomNum);
            String userId = sp.getString("userId", ran);
            saveData(userId);
            TDGAAccount account = TDGAAccount.setAccount(userId);
        }

        void saveData(String userId) {
            SharedPreferences.Editor spe = getPreferences(MODE_PRIVATE).edit();
            spe.putString("userId", userId);
            spe.apply();
        }

    5.如果混淆报错：
        app/build.gradle 修改 minifyEnabled 和 shrinkResources 为 false