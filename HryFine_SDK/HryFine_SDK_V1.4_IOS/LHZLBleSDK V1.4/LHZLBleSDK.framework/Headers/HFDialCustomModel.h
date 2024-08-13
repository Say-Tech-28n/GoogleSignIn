//
//  HFDialCustomModel.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/7/1.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHBaseModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface HFDialCustomModel : LHBaseModel
//表盘编码
@property (nonatomic, assign) long long DialCode;
//坐标x
@property (nonatomic, assign) int x;
//坐标y
@property (nonatomic, assign) int y;
//rgb565值
@property (nonatomic, assign) int rgb565;


//时间上可选显示（0：隐藏；1：日期；2：睡眠；3：心率；4：计步）
@property (nonatomic, assign) int overTimeType;
//时间下可选显示（0：隐藏；1：日期；2：睡眠；3：心率；4：计步）
@property (nonatomic, assign) int  belowTimeType;
//背景更新为1时，手表需要请求更新墙纸，手表恢复出厂设置后把背景设为默认（0：无更新;1:有更新;2:默认墙纸）
@property (nonatomic, assign) int updateBg;

@property (strong, nonatomic) NSData *data;
@end

NS_ASSUME_NONNULL_END
