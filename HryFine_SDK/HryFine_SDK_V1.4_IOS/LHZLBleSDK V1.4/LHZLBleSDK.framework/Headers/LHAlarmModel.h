//
//  AlarmModel.h
//  Watch
//
//  Created by Rocky on 2018/10/21.
//  Copyright © 2018年 Rocky. All rights reserved.
//



#import <Foundation/Foundation.h>
#import "LHBaseModel.h"
/// 闹钟提醒
@interface LHAlarmModel : LHBaseModel

@property (strong, nonatomic) NSData *alarmdata;
///年 与 2000 年的差值
@property (assign, nonatomic) unsigned long year;
///月份
@property (assign, nonatomic) unsigned long month;
///日
@property (assign, nonatomic) unsigned long day;
///时
@property (assign, nonatomic) unsigned long hour;
///分
@property (assign, nonatomic) unsigned long min;
///序列号
@property (assign, nonatomic) unsigned long number;
///占位
@property (assign, nonatomic) unsigned long none;

/// 表示周一重复设置：1：重复  0：不重复
@property (assign, nonatomic) unsigned long d1;
/// 表示周二重复设置：1：重复  0：不重复
@property (assign, nonatomic) unsigned long d2;
/// 表示周三重复设置：1：重复  0：不重复
@property (assign, nonatomic) unsigned long d3;
/// 表示周四重复设置：1：重复  0：不重复
@property (assign, nonatomic) unsigned long d4;
/// 表示周五重复设置：1：重复  0：不重复
@property (assign, nonatomic) unsigned long d5;
/// 表示周六重复设置：1：重复  0：不重复
@property (assign, nonatomic) unsigned long d6;
/// 表示周日重复设置：1：重复  0：不重复
@property (assign, nonatomic) unsigned long d7;
@end
