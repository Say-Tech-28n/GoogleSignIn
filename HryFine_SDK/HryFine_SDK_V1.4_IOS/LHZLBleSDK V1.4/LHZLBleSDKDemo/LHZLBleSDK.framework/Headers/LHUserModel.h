//
//  LHUserModel.h
//  LHZLBleSDK
//
//  Created by lianhezhuli on 2020/10/8.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//
///个人信息model
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LHUserModel : NSObject
///性别 0：女1：男 1bit   默认 1
@property (assign, nonatomic)  unsigned long sex;

///年龄 0~127 7bit   默认25岁
@property (assign, nonatomic)  unsigned long age;

///身高 0~256 9bit   默认175cm
@property (assign, nonatomic)  unsigned long height;

///体重 0~512 10bit   默认65kg
@property (assign, nonatomic)  unsigned long weight;

- (void)setData:(NSData *)data;
@end

NS_ASSUME_NONNULL_END
