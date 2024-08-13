//
//  AppDelegate.m
//  LHZLBleSDKDemo
//
//  Created by lianhezhuli on 2020/10/7.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import "AppDelegate.h"
#import "CommandViewController.h"

#import "MtkBaseNavigationController.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    self.window = [[UIWindow alloc]initWithFrame:UIScreen.mainScreen.bounds];
      self.window.backgroundColor= [UIColor whiteColor];
      MtkBaseNavigationController *nav = [[MtkBaseNavigationController alloc]initWithRootViewController: [CommandViewController new]];
      self.window.rootViewController = nav;
      [self.window makeKeyAndVisible];
    return YES;
}


#pragma mark - UISceneSession lifecycle


@end
