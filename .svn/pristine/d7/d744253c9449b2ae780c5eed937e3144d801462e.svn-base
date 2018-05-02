import * as GameConfig from '../GameConfig';
import { WeChatSignatureDto } from '../Dto/WeChatShareDto';
export default class WeChat {
    private AppId: string;
    private wx: any;
    constructor() {
        this.wx = window.wx;

    }

    /**
     * 初始化
     * @param dto 
     */
    public Init(dto: WeChatSignatureDto): void {
        this.AppId = GameConfig.AppId;
        if (this.wx) {
            this.wx.config({
                debug: false,
                appId: GameConfig.AppId,
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

    public GetNetworkType(handler: Function): void {
        if (this.wx) {
            this.wx.getNetworkType({
                success: function (res: any) {
                    if (res.errMsg == "getNetworkType:fail") {
                        handler(null);
                    } else {
                        let networkType: any = res.networkType; // 返回网络类型2g，3g，4g，wifi
                        handler(networkType);
                    }
                }
            });
        } else {
            console.log("未引入weixin.js");
        }
    }

    public checkJsApi(api: any[], handler: any) {
        this.wx.checkJsApi({
            jsApiList: api, // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function (res: any) {
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

    /**
     * 分享朋友圈
     * @param title 标题
     * @param imgUrl 图片地址
     * @param link 跳转网页地址
     * @param handler 回调
     */
    public ShareTimeline(title: string, imgUrl: string, link: string, handler: Function) {
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
    public ShareAppMessage(title: string, desc: string, imgUrl: string, link: string, handler: Function) {
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
    public ShareQQ(title: string, desc: string, imgUrl: string, link: string, handler: Function) {
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
    public ShareQZone(title: string, desc: string, imgUrl: string, link: string, handler: Function) {
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
}