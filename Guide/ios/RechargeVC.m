
// NSString *password = @"17bd70aea8c4435c94184115871bdc86";
// App Store Connect 我的App 点击app 功能 App内购买项目 App专用共享密钥

#import "RechargeVC.h"

@interface RechargeVC ()

@end

@implementation RechargeVC

-(void)buy{
    NSLog(@"================buy");
    [[SKPaymentQueue defaultQueue] addTransactionObserver:self];
    if ([SKPaymentQueue canMakePayments]) {
        NSLog(@"允许程序内付费购买");
        [self RequestProductData];
    }else{
        NSLog(@"不允许程序内付费购买");
    }
}

-(void)RequestProductData{
    NSLog(@"================RequestProductData");
    NSArray *product = [[NSArray alloc] initWithObjects:@"20190731",nil];
    NSSet *nsset = [NSSet setWithArray:product];
    SKProductsRequest *request=[[SKProductsRequest alloc] initWithProductIdentifiers: nsset];
    request.delegate=self;
    [request start];}

// <SKProductsRequestDelegate> 请求协议//收到的产品信息
- (void)productsRequest:(SKProductsRequest *)request didReceiveResponse:(SKProductsResponse *)response{
    NSLog(@"================RequestProductData");
    NSArray *myProduct = response.products;
    NSLog(@"产品Product ID:%@",response.invalidProductIdentifiers);
    NSLog(@"产品付费数量: %d", (int)[myProduct count]);
    for(SKProduct *product in myProduct){
        NSLog(@"-----------描述 %@", [product description]);
        NSLog(@"-----------标题 %@" , product.localizedTitle);
        NSLog(@"-----------描述 %@" , product.localizedDescription);
        NSLog(@"-----------价格 %@" , product.price);
        NSLog(@"-----------id  %@" , product.productIdentifier);
        
    }
    SKPayment *payment = [SKPayment paymentWithProductIdentifier:@"20190731"];
    [[SKPaymentQueue defaultQueue] addPayment:payment];
}

- (void)requestProUpgradeProductData{
    NSLog(@"================requestProUpgradeProductData");
    NSSet *productIdentifiers = [NSSet setWithObject:@"com.productid"];
    SKProductsRequest* productsRequest = [[SKProductsRequest alloc] initWithProductIdentifiers:productIdentifiers];
    productsRequest.delegate = self;
    [productsRequest start];
}

//弹出错误信息
- (void)request:(SKRequest *)request didFailWithError:(NSError *)error{
    NSLog(@"================request");
}

-(void)requestDidFinish:(SKRequest *)request{
    NSLog(@"================requestDidFinish");
    
}

-(void)PurchasedTransaction: (SKPaymentTransaction *)transaction{
    NSLog(@"================PurchasedTransaction");
    NSArray *transactions =[[NSArray alloc] initWithObjects:transaction, nil];
    [self paymentQueue:[SKPaymentQueue defaultQueue] updatedTransactions:transactions];
    
}

- (void)paymentQueue:(SKPaymentQueue *)queue updatedTransactions:(NSArray *)transactions{
    NSLog(@"================paymentQueue");
    for (SKPaymentTransaction *transaction in transactions) {
        switch (transaction.transactionState) {
            case SKPaymentTransactionStatePurchased:{
                NSLog(@"------------交易完成");
                [self completeTransaction:transaction];
            } break;
            case SKPaymentTransactionStateFailed://交易失败
            {
                [self failedTransaction:transaction];
                NSLog(@"------------交易失败");
            }break;
            case SKPaymentTransactionStateRestored://已经购买过该商品 [self restoreTransaction:transaction];
                NSLog(@"------------已经购买过该商品");
            case SKPaymentTransactionStatePurchasing:
                //商品添加进列表
                NSLog(@"------------商品添加进列表");
                break;
            default:
                NSLog(@"------------交易默认");
                break;
        }
    }
}

//记录交易
-(void)recordTransaction:(NSString *)product{
    NSLog(@"================recordTransaction记录交易%@", product);
}

//处理下载内容
-(void)provideContent:(NSString *)product{
    NSLog(@"================provideContent下载");
}

