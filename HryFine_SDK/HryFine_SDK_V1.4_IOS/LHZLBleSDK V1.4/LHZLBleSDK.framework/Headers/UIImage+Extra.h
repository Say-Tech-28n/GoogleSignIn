//
//  UIImage+Extra.h
//  ZXCore
//
//  Created by mac on 15-1-26.
//  Copyright (c) 2015年 dgc. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIImage (Extra)

/**
 *  制作缩略图，将一张图片画在指定大小区域内
 *
 *  @param size 尺寸
 *
 *  @return UIImage
 */
- (UIImage *)imageDrawInSize:(CGSize)size;

/**
 *  制作缩略图，将一张图片画在指定大小区域内 返回数据流
 *
 *  @param size 尺寸
 *
 *  @return NSData
 */
- (NSData *)dataDrawInSize:(CGSize)size;

/**
 *  质量压缩一个图片 scale压缩比例,一般取0.75
 *
 *  @param scale 压缩比例
 *
 *  @return UIImage
 */
- (UIImage *)imageCompressWithScale:(CGFloat)scale;

/**
 *  质量压缩一张图片,返回数据流
 *
 *  @param scale 压缩比例
 *
 *  @return NSData
 */
- (NSData *)dataCompressWithScale:(CGFloat)scale;

/**
 *  生成一张纯色图片
 *
 *  @param color 颜色
 *  @param size  尺寸
 *  @param alpha 透明度
 *
 *  @return UIImage
 */
+ (UIImage *)imageWithColor:(UIColor *)color size:(CGSize)size alpha:(float)alpha;

/**
 *  生成一张纯色图片
 *
 *  @param color 颜色
 *  @param size  尺寸
 *
 *  @return UIImage
 */
+ (UIImage *)imageWithColor:(UIColor *)color size:(CGSize)size;

/**
 *  设置图片透明度
 *
 *  @param alpha 透明度,取值范围0-1
 *
 *  @return UIImage
 */
- (UIImage *)imageByApplyingAlpha:(CGFloat)alpha;

/**
 *  修补图片方向
 *
 *  @return UIImage
 */
- (UIImage *)fixOrientation;

/**
 *  给image添加一个水印
 *
 *  @param mask  水印图片
 *  @param size  生成图片尺寸
 *  @param frame 水印位置和大小
 *
 *  @return UIImage
 */
-(UIImage *)imageWithWaterMask:(UIImage *)mask imageSize:(CGSize)size maskFrame:(CGRect)frame;


/// 压缩图片到指定尺寸
/// @param image <#image description#>
/// @param maxLength <#maxLength description#>
- (NSData *)compressImageSize:(UIImage *)image toByte:(NSUInteger)maxLength;

@end
