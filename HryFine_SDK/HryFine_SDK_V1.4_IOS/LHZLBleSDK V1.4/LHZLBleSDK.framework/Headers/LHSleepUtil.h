//
//  SleepUtil.h
//  Watch
//
//  Created by Rocky on 2018/10/28.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "LHSleepModel.h"

@interface LHSleepUtil : NSObject


/**
  获取睡眠数据
 */
+ (LHSleepModel *)sleepData:(NSData *)data;

@end
