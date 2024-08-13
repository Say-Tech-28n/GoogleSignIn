//
//  LHBaseViewController.h
//  LH
//
//  Created by lianhezhuli on 2019/10/24.
//  Copyright © 2019 lianhezhuli. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
typedef void(^navigationBtnBlock)(UIButton *navBtn);

@interface LHBaseViewController : UIViewController
/** navigationBar item click */
@property (nonatomic, copy)navigationBtnBlock navBtnAction;
-(void)createBackBtnWithImageName:(NSString *)imageName;
-(void)createNavRightBtnWithImageName:(NSString *)imageName;
-(void)createBackBtnWithString:(NSString *)string;

-(void)createRightBtnWithString:(NSString *)string;
-(void)configSubViews;
-(void)initDataSource;
-(void)leftBtnClick:(UIButton *)sender;
-(void)rightBtnClick:(UIButton *)sender;
@end

NS_ASSUME_NONNULL_END
