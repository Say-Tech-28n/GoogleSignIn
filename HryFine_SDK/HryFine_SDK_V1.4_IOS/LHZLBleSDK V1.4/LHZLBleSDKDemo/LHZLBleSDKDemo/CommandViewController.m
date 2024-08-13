//
//  CommandViewController.m
//  LHZLBleSDKDemo
//
//  Created by lianhezhuli on 2020/10/12.
//  Copyright © 2020 lianhezhuli. All rights reserved.
//

#import "CommandViewController.h"
#import <LHZLBleSDK/LHZLBleSDK.h>
#import "ScanViewController.h"
#import <LHZLBleSDK/UIImage+Extra.h>
#import <LHZLBleSDK/UIColor+YS.h>

///主要说明：因为目前SDK采用的是一对一的block回调，因为建议在一个单例管理类处理蓝牙的所有操作再通知出去，否则可能会出现一个block在两个页面分别注册一次但只有一个页面收到了回调

@interface CommandViewController ()
@property (nonatomic,strong) LHManager *lhBleManager;//蓝牙管理类
@property (nonatomic, copy) NSMutableArray *titiltArray;
@property (nonatomic, strong) UITableView *tableview;
@property (nonatomic, strong) LHSettingInfoModel * settingInfoModel;
@property (nonatomic, strong) LHManagerCongfig * managerCongfig;

///获取自定义表盘编码和支持表盘编码列表
@property(nonatomic,strong)HFDeviceSupportDialModel * deviceSupportDialModel;
///获取自定义表盘信息
@property(nonatomic,strong)HFDialCustomModel * dialCustomModel;

@end

@implementation CommandViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"Command List";
    [self.view addSubview:self.tableview];

    self.titiltArray = [[NSMutableArray alloc]initWithObjects:@"Get Settings Information", @"Get Alarm List", @"Set Alarm", @"Get All Health Data", @"Get Today's Health Data", @"Set Step Goal", @"Set User Information", @"Set Sedentary Reminder", @"Toggle Real-time Step Count", @"Set Lift Wrist to View Screen", @"Set Sleep Monitoring", @"Set Heart Rate Auto Measurement", @"Set Temperature Auto Measurement", @"Set Do Not Disturb Mode", @"Toggle Vibration On/Off", @"Toggle Camera On/Off", @"Set Message Notifications", @"Set Language", @"Set Weather Information", @"Switch Measurement Units (value 0x01 for Imperial, 0x00 for Metric)", @"Switch Time Format (value 0x01 for 12-hour, 0x00 for 24-hour)", @"Wearing Position (0: Left Hand, 1: Right Hand)", @"Start or Stop Blood Oxygen Monitoring", @"Start or Stop Heart Rate Monitoring", @"Start or Stop Blood Pressure Monitoring", @"Start or Stop Temperature Monitoring", @"Start or End Device Search", @"Sync System Time", @"Get Battery Level", @"Unbind Device", @"Restore Factory Settings", @"APP -> Bracelet: Request Bracelet Dial Code and Current Dial", @"APP -> Watch: Request Custom Dial Information", @"APP -> Watch: Set Custom Dial Information", @"APP -> Bracelet: Push Dial", @"Sync Contacts", nil];
    self.view.backgroundColor = UIColor.whiteColor;
    [self createRightBtnWithString:@"Connect"];
    [self createBackBtnWithString:@"Disconnect"];
    
    self.titiltArray = [[NSMutableArray alloc]initWithObjects:@"Get Settings Information",@"Get Alarm List",@"Set Alarm",@"Get All Health Data",@"Get Today's Health Data" ,@"Set Step Goal",@"Set User Information",@"Set Sedentary Reminder",@"Toggle Real-time Step Count",@"Set Lift Wrist to View Screen",@"Set Sleep Monitoring",@"Set Heart Rate Auto Measurement",@"Set Temperature Auto Measurement",@"Set Do Not Disturb Mode",@"Toggle Vibration On/Off",@"Toggle Camera On/Off",@"Set Message Notifications",@"Set Language",@"Set Weather Information",@"Switch Measurement Units (value 0x01 for Imperial, 0x00 for Metric)",@"Switch Time Format (value 0x01 for 12-hour, 0x00 for 24-hour)",@"Wearing Position (0: Left Hand, 1: Right Hand)",@"Start or Stop Blood Oxygen Monitoring",@"Start or Stop Heart Rate Monitoring",@"Start or Stop Blood Pressure Monitoring",@"Start or Stop Temperature Monitoring",@"Start or End Device Search",@"Sync System Time",@"Get Battery Level",@"Unbind Device",@"Restore Factory Settings", @"APP -> Bracelet: Request Bracelet Dial Code and Current Dial",
                        @"APP -> Watch: Request Custom Dial Information",
                        @"APP -> Watch: Set Custom Dial Information",
                        @"APP -> Bracelet: Push Dial",
                        @"Sync Contacts",nil];
   
    //打开log
    [LHLogManager setLogEnable:YES];
    //实例化
    self.lhBleManager =  [LHManager sharedInstance];
    //注册回调
    [self registerCallBack];
    [self notifiHealthData];
    [self     commandSentByBracelet];
    
    
}
// 手表主动发给app的指令回调注册
-(void)commandSentByBracelet{
    
    [LHManager addObserver:self identifier:kLHDeviceFindphone mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        //   0,开始找手机 (找手机，你可以播放一段声音)  1，结束找手机(停止找手机，你需要停止播放一段声音)
        NSLog(@"------找手机开启关闭---%@----",dictionary);
    }];
    
    [LHManager addObserver:self identifier:kLHMusicControl mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        //   0,播放  1，暂停 ，2，上一首   3，下一首
        NSLog(@"------手环控制app音乐播放，但是只是协议，实际没法控制---%@----",dictionary);
    }];
    
    [LHManager addObserver:self identifier:kLHDeviceControlPhoneCamera mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        //   0,打开你的相机界面  1，执行拍照 ，2，关闭相机界面
        NSLog(@"-----手环控制app拍照----%@----",dictionary);
    }];
    
    ///蓝牙支持功能信息类,可以保存返回的model ，根据model判断是否支持功能，详见model定义
    [LHManager addObserver:self identifier:kLHManagerCongfig mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        self.managerCongfig = dictionary[kLHManagerCongfig];
        NSLog(@"蓝牙支持功能信息类managerCongfig   ------------%@",self.managerCongfig);
        
    }];
    
}

