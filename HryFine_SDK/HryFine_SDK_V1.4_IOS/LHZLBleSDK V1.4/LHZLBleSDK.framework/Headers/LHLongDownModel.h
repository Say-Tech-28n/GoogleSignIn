//
//  LongDownModel.h
//  Watch
//
//  Created by Rocky on 2018/10/21.
//  Copyright © 2018年 Rocky. All rights reserved.
//

/// 久坐提醒model

#import "LHBaseModel.h"

@interface LHLongDownModel : LHBaseModel


@property (assign, nonatomic) unsigned long open; // 是否开启
/// 开启时间 以小时为单位，范围0~23
@property (assign, nonatomic) unsigned long start;
/// 关闭时间 以小时为单位，范围0~23
@property (assign, nonatomic) unsigned long end;
/** 久坐时间 15分钟为单位，最小档为45分钟，最长为120分钟可以选  计算公式：time * 15 + 30 。注意 UI分为 显示分钟数，比如time = 1,  UI显示按公式 = 45。设置时反推
 */
@property (assign, nonatomic) unsigned long time;
/**
 阈值: 久坐时间内，步数下发15步，即活动少于15步提醒
 */
@property (assign, nonatomic) unsigned long threshold;
///午休免打扰  1：开启 0：关闭
@property (assign, nonatomic) unsigned long noonBreak;

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

@property (strong, nonatomic) NSData *data;


@end
