  //
//  LHManager.h
//  LHZLBleSDK
//
//  Created by lianhezhuli on 2020/10/7.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreBluetooth/CoreBluetooth.h>
#import "LHConstant.h"
#import "LHLogManager.h"
#import "LHManagerCongfig.h"
#import "LHAlarmModel.h"
#import "LHUserModel.h"
#import "LHLongDownModel.h"
#import "LHUserModel.h"
#import "LHLanguageModel.h"
#import "LHLongDownModel.h"
#import "LHSleepMonitoringModel.h"
#import "LHRaiseHandModel.h"
#import "LHHeartAutoModel.h"
#import "LHDNDModel.h"
#import "LHTempAutoModel.h"
#import "LHAlarmModel.h"
#import "LHBloodModel.h"
#import "LHHeartModel.h"
#import "LHBloodOxyModel.h"
#import "LHTemperatureModel.h"
#import "LHSleepModel.h"
#import "LHSportsModel.h"
#import "LHMsgModel.h"
#import "LHWeather.h"
#import "HFDeviceSupportDialModel.h"
#import "HFDialCustomModel.h"
NS_ASSUME_NONNULL_BEGIN

/**
 *  NSDictionary 设置信息键值 ,value:CBPeripheral 数组
 *
 */
extern NSString *const kLHScanType;

/**
 *  NSDictionary 设置信息键值 ,value:CBManagerState
 *
 */
extern NSString *const kLHCentralManagerState;

/**
 * 设备连接状态
 *  NSDictionary 设置信息键值 ,value:  0 : 连接中，1，连接成功，2，绑定失败，3 ，连接断开 ，4 ，首次绑定 ，5 ，非首次绑定
 *
 */
extern NSString *const kLHDevicesState;


/**
 *  NSDictionary 设置信息键值 ,value:LHSettingInfoModel
 *
 */
extern NSString *const kLHSettingCofig;


/**
 *  NSDictionary 手表除了基本功能外，判断是否支持 ,value:LHManagerCongfig
 *
 */
extern NSString *const kLHManagerCongfig;

/**
 *  NSDictionary 设置信息键值 ,value:NSarray<LHAlarmModel*>
 *
 */
extern NSString *const kLHGetAlarm;

/**
 *  NSDictionary 设置信息键值 ,value: @(code)   0,设置成功，1，设置失败
 *
 */
extern NSString *const kLHSetAlarms;


/**
 *  NSDictionary 设置信息键值 ,value: @(code)    1,设置成功，0，设置失败
 *
 */
extern NSString *const KGetAllHelthData;

/**
 *    同步健康数据的标志
 *  NSDictionary 设置信息键值 ,value: 0，同步开始  1，同步结束
 *
 *
 *
 */
extern NSString *const kLHSYHelthData;


/**
 *    运动数据 key
 *
 *
 *  NSDictionary 设置信息键值 ,value: 运动数据数组[LHSportsModel]
 *
 */
extern NSString *const kLHSportData ;

/**
 *    血压数据 key
 *
 *
 *  NSDictionary 设置信息键值 ,value: 血压数据数组[LHBloodModel]
 *
 */
extern NSString *const kLHBloodData ;

/**
 *    血氧数据 key
 *
 *
 *  NSDictionary 设置信息键值 ,value: 血氧数据数组[LHBloodOxyModel]
 *
 */
extern NSString *const kLHBloodOxyData ;


/**
 *    心率数据 key
 *
 *
 *  NSDictionary 设置信息键值 ,value: 心率数据数组[LHHeartModel]
 *
 */
extern NSString *const kLHHeartData ;

/**
 *    睡眠数据 key
 *
 *
 *  NSDictionary 设置信息键值 ,value: 睡眠数据数组[LHSleepModel]
 *
 */
extern NSString *const kLHSleepData ;


/**
 *    睡眠数据 key
 *
 *
 *  NSDictionary 设置信息键值 ,value: 体温数据数组[LHTemperatureModel]
 *
 */
extern NSString *const kLHTemperature ;


/**
 *    实时运动
 *
 *
 *  value: LHRealTimeModel类
 *
 */
extern  NSString *const kLHRealtimeSports;


