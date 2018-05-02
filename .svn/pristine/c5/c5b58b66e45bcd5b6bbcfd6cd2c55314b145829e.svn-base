const ResultEnum = {
    /**
     * 错误
     */
    ERROR: 0,
    /**
     * 登录成功
     */
    LOGIN: 1,
    /**
     * 多账号
     */
    MULTI: 2,
    /**
     * 未登录
     */
    NO: 3,
    /**
     * 游客
     */
    Tourist: 4
}
const DeviceType = "MOBILE";
const DeviceId = "123456";
const Domain = "m.17guess.cn";
const LoginByTourist = `http://${Domain}/api/Member/DemoAccountLogin`;
const GetMemberInfo = `http://${Domain}/api/Member/GetUserProfile`;
const LoginCheck = `http://${Domain}/api/Member/LoginByToken`;
const LoginById = `http://${Domain}/api/Member/SelectMember`;
const Login = `http://${Domain}/api/Member/Login`;
const GetJsSignature = `http://${Domain}/api/WeChat/GetJsSignature`;
const GetAppIDApi = `http://${Domain}/api/WeChat/GetAppID`;
const LoginByAccount = `http://${Domain}/api/Member/AccountLogin`;

function GetQuery(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
function LoginService(http, cache, success, multisuccess, error, webApi) {
    this.http = new http();
    this.cache = new cache();
    this.authorization = null;
    this.memberInfo = null;
    this.success = success;
    this.multisuccess = multisuccess;
    this.error = error;
    this.webApi = webApi;
}
LoginService.header = {};
LoginService.prototype.Login = function () {
    //获取地址栏中code
    var code = GetQuery("code");
    //获取地址栏中state参数，即父级（推荐人）ID
    var parentId = GetQuery("parentid");
    //从缓存中获取Code，包括Code，Token,GameToken
    var authorizationDto = this.cache.Get("Authorization-CacheKey");
    if (authorizationDto && authorizationDto.ParentID != parentId) {
        this.ClearAuthorization();
        authorizationDto = this.GetAuthorization();
        this.ClearUserInfo();
        LoginService.header.Authorization = "";
        this.webApi.ClearToken();
        console.log("clear parent");
    }

    if ((authorizationDto != null && code && code != authorizationDto.Code) || (authorizationDto == null && code)) {
        //1.存在存储的Code，传入Code存在且不等于存储的Code，直接使用Code登录
        //2.没有存储的Code，传入Code存在，直接使用Code登录
        this.LoginByCode(code, parentId);
    } else if (authorizationDto != null && authorizationDto.Token && !authorizationDto.IsTourists) {
        //token存在，且不为游客
        this.LoginByToken(code, authorizationDto.Token, parentId);
    } else {
        //其他均为游客模式登录
        var token = "";
        if (authorizationDto && authorizationDto.Token) {
            token = authorizationDto.Token
        }
        this.LoginByTourist(code, token, parentId);
    }
}
/**
* 多账号通过会员id和临时token选择一个账号登录
* @param memberID 会员id
* @param this.success 登录回调事件
*/
LoginService.prototype.LoginByID = function (memberId) {
    try {

        console.log("LoginByID", memberId);
        //获取地址栏中code
        var code = GetQuery("code");
        //获取地址栏中state参数，即父级（推荐人）ID
        var parentID = GetQuery("parentid");
        //从缓存中获取Code，包括Code，Token,GameToken
        var authorizationDto = this.cache.Get("Authorization-CacheKey");
        if (authorizationDto != null && authorizationDto.Token) {
            var loginByIdDto = {
                MemberID: memberId,
                DeviceType: DeviceType,
                DeviceId: DeviceId
            };
            //设置token到单例webapi
            LoginService.header.Authorization = authorizationDto.Token;
            this.webApi.SetToken(authorizationDto.Token);
            this.http.Post(LoginById, loginByIdDto, LoginService.header, (res) => {
                var { Data, Result } = res;
                if (Result == 1) {
                    this.LoginSuccess(Data, code, parentID, false);
                } else {
                    this.LoginError(Result);
                }

            }, (err) => {
                console.log(err);
                this.LoginError(err);
            });
        } else {
            var result = {
                Result: ResultEnum.NO
            };
            // result.Result = ResultEnum.NO;
            this.success(result);
        }
    } catch (error) {
        //var msg: string = this.languageManager.GetErrorMsg(JSON.stringify(error));
        //alert(msg);
        console.log("LoginByID", error)
    }
}
/**
 * 有Code，使用授权Code登录
 * @param code code
 * @param parentId 父级ID
 * @param this.success 回调
 */
LoginService.prototype.LoginByCode = function (code, parentId) {
    console.log("LoginByCode", code, parentId);
    //通过Code登录
    var loginByCodeDto = {
        Code: code,
        ParentID: parentId,
        DeviceType: DeviceType,
        DeviceId: DeviceId
    };
    this.http.Post(Login, loginByCodeDto, LoginService.header, (res) => {
        console.log(res);
        var { Data, Result } = res;
        if (Result == 1) {
            if (!Data.Accounts) {
                this.LoginSuccess(Data, code, parentId, false);
            } else {
                this.LoginMultiSuccess(Data, code, parentId, false);
            }
        } else {
            this.LoginError(Result);
        }

    }, (err) => {
        console.log("LoginByCode", err);
        this.LoginError(err);
    });
}
/**
 * 有token使用token登录
 * @param token token
 * @param parentId 父级ID
 * @param this.success 回调
 */
LoginService.prototype.LoginByToken = function (code, token, parentId) {
    try {

        console.log("LoginByToken", code, token, parentId);
        //token直接做登录验证
        //设置token到单例webapi
        LoginService.header.Authorization = token;
        this.webApi.SetToken(token);
        //调用单例api的Post方法
        this.http.Post(LoginCheck, null, LoginService.header, (res) => {
            var { Data, Result } = res;
            if (Result == 1) {
                this.LoginSuccess(Data, code, parentId, false);
            } else {
                this.LoginError(Result);
            }

        }, (err) => {
            console.log(err);
            this.LoginError(err);
        });
    } catch (error) {
        //var msg = this.languageManager.GetErrorMsg(JSON.stringify(error));
        console.log("LoginByToken", error);
    }
}
/**
 * 游客登录
 * @param token 游客临时token
 * @param parentId 父级ID
 * @param this.success 回调
 */
LoginService.prototype.LoginByTourist = function (code, token, parentId) {
    try {
        console.log("LoginByTourist", code, token, parentId);
        var loginParamsDto = {};
        loginParamsDto.DeviceType = DeviceType;
        loginParamsDto.DeviceId = DeviceId;
        if (token) {
            LoginService.header.Authorization = token;
            this.webApi.SetToken(token);
        } else {
            LoginService.header.Authorization = "";
            this.webApi.ClearToken();
        }
        this.http.Post(LoginByTourist, loginParamsDto, LoginService.header, (res) => {
            var { Data, Result } = res;
            if (Result == 1) {
                this.LoginSuccess(Data, code, parentId, true);
            } else {
                this.LoginError(Result);
            }

        }, (err) => {
            console.log("LoginByTourist", err);
            this.LoginError(err);
        });
    } catch (error) {
        //var msg = this.languageManager.GetErrorMsg(JSON.stringify(error));
        alert(error);
    }
}

/**
* 账号密码登录
* @param account 账号
* @param passWord 密码
* @param handler 回调
*/
LoginService.prototype.LoginByAccount = function (account, passWord, handler) {
    console.log("LoginByAccount");
    //通过Code登录
    let loginByAccountDto = {
        Account: account,
        Password: passWord,
    };
    loginByAccountDto.Account = account;
    loginByAccountDto.Password = passWord;
    //调用单例api的Post方法，
    // this.webApi.Post(ApiConfig.LoginByAccount, loginByAccountDto).then((data: any) => {
    //     console.log("Login成功回调");
    //     if (!(data as LoginMultiAccountDto).Accounts) {
    //         this.LoginSuccess(data, account, passWord, false, handler);
    //     } else {
    //         this.LoginMultiSuccess(data, account, passWord, false, handler);
    //     }
    // }, (error: any) => {
    //     console.log("Login失败回调");
    //     this.LoginError(error, handler);
    // });
    this.http.Post(LoginByAccount, loginByAccountDto, LoginService.header, (res) => {
        var { Data, Result } = res;
        this.LoginByAccountSuccess(res, null, null, false, handler);

    }, (err) => {
        console.log("LoginByTourist", err);
    });

}

/**
 * 账号密码登录成功回调
 * @param response 会员信息
 */
LoginService.prototype.LoginByAccountSuccess = function (response, code, parentId, isTourist, handler) {
    try {
        var { Data, Result } = response;
        var dto = {};
        //返回结果是登录成功
        if (Result == 1) {
            dto.Code = code || '';
            dto.Token = Data.Token;
            dto.ParentID = parentId;
            dto.IsMulti = false;
            dto.IsTourists = isTourist;
            dto.IsClose = Data.Closed;
            //写入到WebApi
            LoginService.header.Authorization = dto.Token;
            this.webApi.SetToken(dto.Token);

            //写入缓存中
            this.SetAuthorization(dto);
            this.GetMemberInfo();
        }


        var result = {
            Result: Result,
            Data: Data
        };
        if (typeof handler === "function") {
            handler(result);
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * 登录成功回调
 * @param response 会员信息
 */
LoginService.prototype.LoginSuccess = function (response, code, parentId, isTourist) {
    try {
        var { Data, Result } = response;
        //返回结果是登录成功
        var dto = {};
        dto.Code = code || '';
        dto.Token = response.Token;
        dto.ParentID = parentId;
        dto.IsMulti = false;
        dto.IsTourists = isTourist;
        dto.IsClose = response.Closed;
        //写入到WebApi
        LoginService.header.Authorization = dto.Token;
        this.webApi.SetToken(dto.Token);

        //写入缓存中
        this.SetAuthorization(dto);
        this.GetMemberInfo();
    } catch (error) {
        console.log(error);
    }
}

/**
 * 登录成功多账号回调
 * @param response 会员信息
 */
LoginService.prototype.LoginMultiSuccess = function (response, code, parentId, isTourist) {
    try {
        console.log("LoginMultiSuccess", response, code, parentId);
        //返回结果是登录成功
        var dto = {
            Code: code,
            IsMulti: true,
            Token: response.TempToken,
            Accounts: response.Accounts,
            ParentID: parentId,
            IsTourists: isTourist
        };
        //写入缓存中
        this.SetAuthorization(dto);
        var result = {
            Result: ResultEnum.MULTI,
            Data: dto.Accounts
        };
        if (typeof this.success === "function") {
            this.multisuccess(result);
        }
    } catch (error) {
        //var msg: string = this.languageManager.GetErrorMsg(JSON.stringify(error));
        console.log(error);
    }
}
/**
 * 登录错误
 * @param error 
 */
LoginService.prototype.LoginError = function (error) {
    try {
        this.ClearAuthorization();
        this.ClearUserInfo();
        if(error==3){
            window.location.href = "/gameList.html";
            return;
        }
        console.log("LoginError", error);
        var result = {};
        result.Result = ResultEnum.ERROR;
        result.Data = error;
        if (typeof this.error === "function") {
            this.error(result);
        }

    } catch (error) {
        //var msg: string = this.languageManager.GetErrorMsg(JSON.stringify(error));
        console.log(error);
    }
}

/**
 * 获取本地授权信息
 */
LoginService.prototype.GetAuthorizationDtoByLocal = function () {
    //从缓存中获取Code，包括Code，Token,GameToken等
    var authorizationDto = this.GetAuthorization();
    return authorizationDto;
};
/**
 * 获取会员信息
 */
LoginService.prototype.GetMemberInfo = function (needToken) {
    var header = {};
    if (LoginService.header.Authorization) {
        header.Authorization = LoginService.header.Authorization;
    }

    if (needToken) {
        header.Authorization = this.GetAuthorization().Token;
    }
    try {
        this.http.Post(GetMemberInfo, null, header, (res) => {
            console.log("GetMemberInfo", res);
            var { Data, Result } = res;
            if (Result == 1) {
                var result = {
                    Data: this.authorization,
                    MemberInfo: res.Data,
                    Token: LoginService.header.Authorization,
                    Result: 1
                };
                if (typeof this.success === "function") {
                    this.success(result);
                }
                this.SetUserInfo(Data);
            } else {
                this.LoginError(Result);
            }





        }, (err) => {
            console.log("GetMemberInfo", err);
            this.LoginError(err);
        });

    } catch (error) {
        alert(JSON.stringify(error));
    }
};

/**
* 获取会员分数
*/
LoginService.prototype.GetMemberScore = function (handler) {
    try {
        this.http.Post(GetMemberInfo, null, LoginService.header, (res) => {
            console.log("GetMemberScore", res);
            var { Data, Result } = res;
            if (typeof handler === "function") {
                handler(Data);
            }
            this.SetUserInfo(Data);
        }, (err) => {
            console.log(err);
        });

    } catch (error) {
        alert(JSON.stringify(error));
    }
};
/**
 * 设置授权信息
 * @param dto 
 */
LoginService.prototype.SetAuthorization = function (dto, gameId) {
    this.authorization = {
        Code: dto.Code,
        Token: dto.Token,
        IsMulti: dto.IsMulti,
        Accounts: dto.Accounts,
        ParentID: dto.ParentID,
        IsClose: dto.IsClose,
        IsTourists: dto.IsTourists
    }
    this.cache.Set("Authorization-CacheKey", this.authorization);
    return true;
}
/**
 * 设置会员信息
 * @param dto 
 */
LoginService.prototype.SetUserInfo = function (dto, gameId) {
    this.memberInfo = {
        Account: dto.Account,
        HeadImageUrl: dto.HeadImageUrl,
        Nickname: dto.Nickname,
        Score: dto.Score,
        MemberId: dto.MemberId
    }
    this.cache.Set("UserInfo-CacheKey", this.memberInfo);
    return true;
}

/**
 * 获取会员授权信息
 */
LoginService.prototype.GetAuthorization = function () {
    if (this.authorization) {
        return this.authorization;
    }
    this.authorization = this.cache.Get("Authorization-CacheKey");
    return this.authorization;
}

/**
 * 获取会员信息
 */
LoginService.prototype.GetMemberInfoByLocal = function () {
    //从缓存中获取会员信息
    let memberInfoDto = this.cache.Get("UserInfo-CacheKey");
    return memberInfoDto;
};

/**
 * 清除用户数据
 */
LoginService.prototype.ClearUserInfo = function () {
    this.cache.Set("UserInfo-CacheKey", null);
}
/**
 * 清除授权数据
 */
LoginService.prototype.ClearAuthorization = function () {
    this.authorization = null;
    this.cache.Set("Authorization-CacheKey", null);
}

/**
 * 是否登录
 */
LoginService.prototype.IsLogin = function () {
    this.authorizationInfo = this.GetAuthorization();
    if (this.authorizationInfo && this.authorizationInfo.Token) {
        LoginService.loginStatus = true
    }
    return LoginService.loginStatus;
}
//获取Socket Token

/**
 * 是否关闭
 */
LoginService.prototype.IsClose = function () {
    this.authorizationInfo = this.GetAuthorization();
    if (this.authorizationInfo && this.authorizationInfo.Token) {
        LoginService.closeStatus = this.authorizationInfo.IsClose;
    }
    return LoginService.closeStatus;
}