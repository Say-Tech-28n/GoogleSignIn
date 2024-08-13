//
//  LHLogManager.h
//  LHZLBleSDK
//
//  Created by lianhezhuli on 2020/10/7.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN
/// 默认值为NO
static BOOL kLHLogEnable = NO;
#define LHLog(format,...)  [LHLogManager customLogWithFunction:__FUNCTION__ lineNumber:__LINE__ formatString:[NSString stringWithFormat:format, ##__VA_ARGS__]]
@interface LHLogManager : NSObject

/// 是否开启log
/// @param enable ture is  open ，default is NO.
+ (void)setLogEnable:(BOOL)enable;

+ (void)customLogWithFunction:(const char *)function lineNumber:(int)lineNumber formatString:(NSString *)formatString;
@end

NS_ASSUME_NONNULL_END
