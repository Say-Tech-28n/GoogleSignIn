//
//  HeartUtil.h
//  Watch
//
//  Created by Rocky on 2018/10/24.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHHeartUtil.h"
#import "LHHeartModel.h"

@interface LHHeartUtil : NSObject
+ (NSArray<LHHeartModel *> *)heartData:(NSData *)data;

@end