/**
 *    设置目标步数key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern  NSString *const kLHSetAim;


/**
 *    设置用户信息key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern  NSString *const kLHUserModel;

/**
 *    设置久坐提醒key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHLongDownModel;


/**
 *    实时步数key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kSetRealTimeSports;

/**
 *    设置抬手亮屏key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kSetRaiseHandModel;

/**
 *    设置睡眠监测key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kSetSleepMonitoringModel;

/**
 *    设置心率自动测量key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHHeartAutoMode;

/**
 *    设置体温自动测量key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHTempAutoModel;

/**
 *    勿扰模式开关以及有效时间段设置key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHDNDModel;

/**
 *    设置震动开启或者关闭key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHShake;

/**
 *    开启或关闭拍照key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHCamera;

/**
 *    设置消息推送key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHMsgModel;


/**
 *    设置语言key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHSetLuange;

/**
 *    单位制式切换(value 0x01 英制 0x00 公制)key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHSetUnit;

/**
 *   佩戴方式 0:左手 1:右手key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHSetWayOfWearing;


/**
 *   切换时间制式 (value 0x01 12小时 0x00 24小时)key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 *
 */
extern NSString *const kLHTimeShow;

/**
 *   开始或者关闭血氧监测key
 *
 *
 *     value: @(code)   1,开启或关闭成功，0，开启或关失败，2，因错误中断测量
 */
extern NSString *const kLHBloodOxygenMeasurement;


/**
 *   开始或者关闭心率监测key
 *
 *
 *     value: @(code)   1,开启或关闭成功，0，开启或关失败，2，因错误中断测量
 */
extern NSString *const kLHHeartMeasurement;


/**
 *   开始或者关闭心率监测key
 *
 *
 *     value: @(code)   1,开启或关闭成功，0，开启或关失败，2，因错误中断测量
 */
extern NSString *const kLHHeartMeasurement;

/**
 *   开始或者关闭血压监测key
 *
 *
 *     value: @(code)   1,开启或关闭成功，0，开启或关失败，2，因错误中断测量
 */
extern NSString *const kLHBloodMeasurement;


/**
 *   开始或者关闭体温监测key
 *
 *
 *     value: @(code)   1,开启或关闭成功，0，开启或关失败，2，因错误中断测量
 */
extern NSString *const kLHTempMeasurement;


/**
 *   同步系统时间key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 */
extern NSString *const KLHSynTime;

/**
 *   开始或者结束寻找设备key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 */
extern NSString *const kLHSearchDevice;



/**
 *   设置天气key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 */
extern NSString *const kLHSetWeather;

/**
 *   开始或者结束寻找设备key
 *
 *
 *    value: @(code)   0,开始找手机  1，结束找手机
 */
extern NSString *const kLHDeviceFindphone;

/**
 *   音乐播放控制key
 *
 *
 *    value: @(code)   0,播放  1，暂停 ，2，上一首   3，下一首
 */

extern NSString *const kLHMusicControl;

/**
 *   手环控制app拍照key
 *
 *
 *    value: @(code)      0,打开你的相机界面  1，执行拍照 ，2，关闭相机界面
 */

extern NSString *const kLHDeviceControlPhoneCamera;

/**
 *
 * 获取电量
 *
 *  NSDictionary  ,value:电量值
 */
extern NSString *const kLHPower;


/**
 *
 * APP->手表，请求手表支持表盘编码，及当前表盘
 *
 *  NSDictionary  ,value:   HFDeviceSupportDialModel
 *
 */
extern NSString *const kLHDialList;



/**
 *
 * APP->手表，请求自定义表盘信息
 *
 *  NSDictionary  ,value: HFDialCustomModel
 *
 */
extern NSString *const kLHGetCustomDial;


/**
 *
 * APP->手表，设置自定义表盘信息
 *
 *  NSDictionary  ,value:NSNumber  0：不更新（只设置颜色，坐标等，不推文件）；1：更新墙纸（启动大文件协议）
 */
extern NSString *const kLHSetCustomDial;


/**
 *
 * APP->手表，推送表盘是否有修改，无修改时可以不下发指令，有修改时手表收到指令需要请求更新表盘
 *
 *  NSDictionary  ,value:NSNumber  0：不更新；1：更新表盘（启动表盘大文件协议）
 */
extern NSString *const kLHDialPush;


/**
 *   解绑key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 */
extern NSString *const kLHUnBind;

/**
 *   恢复出厂key
 *
 *
 *    value: @(code)   1,设置成功，0，设置失败
 */
extern NSString *const kLHResetDevice;


