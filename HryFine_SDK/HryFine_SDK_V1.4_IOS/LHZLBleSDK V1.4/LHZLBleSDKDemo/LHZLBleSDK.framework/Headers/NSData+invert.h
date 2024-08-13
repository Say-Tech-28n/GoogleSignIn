//
//  NSData+invert.h
//  Watch
//
//  Created by rocky on 2018/10/23.
//  Copyright © 2018年 Rocky. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSData (invert)

- (NSData *)invert;

- (unsigned long)l;

+ (NSData *)l:(unsigned long)l;

- (unsigned long)bit:(NSRange)range data:(NSData *)data;

-(NSString *)HexStringWithData:(NSData *)data;
@end
