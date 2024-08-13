//
//  UIColor+YS.h
//  Watch
//
//  Created by Rocky on 2018/10/3.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIColor (YS)

+ (UIColor *)mainColor:(CGFloat)alpha;

+ (UIColor *)cellLineColor;

+ (UIColor *)colorWithHex:(NSInteger)hex;

+ (UIColor *)colorWithHex:(NSInteger)hex alpha:(CGFloat)alpha;

- (UIImage *)toImage;

+(int) getRgb565:(NSInteger)hex;

//+(int) getRgb888:(NSInteger)hex;


@end
