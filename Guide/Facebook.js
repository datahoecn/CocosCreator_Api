
Android 版应用事件入门指南
https://developers.facebook.com/docs/app-events/getting-started-app-events-android/?translation
应用面板
https://developers.facebook.com/apps

// 1. proj.android-studio/build.gradle 加入mavenCentral()
buildscript {
    repositories {
        mavenCentral()
    }
}

// 2. app/build.gradle 最低加入implementation 'com.facebook.android:facebook-android-sdk:[4,5)'
dependencies {
    implementation 'com.facebook.android:facebook-android-sdk:[4,5)'
}

// 3. AndroidManifest.xml 添加元素
<meta-data android:name="com.facebook.sdk.ApplicationId"
                android:value="@string/facebook_app_id"/>

// 4. strings.xml 加入
<string name="facebook_app_id">674285536409021</string>
<string name="fb_login_protocol_scheme">fb674285536409021</string>

// 5. 生成开发密钥散列
// 下载 openssl
// 在C:\Program Files\Java\jdk1.8.0_211\bin cmd 运行下面代码
keytool -exportcert -alias yaowei -keystore "D:\Projects\key\yaowei.keystore" | "D:\Downloads\chrome\bin\openssl" sha1 -binary | "D:\Downloads\chrome\bin\openssl" base64

// 6. 提供您的 Android 项目信息
com.happymath.gp
org.cocos2dx.javascript.MainActivity


Ios 
// 配置Facebook应用
https://developers.facebook.com/quickstarts/674285536409021/?platform=ios
// 下载 FacebookSDK
https://developers.facebook.com/docs/ios/downloads
https://github.com/facebook/facebook-objc-sdk/releases

// Xcode info.plist 加入
<key>CFBundleURLTypes</key>
<array>
  <dict>
  <key>CFBundleURLSchemes</key>
  <array>
    <string>fb674285536409021</string>
  </array>
  </dict>
</array>
<key>FacebookAppID</key>
<string>674285536409021</string>
<key>FacebookDisplayName</key>
<string>happymath</string>

// Bundle ID
happymath.ios.com
//AppDelegate.m
#import <FBSDKCoreKit/FBSDKCoreKit.h>


- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                         openURL:url
                                               sourceApplication:sourceApplication
                                                      annotation:annotation];
}

使用现成的sdkbox
  // connect 失败
  sdkbox.PluginFacebook.init();
  //打开/关闭Facebook的调试模式 sdkbox_config.json
  "Facebook":
{
    "debug":true
}



