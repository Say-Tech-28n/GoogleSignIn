//
//  LHBaseViewController.m
//  LH
//
//  Created by lianhezhuli on 2019/10/24.
//  Copyright © 2019 lianhezhuli. All rights reserved.
//

#import "LHBaseViewController.h"

@interface LHBaseViewController ()

@end

@implementation LHBaseViewController

- (void)viewDidLoad {
    [super viewDidLoad];
//    [self configSubViews];
//    [self initDataSource];
    //1.设置阴影颜色
    
    self.navigationController.navigationBar.layer.shadowColor = [UIColor lightGrayColor].CGColor;
    
    //2.设置阴影偏移范围
    
    self.navigationController.navigationBar.layer.shadowOffset = CGSizeMake(0, 4);
    //3.设置阴影颜色的透明度
    
    self.navigationController.navigationBar.layer.shadowOpacity = 0.2;
    
    //4.设置阴影半径

    self.navigationController.navigationBar.layer.shadowRadius = 16;

    //5.设置阴影路径

    self.navigationController.navigationBar.layer.shadowPath = [UIBezierPath bezierPathWithRect:self.navigationController.navigationBar.bounds].CGPath;
    self.navigationController.navigationBar.translucent  = NO;
    self.navigationController.navigationBar.barTintColor = [UIColor purpleColor];

    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];

    self.navigationController.navigationBar.titleTextAttributes = @{NSForegroundColorAttributeName: [UIColor whiteColor]};
//
//
  
//    [self.navigationController.navigationBar setBackgroundImage:[UIImage new] forBarMetrics:UIBarMetricsDefault];
     self.navigationController.navigationBar.shadowImage = [UIImage new];
}
#pragma mark ------- set nav left item
-(void)createBackBtnWithString:(NSString *)string{
    UIButton *btn_back = [UIButton buttonWithType:UIButtonTypeCustom];
    btn_back.frame = CGRectMake(0, 0, 40, 40);
    btn_back.contentEdgeInsets = UIEdgeInsetsMake(0, -2, 0, 0);
    [btn_back setTitle:string  forState:UIControlStateNormal];
    [btn_back setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    //保证所有touch事件button的highlighted属性为NO,即可去除高亮效果
    //    [btn_back addTarget:self action:@selector(preventFlicker:) forControlEvents:UIControlEventAllTouchEvents];
    [btn_back addTarget:self action:@selector(leftBtnClick:) forControlEvents:UIControlEventTouchUpInside];
    UIBarButtonItem *leftItem = [[UIBarButtonItem alloc]initWithCustomView:btn_back];
    self.navigationItem.leftBarButtonItem = leftItem;
}

-(void)createRightBtnWithString:(NSString *)string{
    UIButton *btn_back = [UIButton buttonWithType:UIButtonTypeCustom];
    btn_back.frame = CGRectMake(0, 0, 40, 40);
    btn_back.contentEdgeInsets = UIEdgeInsetsMake(0, -2, 0, 0);
    [btn_back setTitle:string  forState:UIControlStateNormal];
    [btn_back setTitleColor:UIColor.whiteColor forState:UIControlStateNormal];
    //保证所有touch事件button的highlighted属性为NO,即可去除高亮效果
    //    [btn_back addTarget:self action:@selector(preventFlicker:) forControlEvents:UIControlEventAllTouchEvents];
    [btn_back addTarget:self action:@selector(rightBtnClick:) forControlEvents:UIControlEventTouchUpInside];
    UIBarButtonItem *leftItem = [[UIBarButtonItem alloc]initWithCustomView:btn_back];
    self.navigationItem.rightBarButtonItem = leftItem;
}


-(void)createBackBtnWithImageName:(NSString *)imageName{
    UIButton *btn_back = [UIButton buttonWithType:UIButtonTypeCustom];
    btn_back.frame = CGRectMake(0, 0, 40, 40);
    btn_back.contentEdgeInsets = UIEdgeInsetsMake(0, -2, 0, 0);
    btn_back.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
    [btn_back setImage:[UIImage imageNamed:imageName] forState:UIControlStateNormal];
    btn_back.tag = 9;
    //保证所有touch事件button的highlighted属性为NO,即可去除高亮效果
//    [btn_back addTarget:self action:@selector(preventFlicker:) forControlEvents:UIControlEventAllTouchEvents];
    [btn_back addTarget:self action:@selector(leftBtnClick:) forControlEvents:UIControlEventTouchUpInside];
    UIBarButtonItem *leftItem = [[UIBarButtonItem alloc]initWithCustomView:btn_back];
    self.navigationItem.leftBarButtonItem = leftItem;
}
-(void)leftBtnClick:(UIButton *)sender{
    NSArray *viewControllers = self.navigationController.viewControllers;
    if (viewControllers.count == 0) {
        return;
    }
    if (self.navBtnAction) {//如果vc中调用了block回调就走自己的回调
        self.navBtnAction(sender);
    }else{//如果vc中没有调用block回调，直接返回到到上级页面
        [self.navigationController popViewControllerAnimated:YES];
    }
}
//#pragma mark ------- wipe out button highlight
//-(void)preventFlicker:(UIButton *)sender{
//    sender.highlighted = NO;
//}

#pragma mark ------- set nav right item
-(void)createNavRightBtnWithImageName:(NSString *)imageName{
    UIButton *btn_right = [UIButton buttonWithType:UIButtonTypeCustom];
    btn_right.frame = CGRectMake(0, 0, 40, 30);
    btn_right.contentEdgeInsets = UIEdgeInsetsMake(0, 0, 0, 2);
    btn_right.contentHorizontalAlignment = UIControlContentHorizontalAlignmentRight;
    [btn_right setImage:[UIImage imageNamed:imageName] forState:UIControlStateNormal];
    btn_right.tag = 10;
    //保证所有touch事件button的highlighted属性为NO,即可去除高亮效果
    [btn_right addTarget:self action:@selector(rightBtnClick:) forControlEvents:UIControlEventTouchUpInside];
    UIBarButtonItem *rightItem = [[UIBarButtonItem alloc]initWithCustomView:btn_right];
    self.navigationItem.rightBarButtonItem = rightItem;
}
-(void)rightBtnClick:(UIButton *)sender{
   
}

-(void)configSubViews{
}
-(void)initDataSource{
    
}

@end