///注册需要的功能的回调
-(void)registerCallBack{
    __weak typeof(self) weakself = self;
    ///注册蓝牙状态回调
    [LHManager addObserver:self identifier:kLHCentralManagerState mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        CBCentralManager * devicesSate =   [dictionary objectForKey:kLHCentralManagerState];
        
        switch (devicesSate.state) {
            case CBManagerStatePoweredOn:
                NSLog(@"****打开");
                break;
            case CBManagerStatePoweredOff:
                NSLog(@"****关闭");
                [weakself.navigationController popViewControllerAnimated:NO];
                break;
                
            default:
                break;
        }
    }];
    
    ///注册设备状态回调状态回调
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
                    break;
                case 5:
                    NSLog(@"****Non-first-time binding");
                    break;
                default:
                    break;
            }

    }];
    
}

///Register the callback "Get All Health Data" and "Get Today's Health Data" data callbacks, and the single measurement result will also be returned in the callback
-(void)notifiHealthData{
    
    [LHManager addObserver:self identifier:kLHRealtimeSports mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        LHRealTimeModel * realTimeModel =   [dictionary objectForKey:kLHRealtimeSports];
        NSLog(@"****Real-time step data------%@",realTimeModel);
        
    }];
    
    [LHManager addObserver:self identifier:kLHSYHelthData mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        NSNumber *code =   [dictionary objectForKey:kLHSYHelthData];
        NSLog(@"****Health data synchronization start or end callback------%d",code.intValue);
    }];
    
    
    [LHManager addObserver:self identifier:kLHSportData mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        NSArray * sportArray =   [dictionary objectForKey:kLHSportData];
        //        NSLog(@"****运动数据------%@",sportArray);
        
        for (LHSportsModel *model in sportArray) {
            NSLog(@"****Motion data------%@-----%ld",model.time,model.distance);
        }
    }];
    
    [LHManager addObserver:self identifier:kLHSleepData mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        NSArray * sleepArray =   [dictionary objectForKey:kLHSleepData];
        
        NSLog(@"****sleep data------%@",sleepArray);
    }];
    
    [LHManager addObserver:self identifier:kLHHeartData mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        NSArray * heartArray =   [dictionary objectForKey:kLHHeartData];
        for (LHHeartModel *model in heartArray) {
            NSLog(@"****heartData------%@-----%ld",model.time,model.count);
        }
        NSLog(@"****heartData------%@",heartArray);
    }];
    
    [LHManager addObserver:self identifier:kLHBloodData mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        NSArray * bloodArray =   [dictionary objectForKey:kLHBloodData];
        NSLog(@"****Blood Data------%@",bloodArray);
    }];
    
    [LHManager addObserver:self identifier:kLHBloodOxyData mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
        NSArray * bloodOxyArray =   [dictionary objectForKey:kLHBloodOxyData];
        NSLog(@"****BloodoxyData------%@",bloodOxyArray);
        
    }];
    
}


