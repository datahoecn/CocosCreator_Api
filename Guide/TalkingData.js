Android
    1. 在 app 下 新建文件夹 libs

    2. 把 SDK 拷贝到 libs 文件夹里

    3. 在 AndroidManifest.xml 文件里增加如下：
        <uses-permission android:name="android.permission.INTERNET"/>
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
        <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
        <uses-permission android:name="android.permission.READ_PHONE_STATE"/>

    4.在 AppActivity.java 文件里增加如下：
    	import com.tendcloud.tenddata.TalkingDataGA;
        import com.tendcloud.tenddata.TDGAAccount;
        import com.tendcloud.tenddata.TDGAMission;
        import android.content.SharedPreferences;
        import android.util.Log;

    	protected void onCreate(Bundle savedInstanceState) {
    	    super.onCreate(savedInstanceState);
    	    TalkingDataGA.init(this, "F69AD027C4004BCFA2E35E0B01C57791", "play.Android.com");
    	    loadData();
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



日志
    static String mDebugTag = "================AppActivity: ";
    static void logError(String msg) {
        Log.e(mDebugTag, msg);
    }
        
初始化
    // static TDGAAccount account;
    public static void TalkingLevel(int level) {
        account.setLevel(level);
    }

    setLevelTalking: function(num) {
        if(typeof(jsb)!="undefined"){
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "TalkingLevel", "(I)V",num);
        }else{
            cc.log("玩家等级:",num);
        }
    },

自定义事件
    import java.util.Map;
    import java.util.TreeMap;

    static Map<String,Object> map;
    public static void TalkingEvnet(int rankNum, int timeNum,int defeatNum) {
        map = new TreeMap<>();
        map.put("rank",String.valueOf(rankNum));
        map.put("defeat",String.valueOf(defeatNum));
        map.put("curTime",String.valueOf(timeNum));
        TalkingDataGA.onEvent("gameOver", map);
    }

    public static void TalkingEvnet(String str) {
        TalkingDataGA.onEvent(str);
    }

    talkingOnEvent: function(rankNum, timeNum, defeatNum) {
          if(typeof(jsb)!="undefined"){
             jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "TalkingEvnet", "(III)V",rankNum, timeNum, defeatNum);
          }else{
             cc.log("排名：" + rankNum);
             cc.log("剩余时间：" + timeNum);
             cc.log("击败数：" + defeatNum);
          }
    },

定义闯关
    public static void TalkingBegin(String str) {
        TDGAMission.onBegin(str); 
    }
    public static void TalkingCompleted(String str) {
        TDGAMission.onCompleted(str);
    }
    public static void TalkingFailed(String str) {
        TDGAMission.onFailed(str, "gameOver");
    }

    TalkingBegin: function(str) {
        if(typeof(jsb)!="undefined"){
           jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "TalkingBegin", "(Ljava/lang/String;)V",str);
        }else{
           cc.log(str,"开始闯关");
        }
     },

     TalkingCompleted: function(str) {
        if(typeof(jsb)!="undefined"){
           jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "TalkingCompleted", "(Ljava/lang/String;)V",str);
        }else{
           cc.log(str,"闯关成功");
        }
     },

     TalkingFailed: function(str) {
        if(typeof(jsb)!="undefined"){
           jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "TalkingFailed", "(Ljava/lang/String;)V",str);
        }else{
           cc.log(str,"闯关失败");
        }
     },

    var str = num;
    if(num < 10){
         str = "00" + num;
    }else if(num < 100) {
         str = "0" + num;
    }