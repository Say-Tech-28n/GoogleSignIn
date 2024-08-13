//
//  HeartAutoModel.h
//  Watch
//
//  Created by Rocky on 2018/10/21.
//  Copyright © 2018年 Rocky. All rights reserved.
//

// 自动心率

#import "LHBaseModel.h"

@interface LHHeartAutoModel : LHBaseModel

//功能是否打开  0：关闭 1：开启
@property (assign, nonatomic) unsigned long open;
///睡眠占位
@property (assign, nonatomic) unsigned long sleep;
///测量频率最小为 1min， APP分为60：90：120 三个档位（暂定）
@property (assign, nonatomic) unsigned long rate;
/// 开启时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long start;
/// 关闭时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long end;


@property (strong, nonatomic) NSData *data;

@end
