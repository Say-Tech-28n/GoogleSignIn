//
//  SleepModel.h
//  Watch
//
//  Created by Rocky on 2018/10/28.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LHSleepModel : NSObject

///时间格式 @"2020-11-11"
@property (copy, nonatomic) NSString *time;

/// 深睡时间 从当天0点算起的分钟数
@property (assign, nonatomic) unsigned long deep;
/// 浅睡时间 从当天0点算起的分钟数
@property (assign, nonatomic) unsigned long light;
/// 清醒时间 分钟数
@property (assign, nonatomic) unsigned long awake;
///分钟数：从当天的 0  点算起的分钟数
@property (assign, nonatomic) unsigned long startTimeOffset;
///分钟数：从当天的0 点算起的分钟数
@property (assign, nonatomic) unsigned long endTimeOffset;


@end