-(void)leftBtnClick:(UIButton *)sender{
    ///Clear data
    [self.lhBleManager clearData];
    ///Disconnect
    [self.lhBleManager disConnect];
}

-(void)rightBtnClick:(UIButton *)sender{
    
    if (@available(iOS 10.0, *)) {
        if (self.lhBleManager.centralManager.state != CBManagerStatePoweredOn) {
            NSLog(@"Please turn on Bluetooth");
            
            return;
        }
    } else {
        if (self.lhBleManager.centralManager.state != CBCentralManagerStatePoweredOn) {
            NSLog(@"Please turn on Bluetooth");
            return;
        }
    }
    if (self.lhBleManager.connectPeripheral.state == CBPeripheralStateConnected) {
        NSLog(@"Device connected");
        return;
    }
    
    ScanViewController *vc =   [ScanViewController new];
    [self.navigationController pushViewController:vc animated:YES];
}


#pragma mark - UITableViewDelegate
- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 70;
}
#pragma mark - UITableViewDataSource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.titiltArray.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellID = @"cell" ;
    
    UITableViewCell * cell = [tableView dequeueReusableCellWithIdentifier:CellID];
    if (!cell) {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:CellID];
    }
    
    NSString * per = self.titiltArray[indexPath.row];
    
    cell.textLabel.text = per;
    
    
    return cell;
}
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    
    NSString * per  = self.titiltArray[indexPath.row];
    if ([per isEqualToString:@"Get Settings Information"]) {
        /// Bluetooth setting information, sdk send, only need to register callback (important), you can save the returned model, set the synchronous modification of this model
        [LHManager addObserver:self identifier:kLHSettingCofig mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            self.settingInfoModel = dictionary[kLHSettingCofig];
            
            NSLog(@"Bluetooth Settings:settingInfoModel    ------------%@",self.settingInfoModel);
            
        }];
        [self.lhBleManager getSettingConfig];
        
    }else  if ([per isEqualToString:@"Get Alarm List"]) {
        
        /// Alarm list, save it and use it when setting
        [LHManager addObserver:self identifier:kLHGetAlarm mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSArray * array = dictionary[kLHGetAlarm];
            NSLog(@"Alarm List------------%@",array);
        }];
        [self.lhBleManager getAlarm];
        
    }else if ([per isEqualToString:@"Set Alarm"]){
        
        [LHManager addObserver:self identifier:kLHSetAlarms mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set AlarmSuccess or not-----%@----",dictionary);
            
        }];
        ///根据获取的闹钟列表进行修改，如果为空就自己创建新的闹钟
        LHAlarmModel *model = [[LHAlarmModel alloc] init];
        model.year = [[NSDate date] ys_ToString:@"yy"].longLongValue - 2000;
        model.month = [[NSDate date] ys_ToString:@"MM"].longLongValue;
        model.day = [[NSDate date] ys_ToString:@"dd"].longLongValue;
        model.hour = [[NSDate date] ys_ToString:@"HH"].longLongValue;
        model.min = [[NSDate date] ys_ToString:@"mm"].longLongValue;
        model.number = 0;
        model.none = 0;
        model.d1 = 1;
        model.d2 = 1;
        model.d3 = 1;
        model.d4 = 1;
        model.d5 = 1;
        model.d6 = 1;
        model.d7 = 1;
        NSMutableArray *arr = [[NSMutableArray alloc]initWithObjects:model, nil];
        [self.lhBleManager synAlarm:arr];
    }else  if ([per isEqualToString:@"Get All Health Data"]) {
        // Register the health data callback first
        [self.lhBleManager getAllHelthData];
    }else  if ([per isEqualToString:@"Get Today's Health Data"]) {
        // Register the health data callback first
        [self.lhBleManager getTodayHelthData];
        
    }else if ([per isEqualToString:@"Set Step Goal"]){
        
        [LHManager addObserver:self identifier:kLHSetAim mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Step GoalSuccess or not-----%@----",dictionary);
            
        }];
        
        /// Modify LHSettingInfoModel based on the number of target steps obtained in Settings
        self.settingInfoModel.aim =  1000;
        [self.lhBleManager aim: self.settingInfoModel.aim];
        

    }else if ([per isEqualToString:@"Set User Information"]){
        /// Modify LHSettingInfoModel based on the user information obtained in the Settings
        [LHManager addObserver:self identifier:kLHUserModel mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set User InformationSuccess or not-----%@----",dictionary);
            
        }];
        LHUserModel * userModel =   self.settingInfoModel.usrModel;
        userModel.sex = 0;
        userModel.age = 24;
        userModel.height = 174;
        userModel.weight = 75;
        [self.lhBleManager synUsrInfo:userModel];
    }else if ([per isEqualToString:@"Set Sedentary Reminder"]){
        /// Modify the longDownModel in LHSettingInfoModel based on the user information obtained in the Settings
        [LHManager addObserver:self identifier:kLHLongDownModel mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Sedentary ReminderSuccess or not-----%@----",dictionary);
            
        }];
        LHLongDownModel *model = self.settingInfoModel.longDownModel;
        model.threshold = 150;
        model.start = 8;
        model.end = 22;
        model.time = 45;///
        model.open = 1;
        model.noonBreak = 1;
        model.d1 = 1; //Switch, on is 1, off is 0, same thing down here
        model.d2 = 1;
        model.d3 = 1;
        model.d4 = 1;
        model.d5 = 1;
        model.d6 = 1;
        model.d7 = 1;
        
        [self.lhBleManager synLongDown:model];
    }else if ([per isEqualToString:@"Toggle Real-time Step Count"]){
        [LHManager addObserver:self identifier:kSetRealTimeSports mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----On or off :Toggle Real-time Step CountSuccess or not-----%@----",dictionary);
        }];
        /// Enable or disable the real-time step upload switch value: 0 is off, 1 is off. You are advised to enable when entering the foreground and disable when entering the background
        [self.lhBleManager setRealTimeSports:0];
        
    }else if ([per isEqualToString:@"Set Lift Wrist to View Screen"]){
        [LHManager addObserver:self identifier:kSetRaiseHandModel mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Lift Wrist to View ScreenSuccess or not-----%@----",dictionary);
        }];
        /// Modify the LHRaiseHandModel in LHSettingInfoModel based on the user information obtained in the Settings
        LHRaiseHandModel *model = self.settingInfoModel.raiseHandModel;
        model.open = 1;
        model.start = 8*60;
        model.end = 22*60;
        [self.lhBleManager raiseHand:model];
        
    }else if ([per isEqualToString:@"Set Sleep Monitoring"]){
        /// Register a callback for Success or not
        [LHManager addObserver:self identifier:kSetSleepMonitoringModel mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Sleep MonitoringSuccess or not-----%@----",dictionary);
        }];
        ///根据设置里获取的用户信息进行修改 LHSettingInfoModel 中的LHSleepMonitoringModel,您需要先Get Settings Information保存
        LHSleepMonitoringModel *model = self.settingInfoModel.sleepMonitoringModel;
        model.open = 1;
        model.start = 9*60;//Start time Indicates the number of minutes：22 o 'clock *60 minutes
        model.end = 11*60;//End Time Minutes: 8 o 'clock x 60 minutes
        [self.lhBleManager sleepMonitoring:model];
        
        
    }else if ([per isEqualToString:@"Set Heart Rate Auto Measurement"]){
        [LHManager addObserver:self identifier:kLHHeartAutoMode mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Heart Rate Auto MeasurementSuccess or not-----%@----",dictionary);
        }];
      /// Modify LHHeartAutoModel in LHSettingInfoModel based on the user Information obtained in the Settings. You need to Get Settings Information and save the SettingsHSettingInfoModel 中的LHHeartAutoModel,您需要先Get Settings Information保存
        LHHeartAutoModel *model = self.settingInfoModel.heartAutoModel;
        model.open = 1;
        model.sleep = 1;// Sleep aid 0: off 1: on
        model.rate = 60;//Default 60, APP is divided into 60:90:120 three gears (tentative)
        model.start = 8*60; //Start time Minutes Example: 22 o 'clock x 60 minutes
        model.end = 22*60;//End Time Minutes Example: 8 o 'clock x 60 minutes
        
        [self.lhBleManager heartAuto:model];
        
        
    }else if ([per isEqualToString:@"Set Temperature Auto Measurement"]){
        
        [LHManager addObserver:self identifier:kLHTempAutoModel mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Temperature Auto MeasurementSuccess or not-----%@----",dictionary);
        }];
        /// Modify LHTempAutoModel in LHSettingInfoModel based on the user Information obtained in the Settings. You need to save the Settings Information first
        LHTempAutoModel *model = self.settingInfoModel.tempAutoModel;
        model.open = NO;
        model.rate = 60;//Default 60, APP is divided into 60:90:120 three gears (tentative)
        model.start = 8*60; //Start time Minutes Example: 22 o 'clock x 60 minutes
        model.end = 22*60;//End Time Minutes Example: 8 o 'clock x 60 minutes
        [self.lhBleManager tempAuto:model];
        
        
    }else if ([per isEqualToString:@"Set Do Not Disturb Mode"]){
        /// Modify the LHDNDModel in LHSettingInfoModel based on the user Information obtained in the Settings. You need to save the Settings Information first
        
        [LHManager addObserver:self identifier:kLHDNDModel mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Do Not Disturb ModeSuccess or not-----%@----",dictionary);
        }];
        LHDNDModel *model = self.settingInfoModel.dndModel;
        model.open = NO;
        model.start = 22*60;// Start time Minutes Example: 22 o 'clock x 60 minutes
        model.end = 8*60;// End time Minutes Example: 8 o 'clock x 60 minutes
        [self.lhBleManager dnd:model];
        
    }else if ([per isEqualToString:@"Toggle Vibration On/Off"]){
        [LHManager addObserver:self identifier:kLHShake mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Toggle Vibration On/OffSuccess or not-----%@----",dictionary);
        }];
        
        BOOL shake = self.settingInfoModel.shake ? 0:1;
        
        [self.lhBleManager shake:shake];
        
    }else if ([per isEqualToString:@"Toggle Camera On/Off"]){
        [LHManager addObserver:self identifier:kLHCamera mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Toggle Camera On/Off Success or not-----%@----",dictionary);
        }];
        [self.lhBleManager camera:YES];
    }else if ([per isEqualToString:@"Set Message Notifications"]){
        
        [LHManager addObserver:self identifier:kLHMsgModel mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Message NotificationsSuccess or not-----%@----",dictionary);
        }];
        /// Modify the LHMsgModel in LHSettingInfoModel based on the user Information obtained in the Settings. You need to Get Settings Information and save it first
        LHMsgModel *mm = self.settingInfoModel.msgModel;
        
        mm.call = 1;//If bleCongfig supports 3.0 Bluetooth, this UI setting is hidden from the user so that mm.call can only =0
        if (self.lhBleManager.bleCongfig.supportBle3) {
            mm.call = 0;
        }
        mm.msg = 1;
        mm.qq = 1;
        mm.wechat = 1;
        mm.facebook = 1;
        mm.twitter = 1;
        mm.skype = 1;
        mm.line = 1;
        mm.whatsapp = 1;
        mm.kakaotalk = 1;
        mm.instagram = 1;
        [self.lhBleManager setMsgModel:mm];
        
    }else  if ([per isEqualToString:@"Set Language"]){
        [LHManager addObserver:self identifier:kLHSetLuange mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set LanguageSuccess or not-----%@----",dictionary);
        }];
        // Set Language If the luangeMode value of LhManagerfig is set to 1, set the languageArray language list of LHSettingInfoModel of Get Settings Information. LHSettingInfoModel: indicates the index corresponding to the current language. Otherwise, the default value is 1: Chinese 0: English
        if (self.managerCongfig.luangeMode == 1) {
            if (self.managerCongfig.languageArray.count>0) {
                LHLanguageModel *model =  self.managerCongfig.languageArray[0];
                [self.lhBleManager setLanguage:model.index];
            }
        }else{
            // The default value is 1: Chinese 0: English
            [self.lhBleManager setLanguage:1];
        }
        
        
    }else  if ([per isEqualToString:@"Switch Measurement Units (value 0x01 for Imperial, 0x00 for Metric)"]){
        if (self.managerCongfig.supportUnit == 0) {
            NSLog(@"nonsupport");
            return;
        }
        [LHManager addObserver:self identifier:kLHSetUnit mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----The unit system is switched successfully-----%@----",dictionary);
        }];
        BOOL unitMode = self.settingInfoModel.unitMode ? 0:1;
        
        //Switch Measurement Units (value 0x01 for Imperial, 0x00 for Metric)
        [self.lhBleManager setUnit:unitMode];
        
    }else  if ([per isEqualToString:@"Wearing Position (0: Left Hand, 1: Right Hand)"]){
        
        [LHManager addObserver:self identifier:kLHSetWayOfWearing mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Wearing Position Success or not-----%@----",dictionary);
        }];
        
        BOOL leftRight = self.settingInfoModel.leftRight ? 0:1;
        
        [self.lhBleManager setWayOfWearing:leftRight];
        
    }else  if ([per isEqualToString:@"Switch Time Format (value 0x01 for 12-hour, 0x00 for 24-hour)"]){
        if (self.managerCongfig.supportTimeShow == 0) {
            NSLog(@"nonsupport");
            return;
        }
        
        [LHManager addObserver:self identifier:kLHTimeShow mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Switch Time Format Success or not-----%@----",dictionary);
        }];
        ///Time display switch (value 0x01 12 hours 0x00 24 hours)
        BOOL timeBy24 =   self.settingInfoModel.timeBy24 ? 0:1;
        [self.lhBleManager timeShow:timeBy24];
        
    }else if ([per isEqualToString:@"Set Weather Information"]){
        if (self.managerCongfig.weatherSupport == 0) {
            NSLog(@"nonsupport");
            return;
        }
        
        [LHManager addObserver:self identifier:kLHSetWeather mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Set Weather InformationSuccess or not-----%@----",dictionary);
        }];
        
        LHWeather *model = [LHWeather new];
        model.city_name = @"shezhen";
        model.temp = 26;
        model.temp_max = 37;
        model.temp_min = 10;
       /* Current weather (required parameter) Reference value
        0: Clear
        1: Sunny and cloudy
        2: Cloudy
        3: Yin
        4: Shower
        5: Rain
        6: Thundershower
        7: Snow
        8: Smog
        */
        model.weather = 8;

        [self.lhBleManager setWeatherInfo:model];
        
    } else if ([per isEqualToString:@"Start or Stop Blood Oxygen Monitoring"]){
        if (self.managerCongfig.bloodOxyMode == 0) {
            NSLog(@"nonsupport");
            return;
        }
        [LHManager addObserver:self identifier:kLHBloodOxygenMeasurement mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            /// When the measurement is completed, the blood oxygen health data will be dropped to obtain the last data display, and the return indicates the end of the measurement
            // 1, successfully turned on or off, 0, failed to turn on or off, 2, interrupted measurement due to error
            NSLog(@"----Start or Stop Blood Oxygen MonitoringSuccess or not-----%@----",dictionary);
        }];
        [self.lhBleManager bloodOxy:YES];
        
    }else if ([per isEqualToString:@"Start or Stop Heart Rate Monitoring"]){
        [LHManager addObserver:self identifier:kLHHeartMeasurement mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            /// The measurement is completed. Get the last data display in the heart rate health data callback. If there is a return, the measurement is over
            // 1, successfully turned on or off, 0, failed to turn on or off, 2, interrupted measurement due to error
            NSLog(@"----Start or Stop Heart Rate MonitoringSuccess or not-----%@----",dictionary);
        }];
        [self.lhBleManager startHeart:YES];
        
    }else if ([per isEqualToString:@"Start or Stop Blood Pressure Monitoring"]){
        [LHManager addObserver:self identifier:kLHBloodMeasurement mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            /// The measurement is completed in the blood pressure health data callback to obtain the last data display, if there is a return, the measurement is over
            // 1, successfully turned on or off, 0, failed to turn on or off, 2, interrupted measurement due to error
            NSLog(@"----Start or Stop Blood Pressure MonitoringSuccess or not-----%@----",dictionary);
        }];
        [self.lhBleManager startBlood:YES];
        
    }else if ([per isEqualToString:@"Start or Stop Temperature Monitoring"]){
        [LHManager addObserver:self identifier:kLHTempMeasurement mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            /// The measurement is completed. The last data is obtained in the temperature health data callback. If there is a return, the measurement is over
            // 1, successfully turned on or off, 0, failed to turn on or off, 2, interrupted measurement due to error
            NSLog(@"----Start or Stop Temperature MonitoringSuccess or not-----%@----",dictionary);
        }];
        [self.lhBleManager startTemp:YES];
        
        
    }else if ([per isEqualToString:@"Sync System Time"]){
        [LHManager addObserver:self identifier:KLHSynTime mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            
            // 1: The setting succeeds. 0: the setting fails
            NSLog(@"----Sync System Time Success or not-----%@----",dictionary);
        }];
        [self.lhBleManager synTime];
        
    }else if ([per isEqualToString:@"Start or End Device Search"]){
        
        [LHManager addObserver:self identifier:kLHSearchDevice mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            
            // 1: Enabled or disabled successfully. 0: enabled or disabled failed
            NSLog(@"----Start or End Device Search Success or not-----%@----",dictionary);
        }];
        
        
        [self.lhBleManager searchDevice:YES];
        
    }else if ([per containsString:@"Get Battery Level"]){
        [LHManager addObserver:self identifier:kLHPower mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"---Battery-----%@----",dictionary);
        }];
        [self.lhBleManager getDevicePower];
    }
    
    /// Dial related
    if ([per containsString:@"APP -> Bracelet: Request Bracelet Dial Code and Current Dial"]){
        
        if ([LHManager sharedInstance].bleCongfig.dialSetting == 0) {
            NSLog(@"-----This device does not support setting a dial---------");
            return;
        }
        
        [LHManager addObserver:self identifier:kLHDialList mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"-----APP -> Bracelet: Request Bracelet Dial Code and Current Dial-----%@----",dictionary);
            
            self.deviceSupportDialModel = dictionary[kLHDialList];
            
        }];
        
        
        
        ///APP -> Bracelet: Request Bracelet Dial Code and Current Dial
        [[LHManager sharedInstance] getDialList];
        
        
    }else if([per containsString:@"APP -> Watch: Request Custom Dial Information"]){
        
        if ([LHManager sharedInstance].bleCongfig.dialCustom == 0) {
            NSLog(@"----- This device does not request custom dial information---------");
            return;
        }
        
        if (!self.deviceSupportDialModel){
            NSLog(@"-----Please send first “APP -> Bracelet: Request Bracelet Dial Code and Current Dial”order---------");
        }
        
        [LHManager addObserver:self identifier:kLHGetCustomDial mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"-----Return value for requesting custom dial information-----%@----",dictionary);
            
            self.dialCustomModel = dictionary[kLHGetCustomDial];
            
        }];
        
        
        /// Request custom dial information
        [[LHManager sharedInstance] getCustomDial: self.deviceSupportDialModel.customDialCode];
        
    }else if([per containsString:@"APP -> Watch: Set Custom Dial Information"]){
        if ([LHManager sharedInstance].bleCongfig.dialCustom == 0) {
            NSLog(@"-----This device does not APP -> Watch: Set Custom Dial Information---------");
            return;
        }
        
        [LHManager addObserver:self identifier:kLHSetCustomDial mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            
            int valeue =  [dictionary[kLHSetCustomDial] intValue];
            
            if (valeue == 1) {
                
                NSString *path = [[NSBundle mainBundle] pathForResource:@"test.jpg" ofType:nil inDirectory:@""];
                UIImage *finalImage = [[UIImage alloc]initWithContentsOfFile:path];
            
                ///需要更新，启动墙纸大文件传输协议
                [[OTAManager shared] pushCustomWallpaper:[finalImage imageDrawInSize:self.managerCongfig.dialSize] progress:^(double progress) {
                    NSLog(@"-------Push progress--------%f",progress);
                } Complete:^(LHOTAResultType type) {
                    NSLog(@"-------Push result--------%ld",type);
                    
                } ];
            }
            
            NSLog(@"-----APP -> Watch: Set Custom Dial Information-----%@----",dictionary);
            
        }];
        
        HFDialCustomModel * model = [self.dialCustomModel mutableCopy];
        model.x = 20;
        model.y = 20;
        model.overTimeType = 2;
        model.belowTimeType = 1;
        model.rgb565 = [UIColor getRgb565:0x080808];
        ///2, is to restore the default wallpaper
        model.updateBg = 1;
        
        /// Request custom dial information
        [[LHManager sharedInstance] setCustomDial:model];
        
    }else if ([per containsString:@"APP -> Bracelet: Push Dial"]){
        if ([LHManager sharedInstance].bleCongfig.dialPush == 0) {
            
            NSLog(@"-----This device is not supported APP -> Bracelet: Push Dial---------");
            return;
        }
        
        [LHManager addObserver:self identifier:kLHDialPush mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            
            int valeue =  [dictionary[kLHDialPush] intValue];
            
            if (valeue == 1) {
                
                /// This bin is encrypted and needs to be replaced by your own dial bin, showing only the progress
                NSString *path=[[NSBundle mainBundle] pathForResource:@"A0A0" ofType:@"bin"];
                NSData *fileData = [NSData dataWithContentsOfFile:path];                ///需要更新，启动表盘大文件传输协议
                [[OTAManager shared] dailPush:fileData  progress:^(double progress) {
                    NSLog(@"-------Push progress--------%f",progress);
                } Complete:^(LHOTAResultType type) {
                    NSLog(@"-------Push result--------%ld",type);
                    
                }];
            }
            
            NSLog(@"-----APP -> Bracelet: Push Dial-----%@----",dictionary);
            
        }];
        
        ///APP -> Bracelet: Push Dial,如果不需要不要发送
        [[LHManager sharedInstance] DialPush:YES];
    }
    
    
    if ([per containsString:@"Sync Contacts"]  ) {
        if (self.managerCongfig.supportPhoneBook == 0) {
            
            
            NSLog(@"-----This device is not supported Sync Contacts---------");
            return;
        }
        NSMutableArray * contacts = [[NSMutableArray alloc]initWithCapacity:0];
        for (int i = 0; i<=10; i++) {
            HFContactModel * model = [HFContactModel new];
            model.name = [NSString stringWithFormat:@"name%d",i];
            model.phone = @"17688933842";
            [contacts addObject:model];
        }
        [[OTAManager shared] sendOtaContactData:contacts  progress:^(double progress) {
            NSLog(@"-------Push address book progress--------%f",progress);
        } Complete:^(LHOTAResultType type) {
            NSLog(@"-------Push address book result--------%ld",type);
            
        } ];
        
    }
