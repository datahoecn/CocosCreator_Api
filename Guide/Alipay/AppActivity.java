/****************************************************************************
Copyright (c) 2015-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package org.cocos2dx.javascript;

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import android.os.Bundle;

import android.content.Intent;
import android.content.res.Configuration;

import com.tendcloud.tenddata.TalkingDataGA;
import com.tendcloud.tenddata.TDGAAccount;
import android.content.SharedPreferences;


import java.util.Map;

import com.alipay.sdk.app.AuthTask;
import com.alipay.sdk.app.PayTask;
import org.cocos2dx.javascript.util.OrderInfoUtil2_0;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Handler;
import android.os.Message;
//import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.widget.Toast;

import com.alipay.sdk.app.EnvUtils;


public class AppActivity extends Cocos2dxActivity {

    public static final String APPID = "2016101200668891";

    public static final String PID = "";

    public static final String TARGET_ID = "";

    public static final String RSA2_PRIVATE = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCNoQ62XHEjDTM0wR2qNw7yvOgSaZwIGfOO+yLpvGzg2HbjmgftD+jaMHu9yV8Ro43Yo/l+rLk8IAgCVshBK+gVOfHUTmtKhU54z3M7HTUbDtrusC047tvH2STPFNVhIOmxXaDKxKl2oE78FJsvOf8FKw8uUT1OoqoYmqfmAGvI1giPjMdNYWOMUy+yW7/gSZmg7B3G6lNsVWZ803jT9HrfOAFl99ybzBp2Ttx8KedCnyIy8B1oxJFB/SxOJLeeE7RREZLq7mQq8hZMIP5ADVJZHKqbEFxdEI4t19pA13VPm1HjN3Z7WjTcrXbp35FpTNDzL2GbLaH+Hu7sOZDIQoz5AgMBAAECggEAew19R+qHjgnQ/LvxN0wBG9wP0reZjtxlZkxC6EwDWVQZ7+SLkGgrSy+mw52rkRrGinzlsC8H/fpimw2ljiJE0fR3bZv40lWCearclnbpBiphA9NkZzv5DulWdunF/07mXGlZ4/L8vgnItnJ85oqATZA872Q8XQ8ttJTi3g5tl5870YDgoftyRvtZs0L8HFLjMoWVPap3R/K7o834FuKj3W8CZDF60grzV1aj9iPTBTkW8rWzJx0Hahm4jwywloA+Y/I1gHRvYAoN9MBYnT4c24dD4A1hAcDEY23/1ptaIa08IOtYy9eJxYqW6iz/u7UUP8hDHm32I3FuQXMJFhYl1QKBgQDFtjlxTVf95k7tDpARCBNsdZxyje6BpKjZ7NvMrraIlJeZXDv5p3+KB+n2+DuaDLOUmG4joEXTiX6ZrH3x0zutlWwZBQeZRGZWqzCGG2sadaj86AlW4U9YZuFgkcVuDBxCI149lG7EXDtSopDUYnUauKWB35B6ZMQmleY9QBIYUwKBgQC3YiQddeemWe88CFoY7Gut+W9UdJiLzwd66eMJbTszWeCPFXbaKr/uaEehqhxhEZfI/G36iOsCMBkGnNy6tYsKEEdW4ZKBKn1/ItiyrB5IHsdqv+3xcK/XgtuA2iGRO69yc4iFwPfr+MbJwm/Ju8DVHbH3+wTZghzjnUBPkOosAwKBgHfLQqDZCTCpBDd0dGwtZX94/5MVVmcs+rYYYtFxJt44kmZ00U4iZA+hXeyrWYmsmn61oT5q1QQoMhIwxprorycs+zNprcH7BLsMvLj1Ef8VPZAHk+kVWXsp0vMtP9++7LxSK77KGhdV/wfBwlk9UtEfAgFgEW1ncsYiWz/Pe2dLAoGBAK2VjWABojO5v5WQxk//QnIcwQAtmdQFNSxoxgq/RaF2+vQVujoK60CtnthtYI2VjJqoLyZOgj3A739t7hYiECmHfS/FN9tiMAavInYGLGfSEqt+X6oCI8CY0lQmpk2GNK3epKUPIt5Pz0Nd9Fj9iytv/20fQ9jrq5Lc3+ow3yinAoGAISj7R7Lu29HjDrGbe6porzPd2FXuBdYnpCwkKyCb+tgRwMROR3AKCk0HNiCuwxNo0YwkHJ4ULtcI4UbNyhJEOWDmsWEIltjQARrmPQKVCiZPSLV8PkekWm+ZpLfOuY00AwtJJgzuD94j09Mj27efOjIJGno/k0tC3SPJCnhThwg=";
    public static final String RSA_PRIVATE = "";
    
    private static final int SDK_PAY_FLAG = 1;
    private static final int SDK_AUTH_FLAG = 2;

    public static boolean isPay = false;
    public static String alipayResult = null;

    public static AppActivity appContext = null;

    @SuppressLint("HandlerLeak")
    private static Handler mHandler = new Handler() {
        @SuppressWarnings("unused")
        public void handleMessage(Message msg) {
            switch (msg.what) {
            case SDK_PAY_FLAG: {
                @SuppressWarnings("unchecked")
                PayResult payResult = new PayResult((Map<String, String>) msg.obj);
                /**
                 * 对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
                 */
                alipayResult = payResult.getResult();// 同步返回需要验证的信息
                String resultStatus = payResult.getResultStatus();
                // 判断resultStatus 为9000则代表支付成功
                if (TextUtils.equals(resultStatus, "9000")) {
                    // 该笔订单是否真实支付成功，需要依赖服务端的异步通知。
                    isPay = true;
                    showToast(appContext, "支付成功");
                    //showAlert(PayDemoActivity.this, getString(R.string.pay_success) + payResult);
                } else {
                    // 该笔订单真实的支付结果，需要依赖服务端的异步通知。
                    isPay = false;
                    showToast(appContext, "支付失败");
                    //showAlert(PayDemoActivity.this, getString(R.string.pay_failed) + payResult);
                }
                break;
            }
            case SDK_AUTH_FLAG: {
                @SuppressWarnings("unchecked")
                AuthResult authResult = new AuthResult((Map<String, String>) msg.obj, true);
                String resultStatus = authResult.getResultStatus();

                // 判断resultStatus 为“9000”且result_code
                // 为“200”则代表授权成功，具体状态码代表含义可参考授权接口文档
                if (TextUtils.equals(resultStatus, "9000") && TextUtils.equals(authResult.getResultCode(), "200")) {
                    // 获取alipay_open_id，调支付时作为参数extern_token 的value
                    // 传入，则支付账户为该授权账户
                    showToast(appContext, "授权成功\n" + String.format("authCode:%s", authResult.getAuthCode()));
                    //showAlert(PayDemoActivity.this, getString(R.string.auth_success) + authResult);
                } else {
                    // 其他状态值则为授权失败
                    showToast(appContext, "授权失败\n" + String.format("authCode:%s", authResult.getAuthCode()));
                    //showAlert(PayDemoActivity.this, getString(R.string.auth_failed) + authResult);
                }
                break;
            }
            default:
                break;
            }
        };
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        appContext = AppActivity.this;
        EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
        super.onCreate(savedInstanceState);
        TalkingDataGA.init(this, "3ADE5F28022E4A0F89208A155CA68CE2", "play.Android.com");
        loadData();
        // Workaround in https://stackoverflow.com/questions/16283079/re-launch-of-activity-on-home-button-but-only-the-first-time/16447508
        if (!isTaskRoot()) {
            // Android launched another instance of the root activity into an existing task
            //  so just quietly finish and go away, dropping the user back into the activity
            //  at the top of the stack (ie: the last state of this task)
            // Don't need to finish it again since it's finished in super.onCreate .
            return;
        }
        // DO OTHER INITIALIZATION BELOW
        SDKWrapper.getInstance().init(this);
        //setContentView(R.layout.pay_main);
    }

    public static void payV2() {
        if (TextUtils.isEmpty(APPID) || (TextUtils.isEmpty(RSA2_PRIVATE) && TextUtils.isEmpty(RSA_PRIVATE))) {
            //showAlert(this, getString(R.string.error_missing_appid_rsa_private));
            return;
        }
    
        boolean rsa2 = (RSA2_PRIVATE.length() > 0);
        Map<String, String> params = OrderInfoUtil2_0.buildOrderParamMap(APPID, rsa2);
        String orderParam = OrderInfoUtil2_0.buildOrderParam(params);

        String privateKey = rsa2 ? RSA2_PRIVATE : RSA_PRIVATE;
        String sign = OrderInfoUtil2_0.getSign(params, privateKey, rsa2);
        final String orderInfo = orderParam + "&" + sign;
        
        final Runnable payRunnable = new Runnable() {

            @Override
            public void run() {
                PayTask alipay = new PayTask(appContext);
                Map<String, String> result = alipay.payV2(orderInfo, true);
                Log.i("msp", result.toString());
                
                Message msg = new Message();
                msg.what = SDK_PAY_FLAG;
                msg.obj = result;
                mHandler.sendMessage(msg);
            }
        };

        // 必须异步调用
        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    //判断是否支付成功
    public static boolean isPaySuccess(){
        logError("isPaySuccess");
        return isPay;
    }
    //支付成功之后调用该方法获得支付信息
    public static String getPayResult(){
        logError("getPayResult");
        if(alipayResult != null){
            //返回支付结果信息
            return alipayResult.toString();
        }else{
            //返回空字符串
            return "";
        }
    }


    private static void showToast(Context ctx, String msg) {
        Toast.makeText(ctx, msg, Toast.LENGTH_LONG).show();
    }

    private static String bundleToString(Bundle bundle) {
        if (bundle == null) {
            return "null";
        }
        final StringBuilder sb = new StringBuilder();
        for (String key: bundle.keySet()) {
            sb.append(key).append("=>").append(bundle.get(key)).append("\n");
        }
        return sb.toString();
    }

    @Override
    public Cocos2dxGLSurfaceView onCreateView() {
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        // TestCpp should create stencil buffer
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8);
        SDKWrapper.getInstance().setGLSurfaceView(glSurfaceView, this);

        return glSurfaceView;
    }

    @Override
    protected void onResume() {
        super.onResume();
        SDKWrapper.getInstance().onResume();

    }

    @Override
    protected void onPause() {
        super.onPause();
        SDKWrapper.getInstance().onPause();

    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        SDKWrapper.getInstance().onDestroy();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        SDKWrapper.getInstance().onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        SDKWrapper.getInstance().onNewIntent(intent);
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        SDKWrapper.getInstance().onRestart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        SDKWrapper.getInstance().onStop();
    }
        
    @Override
    public void onBackPressed() {
        SDKWrapper.getInstance().onBackPressed();
        super.onBackPressed();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        SDKWrapper.getInstance().onConfigurationChanged(newConfig);
        super.onConfigurationChanged(newConfig);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        SDKWrapper.getInstance().onRestoreInstanceState(savedInstanceState);
        super.onRestoreInstanceState(savedInstanceState);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        SDKWrapper.getInstance().onSaveInstanceState(outState);
        super.onSaveInstanceState(outState);
    }

    @Override
    protected void onStart() {
        SDKWrapper.getInstance().onStart();
        super.onStart();
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
}
