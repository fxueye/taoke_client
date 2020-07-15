//
//  AlibcTradePageLifeCycle.h
//  AlibcTradeBiz
//
//  Created by zhongweitao on 2020/4/23.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>

@protocol AlibcTradePageLifeCycle <NSObject>

@optional

/// @brief H5 容器释放时机调用 （注意 viewController的使用，处于不完整状态）
- (void)webPageDidClose:(UIViewController *)viewController;

@end

