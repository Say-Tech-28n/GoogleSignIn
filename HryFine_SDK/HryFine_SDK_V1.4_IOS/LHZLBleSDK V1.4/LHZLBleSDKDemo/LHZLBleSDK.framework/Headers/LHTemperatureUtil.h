//
//  HFTemperatureUtil.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/5/25.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHTemperatureModel.h"
NS_ASSUME_NONNULL_BEGIN

@interface LHTemperatureUtil : NSObject
+ (NSArray<LHTemperatureModel *> *)TempData:(NSData *)data;
@end

NS_ASSUME_NONNULL_END