- (void)failedTransaction: (SKPaymentTransaction *)transaction{
    NSLog(@"================failedTransaction失败");
    if (transaction.error.code != SKErrorPaymentCancelled) { }
    [[SKPaymentQueue defaultQueue] finishTransaction: transaction];
}

-(void)paymentQueueRestoreCompletedTransactionsFinished: (SKPaymentTransaction *)transaction{}- (void) restoreTransaction: (SKPaymentTransaction *)transaction{
    NSLog(@"================paymentQueueRestoreCompletedTransactionsFinished交易恢复处理");
}

-(void)paymentQueue:(SKPaymentQueue *) paymentQueue restoreCompletedTransactionsFailedWithError:(NSError *)error{
    NSLog(@"================paymentQueue   %@",error);

}

#pragma mark connection delegate
- (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data{
    NSLog(@"================connection");
    NSLog(@"%@", [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]);
}

- (void)connectionDidFinishLoading:(NSURLConnection *)connection{}- (void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response{
    NSLog(@"================connectionDidFinishLoading");
    switch([(NSHTTPURLResponse *)response statusCode]) {
        case 200:
        case 206:
            break;
        case 304:
            break;
        case 400:
            break;
        case 404:
            break;
        case 416:
            break;
        case 403:
            break;
        case 401:
        case 500:
            break;
        default:
            break;
    }
}

- (void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error {
    NSLog(@"================connection");
}

-(void)dealloc{
    NSLog(@"================dealloc");
    [[SKPaymentQueue defaultQueue] removeTransactionObserver:self];
    [super dealloc];
}

//交易结束
- (void)completeTransaction:(SKPaymentTransaction *)transaction {
    NSLog(@"交易结束!!!!!!!!!!!!!!!");

    // appStoreReceiptURL iOS7.0增加的，购买交易完成后，会将凭据存放在该地址
    NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
    // 获取到购买凭据
    NSData *receiptData = [NSData dataWithContentsOfURL:receiptURL];
    NSString *string = [[NSString alloc] initWithData:receiptData encoding:NSUTF8StringEncoding];
    NSLog(@"=============: %@", string);
    //NSLog(@"=============: %@", receiptData);

    NSString *encodeStr = [receiptData base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
    //购买完成向后台发送receipt-data，后台校验发送部分略
    NSString *password = @"17bd70aea8c4435c94184115871bdc86";
    NSString *sendString = [NSString stringWithFormat:@"{\"receipt-data\" : \"%@\",\"password\" : \"%@\"}", encodeStr,password];

    //‼️沙盒测试时用
    NSString * str = [[NSString alloc]initWithData:receiptData encoding:NSUTF8StringEncoding];

    //NSString *environment=[self environmentForReceipt:str];

    NSURL *StoreURL=nil;
    //if ([environment isEqualToString:@"environment=Sandbox"]) {

        StoreURL= [[NSURL alloc] initWithString: @"https://sandbox.itunes.apple.com/verifyReceipt"];
    //}
    //else{
        //StoreURL= [[NSURL alloc] initWithString: @"https://buy.itunes.apple.com/verifyReceipt"];
    //}
    /*‼️提交审核时用，将沙盒测试部分（171-183行）去掉
     NSURL *StoreURL= [[NSURL alloc] initWithString: @"https://buy.itunes.apple.com/verifyReceipt"];
     */
    //这个二进制数据由服务器进行验证；zl
    NSData *postData = [NSData dataWithBytes:[sendString UTF8String] length:[sendString length]];
    NSMutableURLRequest *connectionRequest = [NSMutableURLRequest requestWithURL:StoreURL];

    [connectionRequest setHTTPMethod:@"POST"];
    [connectionRequest setTimeoutInterval:50.0];//120.0---50.0zl
    [connectionRequest setCachePolicy:NSURLRequestUseProtocolCachePolicy];
    [connectionRequest setHTTPBody:postData];
    NSError *error = nil;
    NSData *responseData = [NSURLConnection sendSynchronousRequest:connectionRequest returningResponse:nil error:&error];
    if (error) {
        NSLog(@"验证购买过程中发生错误，错误信息：%@",error.localizedDescription);
        return;
    }
    
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:responseData options:NSJSONReadingAllowFragments error:nil];
    for (id key in dic) {
        
        id value=[dic objectForKey:key];
        
        NSLog(@"%@:%@",key,value);
        //NSLog(@"%@:",key);
        
    }
//    NSString *product = transaction.payment.productIdentifier;
//    if ([product length] > 0) {
//
//        NSArray *tt = [product componentsSeparatedByString:@"."];
//        NSString *bookid = [tt lastObject];
//        if ([bookid length] > 0) {
//            [self recordTransaction:bookid];
//            [self provideContent:bookid];
//        }
//    }

    [[SKPaymentQueue defaultQueue] finishTransaction:transaction];
}
    
+ (NSString*)questResult{
    NSLog(@"================questResult  start");
    NSURL *receiptURL = [[NSBundle mainBundle] appStoreReceiptURL];
    NSData *receiptData = [NSData dataWithContentsOfURL:receiptURL];
    NSString *encodeStr = [receiptData base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
    NSString *password = @"17bd70aea8c4435c94184115871bdc86";
    NSString *sendString = [NSString stringWithFormat:@"{\"receipt-data\" : \"%@\",\"password\" : \"%@\"}", encodeStr,password];
    NSURL *StoreURL= [[NSURL alloc] initWithString: @"https://sandbox.itunes.apple.com/verifyReceipt"];
    NSData *postData = [NSData dataWithBytes:[sendString UTF8String] length:[sendString length]];
    NSMutableURLRequest *connectionRequest = [NSMutableURLRequest requestWithURL:StoreURL];
    [connectionRequest setHTTPMethod:@"POST"];
    [connectionRequest setTimeoutInterval:50.0];//120.0---50.0zl
    [connectionRequest setCachePolicy:NSURLRequestUseProtocolCachePolicy];
    [connectionRequest setHTTPBody:postData];
    NSError *error = nil;
    NSData *responseData = [NSURLConnection sendSynchronousRequest:connectionRequest returningResponse:nil error:&error];
    if (error) {
        NSLog(@"验证购买过程中发生错误，错误信息：%@",error.localizedDescription);
        UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"error" message:error.localizedDescription delegate:self cancelButtonTitle:@"关闭" otherButtonTitles:nil, nil];
        [alert show];
        return @"0";
    }
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:responseData options:NSJSONReadingAllowFragments error:nil];
    
    NSArray *latest_receipt = [dic objectForKey:@"latest_receipt_info"];
    if(!latest_receipt){
        return @"1";
    }
//    NSArray *value = [dic objectForKey:@"pending_renewal_info"];
//    if(!value){
//        //return false;
//    }
//    NSDictionary *value_obj =[value firstObjectCommonWithArray:value];
//    NSLog(@"%@",value_obj);
    //NSLog(@"%@",latest_receipt);
//    for (NSDictionary * latest_valu in latest_receipt) {
//        NSString *expires_time = [latest_valu objectForKey:@"expires_date_ms"];
//        NSLog(@"++++++++++ %@:",expires_time);
//    }
    NSDictionary *latest_value =[latest_receipt lastObject];
    if(!latest_value){
        return @"1";
    }    NSLog(@"%@",latest_value);
    NSString *expires_time = [latest_value objectForKey:@"expires_date_ms"];
    if(!expires_time){
        return @"2";
    }
    return expires_time;
    
    

    

    
    
//    NSString* num_0 = [value_obj objectForKey:@"auto_renew_status"];
//    id num_1 = [value_obj objectForKey:@"expiration_intent"];
//    NSLog(@"================%@", num_0);
//    NSLog(@"================%@", num_1);
//    int num_3 = [num_0 intValue];
//    NSLog(@"================%i", num_3);
//    if(!num_0){
//        NSLog(@"================3333333");
//        return false;
//    }
//    if(num_3 == 0){
//        NSLog(@"================111111");
//        return false;
//    }
//    NSLog(@"================questResult  end");    //NSLog(@"%@",value);
//    return true;
    
}


@end