typedef NS_ENUM(NSInteger, LHBLeOperationState) {

    LHDevicesSateConnectedSuccess = 0 , // 设备连接成功
    LHDevicesSateConnectedFailed , // 设备连接失败
    LHDevicesSateDisconnected,  // 设备断开

    LHDevicesSateBindSuccess,  // 设备绑定成功
    LHDevicesSateBindFailed,  // 设备绑定失败
    LHBLeOperationStatePair  , // 配对指令发送成功

    LHBleOperationGetSettingConfigSuccess  , // 获取设置信息发送成功
    LHBleOperationGetAlarmListSuccess  , // 获取闹钟成功

    LHBleOperationSyncHelthDataBegin, // 开始同步健康数据
    LHBleOperationSyncHelthRunData, // 健康数据运动数据
    LHBleOperationSyncHelthSleepData, // 睡眠数据
    LHBleOperationSyncHelthBloodData, // 血压数据
    LHBleOperationSyncHelthHeartData, // 心率数据
    LHBleOperationSyncHelthTemperatureData, // 体温数据
    LHBleOperationSyncHelthRealTimeData, // 实时步数数据

    LHBleOperationSyncHelthBloodOxyData, // 血氧数据
    LHBleOperationSyncHelthDataEnd, // 结束同步健康数据

    LHBleOperationStartFindphone, // 手环开始找手机
    LHBleOperationEndFindphone, // 手环停止找手机

    LHBleOperationMusicPlay, // 播放器播放
    LHBleOperationMusicPause, // 播放器暂停
    LHBleOperationMusicPrevious, // 播放器上一首

    LHBleOperationMusicNext,// 播放器下一首

    LHBleOperationOpencamera,// 打开相机界面
    LHBleOperationTakePhoto,// 执行拍照
    LHBleOperationClosePhoto,// 关闭相机界面
    LHBleOperationBraceletHangsUp,// 手环挂断电话

    LHBleOperationExitHeartRrateMeasurement,// 退出心率测量
    LHBleOperationExitBloodPressureMeasurement,// 退出血压测量
    LHBleOperationExitBodyTemperatureMeasurement,// 退出体温测量
    LHBleOperationExitBloodOxygenMeasurement,// 退出血氧测量

   ///设置命令列表
    LHBleOperationSetttingAlarmStatue ,//设置闹钟
    LHBleOperationSetttingAlarmFailed, // 设置闹钟失败

};

///操作指令回调
typedef void (^LHBLeOperationBlock)(LHBLeOperationState,NSError * _Nullable ,id _Nullable);

///  蓝牙状态回调
typedef void (^LHCentralManagerStateBlock)(CBCentralManager *);
/// 搜索到蓝牙回调，每次搜索到设备都会调用
typedef void (^LHDidDiscoverPeripheralBlock)(CBPeripheral *);



/// 蓝牙sdk 管理类
@interface LHManager : NSObject
///表盘平台
@property (nonatomic, assign) NSInteger platform;

///电量值
@property (assign, nonatomic) int power;

///  蓝牙状态回调
@property (nonatomic, copy) LHCentralManagerStateBlock  centralManagerStateBlock;

/// 搜索到蓝牙回调，每次搜索到设备都会调用
@property (nonatomic, copy) LHDidDiscoverPeripheralBlock  didDiscoverPeripheralBlock;


///  设备回调
@property (nonatomic, copy) LHBLeOperationBlock  devicesSateBlock;

///搜索到的设备列表
@property (strong, nonatomic) NSMutableArray *deviceList;
///蓝牙中心实例
@property (strong, nonatomic) CBCentralManager *centralManager;
/// 已连接设备
@property (strong, nonatomic) CBPeripheral *connectPeripheral;
///手表除了基本功能外，判断是否支持
@property (nonatomic, strong) LHManagerCongfig *bleCongfig;


///  初始化管理类
+(LHManager *)sharedInstance;

/**
 根据标识符添加观察者

 @param observer 观察者
 @param identifier 标识
 @param mainThread 是否在主线程回掉
 @param actionBlock 监听响应
 */
+ (void)addObserver:(id)observer identifier:(NSString *)identifier mainThread:(BOOL)mainThread actionBlock:(void(^)(id observer, NSDictionary *dictionary))actionBlock;
/**
 根据标识符移除观察者

 @param observer 观察者
 */
+(void)removeObserver:(id)observer;

/**
 根据标识符调用

 @param identifier 标识符
 @param dictionary 数据
 */
+ (void)postIdentifier:(NSString *)identifier dictionary:(NSDictionary *)dictionary;

/// 扫描设备
- (void)scan;
/// 停止扫描
- (void)stopScan;


/// 连接设备
/// @param peripheral  需要连接的设备
- (void)connectWithPeripheral:(CBPeripheral *)peripheral;

/// 断开连接
- (void)disConnect;

/// 蓝牙数据
/// @param data 蓝牙返回的数据
- (void)receviceData:(NSData *)data;

/// 绑定设备
- (void)bindDevice;

/// 开启配对
- (void)pair;

//*************设置命令列表*****************

/// 同步系统时间
- (void)synTime;


///设置闹钟
- (void)synAlarm:(NSArray<LHAlarmModel *> *)alarms;


/// 同步用户信息
/// @param model 用户信息数据Model
- (void)synUsrInfo:(LHUserModel *)model;

