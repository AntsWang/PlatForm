    /**
     * 登录
     * @param code 微信授权登录，从地址栏中获取得到
     * @param handler 登录回调事件
     */
 function Login(handler) {

    //获取地址栏中code
    let code = GetQuery("code");
    //获取地址栏中state参数，即父级（推荐人）ID
    let parentId = GetQuery("parentid");

    //从缓存中获取Code，包括Code，Token,GameToken
    let cacheAuthorization = CacheManager.GetCache(CacheType.Authorization);
    let authorizationDto = cacheAuthorization.GetAuthorization();

    if(authorizationDto && authorizationDto.ParentID != parentId) {
    cacheAuthorization.ClearAuthorization();
    authorizationDto = cacheAuthorization.GetAuthorization();
    let cacheMemberInfo = CacheManager.GetCache(CacheType.UserInfo);
    cacheMemberInfo.ClearUserInfo();
    this.webApi.ClearToken();
    console.log("clear parent");
}

if ((authorizationDto != null && code && code != authorizationDto.Code) || (authorizationDto == null && code)) {
    //1.存在存储的Code，传入Code存在且不等于存储的Code，直接使用Code登录
    //2.没有存储的Code，传入Code存在，直接使用Code登录
    this.LoginByCode(code, parentId, handler);
} else if (authorizationDto != null && authorizationDto.Token && !authorizationDto.IsTourists) {
    //token存在，且不为游客
    this.LoginByToken(code, authorizationDto.Token, parentId, handler);
} else {
    //其他均为游客模式登录
    let token = "";
    if (authorizationDto && authorizationDto.Token) {
        token = authorizationDto.Token
    }
    //this.LoginByTourist(code, token, parentId, handler);
    window.LoginByTourist(ApiConfig.LoginByTourist, code, token, parentId, handler);
}
    }





/**
 * 游客登录
 * @param token 游客临时token
 * @param parentId 父级ID
 * @param handler 回调
 */
function LoginByTourist(url, code, token, parentId, handler) {
    console.log("11111", window.Dtos);
    console.log("LoginByTourist", code, token, parentId);
    let loginParamsDto = {
        method: "POST",
        url: url,
        data: {
            DeviceType: 'MOBILE',
            DeviceId: 123456,
        },
        success: function (response) {
            if (typeof handler == "function") {
                handler(response);
            }

        }
    };
    // if (token) {
    //     this.webApi.SetToken(token);
    // } else {
    //     this.webApi.ClearToken();
    // }
    //调用单例api的Post方法
    Ajax(loginParamsDto)


}