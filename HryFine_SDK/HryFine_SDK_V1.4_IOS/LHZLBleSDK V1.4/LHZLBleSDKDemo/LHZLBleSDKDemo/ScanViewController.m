//
//  ViewController.m
//  LHZLBleSDKDemo
//
//  Created by lianhezhuli on 2020/10/7.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//


#import "ScanViewController.h"
#import <LHZLBleSDK/LHZLBleSDK.h>

@interface ScanViewController ()<UITableViewDelegate,UITableViewDataSource>
@property (nonatomic, copy) NSMutableArray<CBPeripheral *> *devieceArray;
@property (nonatomic,strong) LHManager *lhBleManager;//蓝牙管理类

@property (nonatomic, strong) UITableView *tableview;
@end

@implementation ScanViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self.view addSubview:self.tableview];
    
    [self createRightBtnWithString:@"Scan"];
    
    //实例化
    self.lhBleManager =  [LHManager sharedInstance];
    
    __weak typeof(self) weakself = self;
    [LHManager addObserver:self identifier:kLHScanType  mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        NSLog(@"-------------Search device------dic %@",dictionary);
        NSMutableArray<CBPeripheral *> *    per =   [dictionary objectForKey:kLHScanType];
        weakself.devieceArray = per;
        [weakself.tableview reloadData];
    }];
    
    
    [LHManager addObserver:self identifier:kLHCentralManagerState mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        CBCentralManager * devicesSate =   [dictionary objectForKey:kLHCentralManagerState];
        
        switch (devicesSate.state) {
            case CBManagerStatePoweredOn:
                NSLog(@"****PoweredOn");
                break;
            case CBManagerStatePoweredOff:
                NSLog(@"***PoweredOff");
                [weakself.navigationController popViewControllerAnimated:NO];
                break;
                
            default:
                break;
        }
    }];
    
    
    [LHManager addObserver:self identifier:kLHDevicesState mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        /**
         * 设备连接状态
         *  NSDictionary 设置信息键值 ,value:  0 : 连接中，1，连接成功，2，绑定失败，3 ，连接断开
         */
        [weakself.navigationController popViewControllerAnimated:NO];
        NSNumber *num =   [dictionary objectForKey:kLHDevicesState];
        
        switch (num.intValue) {
                case 0:
                    NSLog(@"****Connecting");
                    break;
                case 1:
                    NSLog(@"****Bluetooth successful");
                    break;
                case 2:
                    NSLog(@"****Binding failed");
                    break;
                case 3:
                    NSLog(@"****Bluetooth disconnected");
                    break;
                case 4:
                    NSLog(@"****First-time binding");
                    // Can clear daily data
                weakself.title =[NSString stringWithFormat:@"%@(%@)",[LHManager sharedInstance].connectPeripheral.name,[LHManager sharedInstance].connectPeripheral.mac] ;
                    break;
                case 5:
                    NSLog(@"****Non-first-time binding");
                weakself.title =[NSString stringWithFormat:@"%@(%@)",[LHManager sharedInstance].connectPeripheral.name,[LHManager sharedInstance].connectPeripheral.mac] ;
                    break;
                default:
                    break;
            }

   
    }];
    
}
-(void)viewDidDisappear:(BOOL)animated{
    [super viewDidDisappear:animated];
    
}
- (void)dealloc
{
    NSLog(@"----释放了吗-------%s",__func__);
}

-(void)rightBtnClick:(UIButton *)sender{
    
    [[LHManager sharedInstance] scan];
    
}


#pragma mark - UITableViewDelegate
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 70;
}
#pragma mark - UITableViewDataSource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.devieceArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellID = @"cell" ;
    
    UITableViewCell * cell = [tableView dequeueReusableCellWithIdentifier:CellID];
    if (!cell) {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:CellID];
    }
    
    CBPeripheral * per = self.devieceArray[indexPath.row];
    
    cell.textLabel.text = per.name;
    
    cell.detailTextLabel.text = per.mac;
    
    return cell;
}
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
    CBPeripheral * per = self.devieceArray[indexPath.row];
    
    [[LHManager sharedInstance] connectWithPeripheral:per];
    
}
- (UITableView *)tableview
{
    if (!_tableview) {
        _tableview = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, kW , kH) style:UITableViewStylePlain];
        _tableview.delegate = self;
        _tableview.dataSource = self;
        _tableview.tableFooterView = [UIView new];
    }
    return _tableview;
}

- (NSMutableArray *)devieceArray{
    if (!_devieceArray) {
        _devieceArray  = [[NSMutableArray alloc]initWithCapacity:0];
    }
    
    return _devieceArray;
    
}


@end
