
export class MultiAccountDto {
    /**
     * 会员ID
     */
    public MemberId: number;
    /**
     * 账号
     */
    public Account: string;
    /**
     * 父级昵称
     */
    public ParentNickname: string;
}
/**
 * 授权登录信息Dto
 */
export class AuthorizationDto {
    /**
     * Token
     */
    public Token: string = "";
    /**
     * 微信Code
     */
    public Code: string = null;
    /**
     * 账号是否关闭
     */
    public IsClose: boolean = false;
    /**
     * 是否多账号
     */
    public IsMulti: boolean = false;
    /**
     * 多账号信息
     */
    public Accounts: Array<MultiAccountDto>;
    /**
     * 是否是游客
     */
    public IsTourists: boolean = true;
    /**
     * 父级ID
     */
    public ParentID: string = "1";
}