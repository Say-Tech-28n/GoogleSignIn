//
//  CBPeripheral+YS.h
//  YS
//
//  Created by LY on 2018/5/2.
//  Copyright © 2018年 任皖鹏. All rights reserved.
//

#import <CoreBluetooth/CoreBluetooth.h>
#import <Foundation/Foundation.h>

@interface CBPeripheral (YS)

- (void)writeData:(NSData *)data;
- (void)writeOtaData:(NSData *)data;

@property (strong, nonatomic) CBCharacteristic *writeCharacteristic;

@property (strong, nonatomic) CBCharacteristic *readCharacteristic;

// 产品序列号
@property (strong, nonatomic) CBCharacteristic *serialNumberCharacteristic;
// 固件版本号
@property (strong, nonatomic) CBCharacteristic *firmwareVersionCharacteristic;
// 硬件版本号
@property (strong, nonatomic) CBCharacteristic *hardwareVersionCharacteristic;
// 功能定义
@property (strong, nonatomic) CBCharacteristic *functionDefinitionCharacteristic;
// 设备名字
@property (strong, nonatomic) CBCharacteristic *deviceNameCharacteristic;
// 电量
@property (strong, nonatomic) CBCharacteristic *powerCharacteristic;

//
@property (strong, nonatomic) CBCharacteristic *platformCharacteristic;

///设备广播数据
@property (strong, nonatomic) NSDictionary *advertisementData;

///设备Mac
@property (strong, nonatomic) NSString *mac;
///设备电量
@property (assign, nonatomic) int powerValue;

///是否配对了
@property (assign, nonatomic) BOOL isPair;

@property (strong, nonatomic) CBCharacteristic *otaWriteCharacteristic;

@property (strong, nonatomic) CBCharacteristic *otaNotifyCharacteristic;


@end
