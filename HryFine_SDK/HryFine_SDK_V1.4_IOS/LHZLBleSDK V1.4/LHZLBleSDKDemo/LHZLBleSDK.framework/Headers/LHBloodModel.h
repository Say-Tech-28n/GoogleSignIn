//
//  BoolModel.h
//  Watch
//
//  Created by lianhezhuli on 2019/7/31.
//  Copyright © 2019 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHBaseModel.h"
NS_ASSUME_NONNULL_BEGIN

@interface LHBloodModel : LHBaseModel

///时间格式 @"2020-11-11 09:11:12"
@property (strong, nonatomic) NSString *time;

///高压
@property (assign, nonatomic) int highBlood;

///低压
@property (assign, nonatomic) int lowBlood;

@property (assign, nonatomic) unsigned long type;

@end

NS_ASSUME_NONNULL_END
