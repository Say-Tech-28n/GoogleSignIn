//
//  HFDialOfDeviceSupport.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/7/1.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "HFDialModel.h"
///手表支持的表盘信息
@interface HFDeviceSupportDialModel : NSObject
///表盘个数
@property (nonatomic, assign) NSInteger DialCount;
///当前可自定义表盘编码
@property (nonatomic, assign) NSInteger  customDialCode;
///墙纸推送最大值
@property (nonatomic, assign) NSInteger  wallpaperPushCount;
///表盘推送最大值
@property (nonatomic, assign) NSInteger  DialPushCount;
///表盘列表
@property (nonatomic, copy) NSMutableArray<HFDialModel*> *DialCodeArray;

@property (nonatomic, strong) NSData *data;

@end

