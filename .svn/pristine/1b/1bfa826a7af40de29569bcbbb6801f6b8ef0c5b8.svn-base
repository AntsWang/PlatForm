import { MultiAccountDto } from './AuthorizationDto';

export class LoginParamsDto {
    /**
     * 设备号
     */
    public DeviceId: string = "123456";
    /**
     * 设备号
     */
    public DeviceType: string = "MOBILE";
}

/**
 * 通过Code登录
 */
export class LoginByCodeDto extends LoginParamsDto {
    /**
     * 从微信获取openid的Code
     */
    public Code: string;
    /**
     * 父级(推荐人)会员编号
     */
    public ParentID: string;
}
/**
 * 通过Code登录
 */
export class LoginByIdDto extends LoginParamsDto {
    /**
     * 会员ID
     */
    public MemberID: number;
}

/**
 * 登录参数Token
 */
export class LoginDto extends LoginParamsDto {
    /**
     * 从微信获取openid的Code
     */
    public Code: string;
    /**
     * 会员ID
     */
    public MemberID: number;
    /**
     * 父级(推荐人)会员编号
     */
    public ParentID: string;
    /**
     * 游戏ID
     */
    public GameID: number;
}

/**
 * 登录成功返回结果Dto
 */
export class LoginSuccessDto {
    /**
     * 用户Token
     */
    public SessionToken: string;
    /**
     * 游戏Token
     */
    public SocketToken: string;
    /**
     * 账号是否关闭
     */
    public Closed: boolean;
}

/**
 * 登录成功，但有多账号结果Dto
 */
export class LoginMultiAccountDto {
    /**
     * 多账号临时Token
     */
    public TempToken: string;
    /**
     * 多账号信息
     */
    public Accounts: Array<MultiAccountDto>;
}

export enum ResultEnum {
    /**
     * 错误
     */
    ERROR,
    /**
     * 登录成功
     */
    LOGIN,
    /**
     * 多账号
     */
    MULTI,
    /**
     * 未登录，游客
     */
    NO,
}

/**
 * 登录结果
 */
export class LoginResultDto {
    /**
     * 结果
     */
    public Result: ResultEnum;
    /**
     * 信息
     */
    public Data: any;
}