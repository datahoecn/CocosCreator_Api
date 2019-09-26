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

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.ImageView;

import org.cocos2d.CocosCreatorAndroidStartupBooster.R;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

public class SloganSplashActivity extends Cocos2dxActivity {
	
	private static Cocos2dxActivity sCocos2dxActivity;
	
	private static ImageView sSplashBgImageView = null;
	
	//	private static ImageView sSplashSloganImageView = null;
	
	private static void showSplash() {
		// 添加和主题一样的背景色
		sSplashBgImageView = new ImageView(sCocos2dxActivity);
		sSplashBgImageView.setImageResource(R.drawable.splash_slogan_with_bg);
		sSplashBgImageView.setScaleType(ImageView.ScaleType.FIT_XY);
		sCocos2dxActivity.addContentView(sSplashBgImageView,
				new WindowManager.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
						FrameLayout.LayoutParams.MATCH_PARENT
				)
		);
		
		//		// 添加Slogan
		//		sSplashSloganImageView = new ImageView(sCocos2dxActivity);
		//		sSplashSloganImageView.setImageResource(R.drawable.splash_slogan_with_bg);
		//		sSplashSloganImageView.setScaleType(ImageView.ScaleType.FIT_XY);
		//		sCocos2dxActivity.addContentView(sSplashSloganImageView,
		//				new WindowManager.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT,
		//						FrameLayout.LayoutParams.MATCH_PARENT
		//				)
		//		);
	}
	
	/**
	 * 这是给 CC JS 调用的隐藏原生开屏图标的方法
	 */
	public static void hideSplash() {
		sCocos2dxActivity.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				if (sSplashBgImageView != null) {
					sSplashBgImageView.setVisibility(View.GONE);
				}
			}
		});
	}
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		sCocos2dxActivity = this;
		showSplash();
	}