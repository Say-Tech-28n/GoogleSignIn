//
//  RaiseHandModel.h
//  Watch
//
//  Created by Rocky on 2018/10/21.
//  Copyright © 2018年 Rocky. All rights reserved.
//

// 抬手亮屏

#import "LHBaseModel.h"

@interface LHRaiseHandModel : LHBaseModel
///功能是否打开  0：关闭 1：开启
@property (assign, nonatomic) unsigned long open; // 1byte 使能 0：关闭 1：开启
/// 开启时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long start; // 2byte (APP-Device高八位在前，低八位在后)
/// 关闭时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long end; // 2byte (APP-Device高八位在前，低八位在后)

@property (strong, nonatomic) NSData *data;

@end
