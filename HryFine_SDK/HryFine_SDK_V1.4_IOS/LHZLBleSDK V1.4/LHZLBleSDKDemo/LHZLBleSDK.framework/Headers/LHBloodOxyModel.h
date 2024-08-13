//
//  HFBloodOxyModel.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/7/24.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LHBloodOxyModel : NSObject

///时间格式 @"2020-11-11 09:11:12"
@property (strong, nonatomic) NSString *time;

/// 血氧
@property (assign, nonatomic) unsigned long count;

@property (assign, nonatomic) unsigned long type;
@end

NS_ASSUME_NONNULL_END
