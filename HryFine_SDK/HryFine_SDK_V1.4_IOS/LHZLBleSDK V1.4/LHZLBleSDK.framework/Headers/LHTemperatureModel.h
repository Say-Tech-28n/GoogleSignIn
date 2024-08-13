//
//  HFTemperatureModel.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/5/25.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LHTemperatureModel : NSObject

///时间格式 @"2020-11-11 09:11:12"
@property (strong, nonatomic) NSString *time;

///体温
@property (assign, nonatomic) double temperature;//整数小数合并后

///整数部分
@property (assign, nonatomic) int integerTemp;//整数

///小数部分
@property (assign, nonatomic) double decimalsTemp;//小数

@property (assign, nonatomic) unsigned long type;

@end

NS_ASSUME_NONNULL_END
