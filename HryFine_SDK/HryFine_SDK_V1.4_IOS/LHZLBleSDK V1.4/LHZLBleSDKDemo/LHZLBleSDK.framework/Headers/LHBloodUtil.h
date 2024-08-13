//
//  BoolUtil.h
//  Watch
//
//  Created by lianhezhuli on 2019/7/31.
//  Copyright © 2019 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHBloodUtil.h"
#import "LHBloodModel.h"
NS_ASSUME_NONNULL_BEGIN

@interface LHBloodUtil : NSObject

+ (NSArray<LHBloodModel *> *)boolData:(NSData *)data;

@end

NS_ASSUME_NONNULL_END
