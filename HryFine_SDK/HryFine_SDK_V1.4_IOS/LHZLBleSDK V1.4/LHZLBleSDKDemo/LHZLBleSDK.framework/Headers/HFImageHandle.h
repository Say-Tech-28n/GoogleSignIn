//
//  HFImageHandle.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/7/4.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
NS_ASSUME_NONNULL_BEGIN

@interface HFImageHandle : NSObject
@property (nonatomic,copy) NSMutableArray *dataBuffer;
@property (nonatomic,strong) NSData *imgData;
@property (nonatomic,strong) UIImage *image;

-(void)handleImageData;
//将图片保存到本地
+ (void)SaveImageToLocal:(UIImage*)image;

//从本地获取图片
+ (UIImage*)GetImageFromLocal;

//本地是否有图片
+ (BOOL)LocalHaveImage:(NSString*)key ;

//将图片从本地删除
+ (void)RemoveImageToLocalKeys:(NSString*)key;
@end

NS_ASSUME_NONNULL_END
