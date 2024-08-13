//
//  LHManagerCongfig.h
//  LHZLBleSDK
//
//  Created by lianhezhuli on 2020/10/8.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

/// 手表除了基本功能外，判断是否支持
@interface LHManagerCongfig : NSObject
///有效标志位
@property (nonatomic, assign) int identifier;
///是否支持蓝牙3.0 1:on 0:off
@property (nonatomic, assign) int supportBle3;
///是否支持电话本 1:on 0:off
@property (nonatomic, assign) int supportPhoneBook;
///是否支持运动模式 1:on 0:off
@property (nonatomic, assign) int supportSportMode;
///是否支持体温功能  1:on 0:off 体温
@property (nonatomic, assign) int supportTempMode;
///是否支持小时制切换（12小时制和24小时制切换） 1:on 0:off
@property (nonatomic, assign) int supportTimeShow;

///是否支持单位制式切换（公制和英制切换） 1:on 0:off
@property (nonatomic, assign) int supportUnit;
///是否支持语言设置功能 1:on 0:off
@property (nonatomic, assign) int luangeMode;
///是否支持血氧测量1:on 0:off
@property (nonatomic, assign) int bloodOxyMode;

///是否支持天气功能 1:on 0:off
@property (nonatomic, assign) int weatherSupport;
///  如果luangeMode == 1 ，支持语言设置
///// 全系列支持的语言列表 （英语、    简体中文、繁体中文、法语、  西班牙语、波兰语、葡萄牙语、意大利语、）
//（德语、    荷兰语、  土耳其语、俄语、  捷克语、  波斯语、匈牙利语、希腊语、）
//（阿拉伯语、菲律宾语、马来语、  印尼语、越南语、  泰语、  缅甸语、  印度语、）
//（韩语、    日语、 瑞典语、希伯来、芬兰、乌克兰、克罗地亚语……）
//其他字节暂时预留，语言设置指令（0x02，0x15）按照这个顺序定义设置的语言值，如：0:英文，1：简体中文，2：繁体中文
@property(nonatomic,strong)NSMutableArray  *languageArray;


///是否支持Viber
@property (nonatomic, assign) int isSupportViber;//1:on 0:off 是否支持
//是否支持温度单位切换（摄氏度和华氏温度切换）1：支持 0：不支持
@property (nonatomic, assign) int isSupportTemperatureUnitSwitch;


//表盘的特性 默认 0x1f
@property (nonatomic, assign) int feature;

//表盘形状 区分方形还是圆形(1:方形 0:圆形)
@property (nonatomic, assign) int shape;

///表盘设置开关 0：关闭 ，1，打开
@property (nonatomic, assign) int dialSetting;//1:on 0:off 表盘设置
///自定义墙纸开关 0：关闭 ，1，打开
@property (nonatomic, assign) int dialCustom;//1:on 0:off 表盘自定义
///表盘推送开关 0：关闭 ，1，打开
@property (nonatomic, assign) int dialPush;//1:on 0:off 表盘推送

@property (nonatomic, assign) int dialLocalWaller;//1:on 0:off 推送固定墙纸

///表盘分辨率:
/*
 表盘分辨率:
 （1:240X240;
 2:240X280;
 3:240X295;
 4:320X385;
 5:360X360;
 6:240X288;
 7:320X380;
 8:320X320;
 9:172X320;
 10:240X286;
 11:240X284）
 12:240X283）
 13:240X294）
 14:240X288）
 15:240X292）
 */
@property (nonatomic, assign) int dialPixel;
///根据表盘分辨率得出的表盘size:
/*
 
 2:240X280;
 3:240X295;
 4:320X385;
 5:360X360;
 6:240X288;
 7:320X380;
 8:320X320;
 9:172X320;
 10:240X286;
 11:240X284）
 12:240X283）
 13:240X294）
 14:240X288）
 15:240X292）
 */
@property (nonatomic, assign) CGSize dialSize;

/// 时间位置和其上下元素的整体大小（也可以根据实际情况修改适配）
@property (nonatomic, assign) CGSize timeElementSize;//表盘上元素大小,根据分辨率不同区分 （DialPixel的值  1:100 X 80 2:40 X 78 其他值后续定义）

@property (strong, nonatomic) NSData *languageData;


@end

NS_ASSUME_NONNULL_END
