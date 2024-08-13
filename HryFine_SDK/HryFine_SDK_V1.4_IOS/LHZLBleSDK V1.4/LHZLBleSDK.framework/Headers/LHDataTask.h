//
//  LHDataTask.h
//  M2 Wear
//
//  Created by lianhezhuli on 2019/12/2.
//  Copyright © 2019 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
NS_ASSUME_NONNULL_BEGIN

@interface LHDataTask : NSObject

@property(nonatomic,strong)NSData *data;
@property (nonatomic, assign) BOOL isWaitAck;
/**
 开始发送数据
 */
-(void)startSendata;


@end

NS_ASSUME_NONNULL_END
