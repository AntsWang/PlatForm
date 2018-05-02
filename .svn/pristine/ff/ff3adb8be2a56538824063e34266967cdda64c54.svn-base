
import BaseCtrl from './BaseCtrl';
import LanguageManager from '../Language/LanguageManager';

import { UserInfoDto } from '../Dto/UserInfoDto';
import { ErrorCode } from '../Enum/ErrorCode';
import * as ApiConfig from './Config';
import Verification from '../Utils/Verification';
import { GetQuery } from '../Utils/Url';
import { LoginByAccountDto, LoginDto, LoginResultDto, LoginMultiAccountDto, LoginSuccessDto, ResultEnum, LoginByCodeDto, LoginByIdDto, LoginParamsDto } from '../Dto/LoginInfoDto';
import { AuthorizationDto } from '../Dto/AuthorizationDto';
import CacheManager, { CacheType, UserInfo, Authorization } from '../Service/CacheManager/CacheManager';
import { DeviceId, DeviceType, GetWeChatShareDto } from '../GameConfig';
import Http from "../Utils/Http";
import { Storage } from "../Utils/Storage";

export default class UserCtrl extends BaseCtrl {
    private languageManager: LanguageManager = new LanguageManager();
    public loginService = new window.LoginService(Http, Storage, null, null, null, this.webApi);
    /**
     * 登录Dto信息
     */
    protected dto: LoginDto = new LoginDto();
    constructor() {
        super();
    }
    /**
     * 登录
     * @param code 微信授权登录，从地址栏中获取得到
     * @param handler 登录回调事件
     */
    public Login(handler: Function, multiSuccess: Function, loginError: Function): void {
        this.loginService.success = handler;
        this.loginService.multisuccess = multiSuccess;
        this.loginService.error = loginError;
        // this.loginService = new window.LoginService(Http, Storage, WeChat, handler, (data: any) => {
        //     console.log("loginErrorCallBack", data)
        // });
        this.loginService.Login(); return;
    }


    /**
     * 登出
     */
    public Logout(): boolean {
        this.loginStatus = false;
        //清除缓存中的信息
        let cacheAuthorization: Authorization = CacheManager.GetCache(CacheType.Authorization);
        cacheAuthorization.ClearAuthorization();

        let cacheMemberInfo: UserInfo = CacheManager.GetCache(CacheType.UserInfo);
        cacheMemberInfo.ClearUserInfo();
        return true;
    }

    /**
     * 设置账号
     * @param account 账号
     * @param handler 回调
     */
    public SetAccount(account: string, handler: Function): void {
        if (this.userInfo && this.userInfo.Account) {
            handler(null, [account], ErrorCode[ErrorCode.AccountExist]);
        }
        let dto: any = {
            Account: account
        }
        this.webApi.Post(ApiConfig.SetAccountApi, dto).then((data: any) => {
            handler(null, [account]);
        }, (error: string) => {
            console.log("SetRemark error", error);
            handler(null, [account], error);
        })
    }

    /**
     * 设置子会员密码
     * @param password 密码
     * @param handler 回调
     */
    public ResetPassword(password: string, handler: Function): void {
        //出分值必须大于0
        if (!Verification.Password(password)) {
            handler(null, [password], ErrorCode[ErrorCode.PasswordFormatError]);
            return;
        }
        let dto: any = {
            Password: password
        }
        this.webApi.Post(ApiConfig.ResetPasswordApi, dto).then((data: any) => {
            handler(null, [password]);
        }, (error: string) => {
            console.log("SetRemark error", error);
            handler(null, [password], error);
        })
    }

    /**
     * 设置昵称
     * @param nickname 账号
     * @param handler 回调
     */
    public ModifyNickname(nickname: string, handler: Function): void {
        if (!nickname) {
            handler(null, [nickname], ErrorCode[ErrorCode.NicknameFormatError]);
        }
        let dto: any = {
            Nickname: nickname
        }
        this.webApi.Post(ApiConfig.SetAccountApi, dto).then((data: any) => {
            handler(null, [nickname]);
        }, (error: string) => {
            console.log("SetRemark error", error);
            handler(null, [nickname], error);
        })
    }


    /**
     * 设置手机号码
     * @param phoneNumber 密码
     * @param handler 回调
     */
    public ResetPhoneNumber(phoneNumber: string, handler: Function): void {
        //验证手机号码
        if (!Verification.PhoneNumber(phoneNumber)) {
            handler(null, [phoneNumber], ErrorCode[ErrorCode.PhoneNumberFormatError]);
            return;
        }
        let dto: any = {
            PhoneNumber: phoneNumber
        }
        this.webApi.Post(ApiConfig.ResetPhoneNumberApi, dto).then((data: any) => {
            handler(null, [phoneNumber]);
        }, (error: string) => {
            console.log("SetRemark error", error);
            handler(null, [phoneNumber], error);
        })
    }

    /**
     * 游戏登录
     * @param gameId 游戏id
     */
    public GameLogin(gameId: any): boolean {
        if (window.LoginService.loginStatus) {
            //从缓存中获取Code，包括Code，Token,GameToken
            let cacheAuthorization: Authorization = CacheManager.GetCache(CacheType.Authorization);
            let authorizationDto: AuthorizationDto = cacheAuthorization.GetAuthorization();
            //cacheAuthorization.SetAuthorization(authorizationDto, gameId);
            //从缓存中用户信息
            let cacheUserInfo: UserInfo = CacheManager.GetCache(CacheType.UserInfo);
            let userInfoDto: UserInfoDto = cacheUserInfo.GetUserInfo();
            //cacheUserInfo.SetUserInfo(userInfoDto, gameId);
            return true;
        }
        return false;
    }

    public GetAppID() {
        this.webApi.Get(ApiConfig.GetAppIDApi, null).then((res: any) => {
            console.log(res);
            localStorage.setItem("AppId", res);
        }, (err: any) => {
            console.log(err)
        });
    }
}