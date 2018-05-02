
export const IsDebug = false;
export const Domain = IsDebug ? "www.zyyft.cn" : "eg.s1.natapp.cc";
export const WebApiBaseUrl = IsDebug ? "http://192.168.0.143:8200" : `http://${Domain}/api`;
export const BetWebApiBaseUrl = IsDebug ? "http://192.168.0.143:8201" : `http://${Domain}/report`;
export const CacheType = 0; //0 localstorage , 1 cookie ,2 session
export function GetRedirectUrl(gameID: any) {
    return `http://${this.Domain}/${gameID}/`;
}
export let Language = "CH";

export const DeviceType = "MOBILE";
export const DeviceId = "123456";
//export let AppId = IsDebug ? "wxbb5416518880be41" : localStorage.getItem("AppId");//localStorage.getItem("AppId")"wx9baa444781060c25"
export function GetWeChatShareDto(parentID: string, isAuthorize: boolean = true) {
    let AppId = localStorage.getItem("AppId");
    let dto: any = {
        Title: "游戏分享平台",
        Desc: "精彩小游戏",
        ImgUrl: `http://${Domain}/gameshareplatform/images/logo.png`,
        Link: ""
    }
    if (isAuthorize) {
        dto.Link = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=http%3A%2F%2F${this.Domain}%2Fgameshareplatform%2F%3fparentid%3d${parentID}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
    } else {
        dto.Link = `http://${this.Domain}/gameshareplatform/?parentid=${parentID}`;
    }
    return dto;
}