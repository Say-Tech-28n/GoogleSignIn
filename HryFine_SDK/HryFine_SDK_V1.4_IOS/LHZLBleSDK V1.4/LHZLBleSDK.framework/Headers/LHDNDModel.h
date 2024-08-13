//
//  DNDModel.h
//  Watch
//
//  Created by Rocky on 2018/10/21.
//  Copyright © 2018年 Rocky. All rights reserved.
//



#import "LHBaseModel.h"
/// 勿扰模式
@interface LHDNDModel : LHBaseModel
///功能是否打开  0：关闭 1：开启
@property (assign, nonatomic) unsigned long open;
///开启时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long start; //
///关闭时间 分钟数：从当天的 0 点算起的分钟数
@property (assign, nonatomic) unsigned long end;

@property (strong, nonatomic) NSData *data;

@end
