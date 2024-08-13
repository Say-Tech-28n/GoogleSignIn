//
//  HFBloodOxyUtil.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/7/24.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHBloodOxyModel.h"
NS_ASSUME_NONNULL_BEGIN

@interface LHBloodOxyUtil : NSObject
+ (NSArray<LHBloodOxyModel *> *)bloodOxyModeltData:(NSData *)data;

@end

NS_ASSUME_NONNULL_END
