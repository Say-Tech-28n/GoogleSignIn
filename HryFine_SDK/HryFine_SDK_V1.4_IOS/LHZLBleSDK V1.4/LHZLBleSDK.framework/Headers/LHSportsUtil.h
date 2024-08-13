//
//  SportsUtil.h
//  Watch
//
//  Created by rocky on 2018/10/24.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHSportsModel.h"
#import "LHRealTimeModel.h"

@interface LHSportsUtil : NSObject

+ (NSArray<LHSportsModel *> *)sportsData:(NSData *)data;

+ (LHRealTimeModel *)realTimeSteps:(NSData *)data;

@end
