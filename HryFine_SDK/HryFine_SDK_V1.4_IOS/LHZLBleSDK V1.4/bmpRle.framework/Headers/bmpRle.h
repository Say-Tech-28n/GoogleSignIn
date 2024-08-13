//
//  test.h
//  test
//
//  Created by wants on 2020/1/11.
//  Copyright © 2020 Big Nerd Ranch. All rights reserved.
//

#import <Foundation/Foundation.h>

//! Project version number for test.
FOUNDATION_EXPORT double testVersionNumber;

//! Project version string for test.
FOUNDATION_EXPORT const unsigned char testVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <test/PublicHeader.h>

#define s32 int
#define u32 unsigned int
#define u16 unsigned short
#define u8 unsigned char
//void bmp_test(void);
int bmp_rle_getpic_len(s32* oriBuffer,int picWidth,int picHeight);
int bmp_rle_getpic_data(s32* doneBuffer,int bufferLen);
