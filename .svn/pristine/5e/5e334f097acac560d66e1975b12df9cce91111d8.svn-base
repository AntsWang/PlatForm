
var Dtos = {};
(function (Dto) {
    Dto.LoginParamsDto = {
        /**
         * 设备号
         */
        DeviceId: "123456",
        /**
         * 设备号
         */
        DeviceType: "MOBILE",
    };
    Dto.LoginByAccountDto = {
        /**
         * 账号
        */
        Account: "",
        /**
         * 密码
         */
        Password: ""
    };
    Dto.LoginDto = {
        ...Dto.LoginParamsDto,
        /**
         * 从微信获取openid的Code
         */
        Code: "",
        /**
         * 会员ID
         */
        MemberID: "",
        /**
         * 父级(推荐人)会员编号
         */
        ParentID: "1",
        /**
         * 游戏ID
         */
        GameID: null
    };
    Dto.LoginResultDto = {
        /**
         * 结果
         */
        Result: "",
        /**
         * 信息
         */
        Data: "",
    };
    Dto.LoginMultiAccountDto = {
        /**
         * 多账号临时Token
         */
        TempToken: "",
        /**
         * 多账号信息
         */
        Accounts: "",
    };
    Dto.LoginSuccessDto = {
        /**
         * 会员ID
         */
        MemberId: null,
        /**
         * 用户Token
         */
        Token: "",
        /**
         * 游戏Token
         */
        SocketToken: "",
        /**
         * 账号是否关闭
         */
        Closed: false,
        /**
         * 分数
         */
        Score: "",
    };
    Dto.ResultEnum = {
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
    };
    Dto.LoginByCodeDto = {
        ...Dto.LoginParamsDto,
        /**
         * 从微信获取openid的Code
         */
        Code: "",
        /**
         * 父级(推荐人)会员编号
         */
        ParentID: "1",
    };
    Dto.LoginByIdDto = {
        ...Dto.LoginParamsDto,
        /**
         * 会员ID
         */
        MemberID: null,
    };
    /**
 * 授权登录信息Dto
 */
    Dto.UserInfoDto = {
        /**
         * 账号
         */
        Account: "",
        /**
         * 会员ID
         */
        MemberId: null,
        /**
         * 昵称
         */
        Nickname: "",
        /**
         * 分数
         */
        Score: null,
        /**
         * 头像
         */
        HeadImageUrl: "",
    }
    /**
 * 授权登录信息Dto
 */
    Dto.AuthorizationDto = {
        /**
         * Token
         */
        Token: "",
        /**
         * 微信Code
         */
        Code: "",
        /**
         * 账号是否关闭
         */
        IsClose: false,
        /**
         * 是否多账号
         */
        IsMulti: false,
        /**
         * 多账号信息
         */
        Accounts: "",
        /**
         * 是否是游客
         */
        IsTourists: true,
        /**
         * 父级ID
         */
        ParentID: "1",
    };
    Dto.MultiAccountDto = {
        /**
         * 会员ID
         */
        MemberId: "",
        /**
         * 账号
         */
        Account: "",
        /**
         * 父级昵称
         */
        ParentNickname: ""
    }
})(Dtos);