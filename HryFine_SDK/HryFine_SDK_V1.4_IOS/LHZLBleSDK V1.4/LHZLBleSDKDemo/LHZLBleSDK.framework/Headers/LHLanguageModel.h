//
//  LHLanguageModel.h
//  M2 Wear
//
//  Created by lianhezhuli on 2020/1/13.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LHLanguageModel : NSObject
///语言名称
@property (nonatomic, copy) NSString *language;
///语言code
@property (nonatomic, assign) NSInteger index;
@end

NS_ASSUME_NONNULL_END
