//
//  UserInfo.h
//  Watch
//
//  Created by Rocky on 2018/10/22.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHConstant.h"

/// 设置信息类
@interface LHSettingInfoModel : NSObject

///
@property (strong, nonatomic) NSData *dataInfo;

/// 用户信息
@property (strong, nonatomic) LHUserModel *usrModel;

///运动步数目标 默认5000
@property (assign, nonatomic) unsigned long aim;

/// 闹钟列表
@property (strong, nonatomic) NSMutableArray *alarmList;

///  久坐提醒
@property (strong, nonatomic) LHLongDownModel *longDownModel;

/// 推送消息开关
@property (strong, nonatomic) LHMsgModel *msgModel;

///  睡眠监测
@property (strong, nonatomic) LHSleepMonitoringModel *sleepMonitoringModel;

///  抬手亮屏
@property (strong, nonatomic) LHRaiseHandModel *raiseHandModel;

/// 心率自动测量
@property (strong, nonatomic) LHHeartAutoModel *heartAutoModel;

///  勿扰模式
@property (strong, nonatomic) LHDNDModel *dndModel;

///  体温数据
@property (strong, nonatomic) LHTempAutoModel *tempAutoModel;
///时间显示切换(value 0x01 12小时 0x00 24小时)
@property (assign, nonatomic) int timeBy24;
///单位制式切换(value 0x01 英制 0x00 公制)
@property (assign, nonatomic) int unitMode;

/* 左右手 0左手 1右手 */
@property (assign, nonatomic) int leftRight;
/* 配对状态 0已配对 1未配对 */
@property (assign, nonatomic) int status;
/* 如果 LHManagerCongfig的luangeMode为1，则设置为获取设置信息的LHSettingInfoModel的languageArray语言列表，LHSettingInfoModel中language，为当前语言对应的index ，否则 默认为1:中文 0:英文  */
@property (assign, nonatomic) int language;

/* 震动状态 0不震动 1震动 */
@property (assign, nonatomic) int shake;



///Viber消息推送开关 0x00：关 ，0x01:开
@property (assign, nonatomic) int viber;
///温度单位制式 (温度单位切换(value 0x01 华氏度 0x00 摄氏度)
@property (assign, nonatomic) int temperatureUnit;


@end
