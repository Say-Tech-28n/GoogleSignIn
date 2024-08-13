//
//  HFDataTaskManager.h
//  HryFineSwift
//
//  Created by lianhezhuli on 2019/11/13.
//  Copyright © 2019 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "LHDataTask.h"

NS_ASSUME_NONNULL_BEGIN


//队列FIFO，先进先出
@interface HFDataTaskManager : NSObject

@property (nonatomic,copy) NSMutableArray<LHDataTask*>* taskArray;

+(instancetype)share;
/*
 获取剩余任务数量
 */
-(NSUInteger)count;

/*
 添加到第一个任务
 */
-(void)addFirstTask:(LHDataTask*)model;
/*
 添加任务
 */
-(void)addTask:(LHDataTask*)model;

/*
 取出任务
 */
-(LHDataTask*)popTask;

/*
 移除任务
 */
-(void)removeTaskWithModel:(LHDataTask*)model;


-(void)clearTask;
/*
 移除任务
 */
-(void)removeTaskWithMessageIndex:(NSInteger)messageIndex;


@end

NS_ASSUME_NONNULL_END
