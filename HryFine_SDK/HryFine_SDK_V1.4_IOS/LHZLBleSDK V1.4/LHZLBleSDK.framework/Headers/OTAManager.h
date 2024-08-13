//
//  HFViewController.swift
//  HryFineSwift
//
//  Created by lianhezhuli on 2020/3/28.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//
@class BlueToothManager;
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#import "HFContactModel.h"
///获取设备OTA状态
typedef NS_ENUM(NSUInteger, OTADeviceStatusType) {
    
    OTADeviceStatusAvailable,//可以ota
    OTADeviceStatusInCharging,//正在充电
    OTADeviceStatusLowPower,//电量低
    OTADeviceStatusInTheCall,//设备在通话
    OTADeviceStatusPlayingMusic,//设备在播放音乐
    OTADeviceStatusUnknown,

} ;
/*OTA 推送结果*/
typedef enum   {
    success     = 0x00,  //正确
    headerError = 0x01, //头标识错误
    mainCmdError = 0x02,  //主功能错误
    secondaryCmdError  = 0x03 , //次功能错误
    subCmdError  = 0x04,  //子功能错误
    checkSumError  = 0x05,  //校验和错误
    pvError = 0x06,  //协议版本号错误
    lengthError = 0x07,  //数据长度错误
    protoclError = 0x08 , //错误协议
    checkGroupError = 0x09,  //组校验错误
    fileError = 0x0A,  //文件校验错误
    bleDisConnected = 0x0B,  //BLE连接断开
    timeOut = 0x0C,  //本地同步超时
    sizeOutLimit =  0x0D,  //要升级的固件大小超过限制
} LHOTAResultType;
typedef void(^OTADeviceStatusBlock)(OTADeviceStatusType);

typedef void (^OTAProgressBlock)(double);

typedef void (^OTACompleteBlock)(LHOTAResultType);

///OTA操作类
@interface OTAManager : NSObject


//@property (copy, nonatomic) void (^receviceData)(NSData *data);

+(OTAManager *)shared;


@property(nonatomic,copy)OTAProgressBlock ProgressBlock ;

@property(nonatomic,copy)OTACompleteBlock  otaCompleteBlock;


///推送自定义墙纸img方式
-(void)pushCustomWallpaper:(UIImage*)finalImage progress:(OTAProgressBlock)progress Complete:(OTACompleteBlock)completeBlock;
///推送自定义墙纸data方式
-(void)pushCustomWallpaperWihthData:(NSData *)data  progress:(OTAProgressBlock)progress Complete:(OTACompleteBlock)completeBlock;

/// 表盘推送
/// @param data 表盘Bin数据
-(void)dailPush:(NSData *)data  progress:(OTAProgressBlock)progress Complete:(OTACompleteBlock)completeBlock;

///推送通讯录功能
-(void)sendOtaContactData:(NSArray <HFContactModel *>*)Contacts progress:(OTAProgressBlock)progress Complete:(OTACompleteBlock)completeBlock;



///// 开始OTA
///// - Parameters:
/////   - otaData: OTA data文件
/////   - subCommand: 次功能
/////         0x01    主程序OTA
/////         0x02    相关设置OTA
/////         0x03    内部资源OTA
/////         0x04    外部资源OTA
/////         0x05    提示音OTA
/////         0x06    dsp xip code OTA
/////         0x07    dsp code OTA
/////   - progress: 进度
/////   - completeBlock: 升级结果
//-(void)sendOta:(NSData *)otaData subCommand:(int)subCommand  progress:(OTAProgressBlock)progress Complete:(OTACompleteBlock)completeBlock;

- (void)receviceOtaData:(NSData *)data;


//重启（是否重启，OTA更新完需要重启）
-(void)restart;



@end
