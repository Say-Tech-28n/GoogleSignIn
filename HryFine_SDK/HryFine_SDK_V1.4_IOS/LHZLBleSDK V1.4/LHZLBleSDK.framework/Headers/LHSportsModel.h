//
//  SportsModel.h
//  Watch
//
//  Created by rocky on 2018/10/24.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LHSportsModel : NSObject

/// 步数
@property (assign, nonatomic) unsigned long steps;

/// 时长（分钟）
@property (assign, nonatomic) unsigned long duration;

/// 距离
@property (assign, nonatomic) unsigned long distance;

// 时间偏移量（每天 0 点开始， 每 15 分钟偏移 加一）
@property (assign, nonatomic) unsigned long timeOffset;

///  0x01:慢走 0x02:快走 0x03:奔跑
@property (assign, nonatomic) unsigned long mode;

/// 消耗卡路里， 单位为卡
@property (assign, nonatomic) unsigned long calorie;

/// 时间格式 @"2020-11-11 09:11:12"
@property (copy, nonatomic) NSString *time;


@end
