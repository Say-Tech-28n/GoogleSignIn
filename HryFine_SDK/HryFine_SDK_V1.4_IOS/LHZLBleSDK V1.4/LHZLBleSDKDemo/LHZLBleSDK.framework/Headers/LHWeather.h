//
//  LHWeather.h
//  LHZLBleSDK
//
//  Created by lianhezhuli on 2020/10/13.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface LHWeather : NSObject

///定位城市（必传参数）
@property (nonatomic, copy) NSString * city_name;
///目前气温值（必传参数）例子：23
@property (nonatomic, assign) int temp;
///最高气温值（必传参数）例子：23.6
@property (nonatomic, assign) int temp_max;
///最低气温值（必传参数）例子：23
@property (nonatomic, assign) int temp_min;

/*当前天气情况（必传参数） 参考值
0：晴
1：晴间多云
2：多云
3：阴
4：阵雨
5：雨
6：雷阵雨
7：雪
8：雾霾
*/
@property (nonatomic, assign) NSInteger weather;


@end

NS_ASSUME_NONNULL_END
