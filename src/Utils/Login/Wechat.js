
const Domains = "m.17guess.cn";
const GetJsSignatures = `http://${Domains}/api/WeChat/GetJsSignature`;
const GetAppIDApis = `http://${Domains}/api/WeChat/GetAppID`;


function Wechat(http, handler, option) {
    this.WeChatShareHandler = handler;
    this.wx = window.wx;
    this.AppId = null;
    this.WeChatShareOption = option;
    this.http = new http();
};
/**
* 分享配置
* @param {*} parentID 
* @param {*} link 
*/
/**
* 获取微信配置信息
* @param url 
*/
Wechat.prototype.GetJsSignature = function () {
    this.GetAppID().then((appid) => {
        try {
            var wechat = this;
            var url = window.location.href.split("#")[0];
            var obj = {
                Url: encodeURIComponent(url),
            }
            this.http.Post(GetJsSignatures, obj, LoginService.header, (res) => {
                console.log("GetJsSignature", res);
                var { Data, Result } = res;
                if (Result == 1) {
                    wechat.Init(appid, Data);
                } else {
                    console.log("获取JS签名错误");
                }

                var authorizeDto = this.WeChatShareOption;
                //分享微信好友
                wechat.ShareAppMessage(authorizeDto.Title, authorizeDto.Desc, authorizeDto.ImgUrl, authorizeDto.Link, this.WeChatShareHandler);

                //分享QQ
                wechat.ShareQQ(authorizeDto.Title, authorizeDto.Desc, authorizeDto.ImgUrl, authorizeDto.Link, this.WeChatShareHandler);

                var dto = this.WeChatShareOption;
                //分享朋友圈
                wechat.ShareTimeline(dto.Title, dto.ImgUrl, dto.Link, this.WeChatShareHandler);
                //分享qq空间
                wechat.ShareQZone(dto.Title, dto.Desc, dto.ImgUrl, dto.Link, this.WeChatShareHandler);
            }, (err) => {
                console.log("GetJsSignature", err);
                this.LoginError(err);
            });

        } catch (error) {
            var msg = this.languageManager.GetErrorMsg(JSON.stringify(error));
            alert(msg);
        }
    }, (err) => {
        console.log("获取appid", err)
    })
}
/**
* 初始化
* @param dto 
*/
Wechat.prototype.Init = function (appid, dto) {
    if (this.wx) {
        this.wx.config({
            debug: false,
            appId: appid,
            timestamp: dto.Timestamp,
            nonceStr: dto.NonceStr,
            signature: dto.Signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
        });
    } else {
        console.log("未引入weixin.js");
    }
}


Wechat.prototype.checkJsApi = function (api, handler) {
    this.wx.checkJsApi({
        jsApiList: api, // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
            console.log(res);
            if (res.errMsg == "checkJsApi:ok") {
                handler();
            }
            else {
                alert(JSON.stringify(res));
            }
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
    });
}
Wechat.prototype.GetNetworkType = function(handler) {
    if (this.wx) {
        this.wx.getNetworkType({
            success: function (res) {
                if (res.errMsg == "getNetworkType:fail") {
                    handler(null);
                } else {
                    let networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                    handler(networkType);
                }
            }
        });
    } else {
        console.log("未引入weixin.js");
    }
}
/**
 * PC端浏览器网络监测
 * @param handler 
 */
Wechat.prototype.GetPcNetworkType = function(handler){
    //网络连接
    if(window.navigator.onLine == true){
        handler(true);
    }else{
        handler(false);
    }
}
/**
* 分享朋友圈
* @param title 标题
* @param imgUrl 图片地址
* @param link 跳转网页地址
* @param handler 回调
*/
Wechat.prototype.ShareTimeline = function (title, imgUrl, link, handler) {
    if (this.wx) {
        this.wx.ready(() => {
            this.checkJsApi(["onMenuShareTimeline"], () => {
                this.wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    imgUrl: imgUrl, // 分享图标
                    link: link, // 分享链接
                    success: () => {
                        // 用户确认分享后执行的回调函数
                        handler(1);
                    },
                    cancel: () => {
                        // 用户取消分享后执行的回调函数
                        handler(0);
                    }
                });
            })

        })
    } else {
        console.log("未引入weixin.js");
        handler(-1);
    }
}

/**
 * 分享微信好友
 * @param title 标题
 * @param desc 描述
 * @param imgUrl 图片地址
 * @param link 跳转网页地址
 * @param handler 回调
*/
Wechat.prototype.ShareAppMessage = function (title, desc, imgUrl, link, handler) {
    if (this.wx) {
        this.wx.ready(() => {
            this.checkJsApi(["onMenuShareAppMessage"], () => {
                this.wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    imgUrl: imgUrl, // 分享图标
                    link: link, // 分享链接	
                    success: () => {
                        // 用户确认分享后执行的回调函数
                        handler(1);
                    },
                    cancel: () => {
                        // 用户取消分享后执行的回调函数
                        handler(0);
                    }
                });
            })
        })
    } else {
        console.log("未引入weixin.js");
        handler(-1);
    }
}

/**
 * 分享QQ
 * @param title 标题
 * @param desc 描述
 * @param imgUrl 图片地址
 * @param link 跳转网页地址
 * @param handler 回调
*/
Wechat.prototype.ShareQQ = function (title, desc, imgUrl, link, handler) {
    if (this.wx) {
        this.wx.ready(() => {
            this.checkJsApi(["onMenuShareAppMessage"], () => {
                this.wx.onMenuShareQQ({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    imgUrl: imgUrl, // 分享图标
                    link: link, // 分享链接
                    success: () => {
                        // 用户确认分享后执行的回调函数
                        handler(1);
                    },
                    cancel: () => {
                        // 用户取消分享后执行的回调函数
                        handler(0);
                    }
                });
            })
        })
    } else {
        console.log("未引入weixin.js");
        handler(-1);
    }
}
/**
* 分享QQ空间
* @param title 标题
* @param desc 描述
* @param imgUrl 图片地址
* @param link 跳转网页地址
* @param handler 回调
*/
Wechat.prototype.ShareQZone = function (title, desc, imgUrl, link, handler) {
    if (this.wx) {
        this.wx.ready(() => {
            this.checkJsApi(["onMenuShareAppMessage"], () => {
                this.wx.onMenuShareQZone({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    imgUrl: imgUrl, // 分享图标
                    link: link, // 分享链接
                    success: () => {
                        // 用户确认分享后执行的回调函数
                        handler(1);
                    },
                    cancel: () => {
                        // 用户取消分享后执行的回调函数
                        handler(0);
                    }
                });
            })
        })
    } else {
        console.log("未引入weixin.js");
        handler(-1);
    }
}

Wechat.prototype.GetAppID = function () {
    return new Promise((resolve, reject) => {
        this.http.Get(GetAppIDApis, null, null, (res) => {
            console.log("GetAppID", res);
            localStorage.setItem("AppId", res.Data);
            resolve(res.Data);
        }, (err) => {
            console.log(err);
            reject(err);
        });
    });

}
