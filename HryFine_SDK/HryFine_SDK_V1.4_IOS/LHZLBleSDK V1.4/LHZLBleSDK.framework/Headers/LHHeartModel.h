//
//  HeartModel.h
//  Watch
//
//  Created by Rocky on 2018/10/24.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHBaseModel.h"

@interface LHHeartModel : LHBaseModel

///时间格式 @"2020-11-11 09:11:12"
@property (strong, nonatomic) NSString *time;

/// 心率
@property (assign, nonatomic) unsigned long count;

@property (assign, nonatomic) unsigned long type;

@end
