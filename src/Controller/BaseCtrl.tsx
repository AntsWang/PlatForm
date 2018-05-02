
import { AuthorizationDto } from '../Dto/AuthorizationDto';
import { UserInfoDto } from '../Dto/UserInfoDto';
import { LoginDto } from '../Dto/LoginInfoDto';
import CacheManager, { CacheType, Language, UserInfo, Authorization } from '../Service/CacheManager/CacheManager';
import WebApiManager from "../Service/WebApiManager/WebApiManager";

/**
* 基础类
*/
export default abstract class BaseCtrl {
    /**
     * WebApi员服务
     */
    protected webApi: WebApiManager;

    /**
     * 授权信息
     */
    protected authorizationInfo: AuthorizationDto;
    /**
     * 用户信息
     */
    protected userInfo: UserInfoDto;
    /**
     * 是否登录
     */
    protected loginStatus: boolean = false;
    /**
     * 是否关闭
     */
    protected closeStatus: boolean = false;

    constructor() {
        //绑定webApi服务
        this.webApi = WebApiManager.GetInstance();
        //从会员服务中获取用户信息
        let cacheAuthorization: Authorization = CacheManager.GetCache(CacheType.Authorization);
        //获取Socket Token
        this.authorizationInfo = cacheAuthorization.GetAuthorization();
        if (this.authorizationInfo && this.authorizationInfo.Token) {
            this.loginStatus = true;
            this.closeStatus = this.authorizationInfo.IsClose;
        }
        //获取会员信息
        //从会员服务中获取用户信息
        let cacheUserInfo: UserInfo = CacheManager.GetCache(CacheType.UserInfo);
        this.userInfo = cacheUserInfo.GetUserInfo();
    }
}