//
//  MsgModel.h
//  Watch
//
//  Created by Rocky on 2018/12/7.
//  Copyright © 2018 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface LHMsgModel : NSObject
///电话推送。如果设备支持3.0不能打开 1：开启0：关闭
@property (assign, nonatomic) int call;
///短信推送 1：开启0：关闭
@property (assign, nonatomic) int msg;
///qq推送 1：开启0：关闭
@property (assign, nonatomic) int qq;
///wechat推送 1：开启0：关闭
@property (assign, nonatomic) int wechat;
///facebook推送 1：开启0：关闭
@property (assign, nonatomic) int facebook;
///twitter推送 1：开启0：关闭
@property (assign, nonatomic) int twitter;
///skype推送 1：开启0：关闭
@property (assign, nonatomic) int skype;
///line推送 1：开启0：关闭
@property (assign, nonatomic) int line;
///whatsapp推送 1：开启0：关闭
@property (assign, nonatomic) int whatsapp;
///kakaotalk推送 1：开启0：关闭
@property (assign, nonatomic) int kakaotalk;
///instagram推送 1：开启0：关闭
@property (assign, nonatomic) int instagram;

@property (nonatomic, strong) NSData *msgData;
@end
