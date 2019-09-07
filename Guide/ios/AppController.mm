
// #import "AppController.h"
// #import "cocos2d.h"
// #import "AppDelegate.h"
// #import "RootViewController.h"
// #import "SDKWrapper.h"
// #import "platform/ios/CCEAGLView-ios.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>



// using namespace cocos2d;

// @implementation AppController

// Application* app = nullptr;
// @synthesize window;

// #pragma mark -
// #pragma mark Application lifecycle

// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    [TalkingDataGA onStart:@"3ADE5F28022E4A0F89208A155CA68CE2" withChannelId:@"ios.com"];
    TDGAAccount *tdgaAccount = [TDGAAccount setAccount:[TalkingDataGA getDeviceId]];
    //[self touchesBegan];
    [[FBSDKApplicationDelegate sharedInstance] application:application
                             didFinishLaunchingWithOptions:launchOptions];
//     [[SDKWrapper getInstance] application:application didFinishLaunchingWithOptions:launchOptions];
//     // Add the view controller's view to the window and display.
//     float scale = [[UIScreen mainScreen] scale];
//     CGRect bounds = [[UIScreen mainScreen] bounds];
//     window = [[UIWindow alloc] initWithFrame: bounds];
    
//     // cocos2d application instance
//     app = new AppDelegate(bounds.size.width * scale, bounds.size.height * scale);
//     app->setMultitouch(true);
    
//     // Use RootViewController to manage CCEAGLView
//     _viewController = [[RootViewController alloc]init];
// #ifdef NSFoundationVersionNumber_iOS_7_0
//     _viewController.automaticallyAdjustsScrollViewInsets = NO;
//     _viewController.extendedLayoutIncludesOpaqueBars = NO;
//     _viewController.edgesForExtendedLayout = UIRectEdgeAll;
// #else
//     _viewController.wantsFullScreenLayout = YES;
// #endif
//     // Set RootViewController to window
//     if ( [[UIDevice currentDevice].systemVersion floatValue] < 6.0)
//     {
//         // warning: addSubView doesn't work on iOS6
//         [window addSubview: _viewController.view];
//     }
//     else
//     {
//         // use this method on ios6
//         [window setRootViewController:_viewController];
//     }
    
//     [window makeKeyAndVisible];
    
//     [[UIApplication sharedApplication] setStatusBarHidden:YES];
    
//     //run the cocos2d-x game scene
//     app->start();
    
//     return YES;
// }

// + (void)TalkingEvent:(NSString *)event_id{
//     NSDictionary *dict = @{};
//     [TalkingDataGA onEvent:event_id eventData:dict];
// }

// - (void)applicationWillResignActive:(UIApplication *)application {
//     [[SDKWrapper getInstance] applicationWillResignActive:application];
// }
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ];
  // Add any custom logic here.
  return handled;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:sourceApplication
    annotation:annotation
  ];
  // Add any custom logic here.
  return handled;
}

//- (void)applicationDidBecomeActive:(UIApplication *)application {

    [FBSDKAppEvents activateApp];
//     [[SDKWrapper getInstance] applicationDidBecomeActive:application];
// }

// - (void)applicationDidEnterBackground:(UIApplication *)application {
//     /*
//      Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
//      If your application supports background execution, called instead of applicationWillTerminate: when the user quits.
//      */
//     [[SDKWrapper getInstance] applicationDidEnterBackground:application];
//     app->applicationDidEnterBackground();
    
// }

// - (void)applicationWillEnterForeground:(UIApplication *)application {
    
//      Called as part of  transition from the background to the inactive state: here you can undo many of the changes made on entering the background.
     
//     [[SDKWrapper getInstance] applicationWillEnterForeground:application];
//     app->applicationWillEnterForeground();
    
// }

// - (void)applicationWillTerminate:(UIApplication *)application
// {
//     [[SDKWrapper getInstance] applicationWillTerminate:application];
//     delete app;
//     app = nil;
// }


// #pragma mark -
// #pragma mark Memory management

// - (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
//     /*
//      Free up as much memory as possible by purging cached data objects that can be recreated (or reloaded from disk) later.
//      */
// }
-(void)touchesBegan{
    RechargeVC *reVC = [[RechargeVC alloc] init];
    [reVC buy];
    
}
@end