//    else if([per isEqualToString:@"获取设备当前状态，是否可以OTA"]){
//        if ([LHDeviceInfo sharedLHDeviceInfo].supportOTA == 0) {
//            NSLog(@"-----此设备不支持OTA功能---------");
//            return;
//        }
//        
//        [[OTAManager shared] getStatusOfTheDeviceToBeOTA:^(OTADeviceStatusType type) {
//            NSLog(@"-----OTA功能状态--------%ld",type);
//        }];
//        
//    }else if([per isEqualToString: @"设备OTA"]){
//        if ([LHDeviceInfo sharedLHDeviceInfo].supportOTA == 0) {
//            NSLog(@"-----此设备不支持OTA功能---------");
//            return;
//        }
//        #warning 替换成你实际需要推送的OTA文件
//        NSString *path=[[NSBundle mainBundle] pathForResource:@"syd8811_band" ofType:@"bin"];
//        NSData *fileData = [NSData dataWithContentsOfFile:path];
//        
//        if(!fileData){
//            NSLog(@"-----ota 文件为空---------");
//            return;
//        }
//        
//        ///   - subCommand: 次功能
//        ///         0x01    主程序OTA
//        ///         0x02    相关设置OTA
//        ///         0x03    内部资源OTA
//        ///         0x04    外部资源OTA
//        ///         0x05    提示音OTA
//        ///         0x06    dsp xip code OTA
//        ///         0x07    dsp code OTA
//        [[OTAManager shared] sendOta:fileData subCommand:1  progress:^(double progress) {
//            NSLog(@"-------推送进度--------%f",progress);
//        } Complete:^(LHOTAResultType type) {
//            NSLog(@"-------推送结果--------%ld",type);
//            
//        }];
//        
//    }
    
    if ([per isEqualToString:@"Unbind Device"]){
        [LHManager addObserver:self identifier:kLHUnBind mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Unbind DeviceSuccess or not-----%@----",dictionary);
        }];
        // Pop-up prompts the user: Please later in [Settings]-- &gt; Find the device in [Bluetooth] and unbind it
        [self.lhBleManager unBindDevice];
        
    }else if ([per isEqualToString:@"Restore Factory Settings"]){
        [LHManager addObserver:self identifier:kLHResetDevice mainThread:YES actionBlock:^(id observer, NSDictionary *dictionary) {
            NSLog(@"----Restore Factory SettingsSuccess or not-----%@----",dictionary);
        }];
        [self.lhBleManager resettingDevice];
        
    }
    
    
    
    
}
- (UITableView *)tableview
{
    if (!_tableview) {
        _tableview = [[UITableView alloc] initWithFrame:CGRectMake(0, 0, kW , kH - 64) style:UITableViewStylePlain];
        _tableview.delegate = self;
        _tableview.dataSource = self;
        _tableview.tableFooterView = [UIView new];
    }
    return _tableview;
}

- (NSMutableArray *)titiltArray{
    if (!_titiltArray) {
        _titiltArray  = [[NSMutableArray alloc]initWithCapacity:0];
    }
    
    return _titiltArray;
    
}
@end
