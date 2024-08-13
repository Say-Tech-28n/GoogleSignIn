//
//  LHRealTimeModel.h
//  LHZLBleSDK
//
//  Created by lianhezhuli on 2020/10/13.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/// 实时步数model
@interface LHRealTimeModel : NSObject
/// 步数
@property (assign, nonatomic) unsigned long steps;
/// 距离 单位M
@property (assign, nonatomic) unsigned long distance;
/// 消耗卡路里， 单位为卡
@property (assign, nonatomic) unsigned long calorie;

@end

NS_ASSUME_NONNULL_END