/// 设置目标步数
/// @param aim 最低五千步
- (void)aim:(unsigned long)aim;


/// 久坐提醒
/// @param model 和请求设置信息返回的LHLongDownModel修改后同步
- (void)synLongDown:(LHLongDownModel *)model;


/// 抬手亮屏
/// @param model model 和请求设置信息返回的LHRaiseHandModel修改后同步
- (void)raiseHand:(LHRaiseHandModel *)model;


///  睡眠监测
/// @param model model 和请求设置信息返回的LHSleepMonitoringModel 的LHSleepMonitoringModel修改后同步
- (void)sleepMonitoring:(LHSleepMonitoringModel *)model;


/// 心率自动测量
/// @param model model 和请求设置信息返回的LHHeartAutoModel 修改后同步
- (void)heartAuto:(LHHeartAutoModel *)model;

/// 体温自动测量
/// @param model model 和请求设置信息返回的LHTempAutoModel 修改后同步 如果支持体温的话
- (void)tempAuto:(LHTempAutoModel *)model;

/// 勿扰模式
/// @param model model 和请求设置信息返回的LHDNDModel 修改后同步 如果支持体温的话
- (void)dnd:(LHDNDModel *)model;


///  震动
/// @param isOpen 打开或者关闭
- (void)shake:(BOOL)isOpen;

///  开启或-关闭拍照
/// @param isOpen 打开或者关闭
- (void)camera:(BOOL)isOpen;

/// 设置语言 如果 LHManagerCongfig的luangeMode为1，则设置为获取设置信息的LHSettingInfoModel的languageArray语言列表，LHSettingInfoModel中language，为当前语言对应的index ，否则 默认为1:中文 0:英文
- (void)setLanguage:(NSInteger)language;

/// 单位制式切换(value 0x01 英制 0x00 公制)
- (void)setUnit:(NSInteger)unit;

/// 佩戴方式 0:左手 1:右手
- (void)setWayOfWearing:(NSInteger)way;

/// 切换时间制式 (value 0x01 12小时 0x00 24小时)
- (void)timeShow:(BOOL)isOpen;

/////  同步天气数据
///// @param weatherModel 天气数据
-(void)setWeatherInfo:(LHWeather*)weatherModel;

///开始血氧监测(value 0x01 开启 0x00 关闭)
- (void)bloodOxy:(BOOL)isOpen;

/// 开始心率监测(value 0x01 开启 0x00 关闭)
- (void)startHeart:(BOOL)isOpen;

/// 开始血压监测(value 0x01 开启 0x00 关闭)
- (void)startBlood:(BOOL)isOpen;

/// 开始体温监测(value 0x01 开启 0x00 关闭)
- (void)startTemp:(BOOL)isOpen;

// 寻找设备(value 0x01 开启 0x00 关闭)
- (void)searchDevice:(BOOL)isOpen;

/// 解绑设备
- (void)unBindDevice;

/// 恢复出厂设置
- (void)resettingDevice;

////设置消息
/// @param m model 和请求设置信息返回的LHMsgModel 修改后同步 如果支持消息提醒话的话
- (void)setMsgModel:(LHMsgModel *)m;


////获取设置信息回调
//@property (nonatomic, copy) LHBLeOperationBlock bleOperationGetSettingConfigBlock;
/// 获取设置信息
- (void)getSettingConfig;


/////获取闹钟列表指令操作
//@property (nonatomic, copy) LHBLeOperationBlock bleOperationGetAlarmBlock;

/// 获取闹钟列表
- (void)getAlarm;

/////同步健康数据指令操作
//@property (nonatomic, copy) LHBLeOperationBlock bleOperationSysHealthBlock;
/// APP 同步所有历史数据(步数->睡眠->心率->血压->体温)，以
///  天为单位的一个大包(一帧)
- (void)getAllHelthData;

///获取当天健康数据
- (void)getTodayHelthData;

/// 开启实时步数上传开关 value ： 0 是关闭，1 是关闭，建议进入前台是开启，进入后台是关闭
- (void)setRealTimeSports:(int)value;
///清除数据
-(void)clearData;

///获取设备电量
-(void)getDevicePower;

///获取sdk版本
-(NSString *)getVersion;


//APP->手环，请求手环支持表盘编码，及当前表盘
- (void)getDialList;

//APP->手环，请求自定义表盘信息
- (void)getCustomDial:(int)customDialCode;
///  APP->手环,推送表盘是否修改
/// @param isUpdate  无修改时可以不下发指令，有修改时，手环收到指令需要请求更新表盘
- (void)DialPush:(BOOL)isUpdate;

//APP->手环，设置表盘
-(void)setCustomDial:(HFDialCustomModel *)model;

@end

NS_ASSUME_NONNULL_END
