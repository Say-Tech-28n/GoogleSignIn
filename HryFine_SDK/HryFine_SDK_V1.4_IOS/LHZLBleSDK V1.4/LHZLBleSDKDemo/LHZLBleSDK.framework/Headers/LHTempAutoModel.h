//
//  HFTempAutoModel.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/5/25.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHBaseModel.h"

NS_ASSUME_NONNULL_BEGIN

/// 体温model
@interface LHTempAutoModel : LHBaseModel
///  使能 0：关闭 1：开启
@property (assign, nonatomic) unsigned long open;
///  频率 1min APP分为60：90：120 三个档位
@property (assign, nonatomic) unsigned long rate;
///开启时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long start;
///关闭时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long end;

@property (strong, nonatomic) NSData *data;
@end

NS_ASSUME_NONNULL_END
