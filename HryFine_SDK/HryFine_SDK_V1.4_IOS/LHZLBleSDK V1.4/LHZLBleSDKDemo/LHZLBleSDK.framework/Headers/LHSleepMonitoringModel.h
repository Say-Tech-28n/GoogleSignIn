//
//  SleepMonitoringModel.h
//  Watch
//
//  Created by Rocky on 2018/10/21.
//  Copyright © 2018年 Rocky. All rights reserved.
//

// 睡眠模式

#import "LHBaseModel.h"

@interface LHSleepMonitoringModel : LHBaseModel
/// 是否开启 1：开启 0：关闭
@property (assign, nonatomic) unsigned long open;
///开启时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long start;
///关闭时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long end;

@property (strong, nonatomic) NSData *data;

@end
