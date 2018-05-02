import Http from '../../Utils/Http';

import { AuthorizationDto } from '../../Dto/AuthorizationDto';
import { ResponseDto } from '../../Dto/ResponseDto';
import { ErrorCode } from '../../Enum/ErrorCode';

import CacheManager, { CacheType, Authorization } from '../CacheManager/CacheManager';

export default abstract class WebApiBaseCtrl {
    //token存储
    protected header: any = {
        Authorization: ""
    };
    //http
    protected http: Http;

    constructor() {
        this.http = new Http();
        //从会员服务中获取用户信息
        //获取Socket Token
        let cacheAuthorization: Authorization = CacheManager.GetCache(CacheType.Authorization);
        let authorizationDto: AuthorizationDto = cacheAuthorization.GetAuthorization();
        if (authorizationDto && authorizationDto.Token) {
            this.header.Authorization = authorizationDto.Token;
        }
    }

    /**
     * 设置token
     */
    public SetToken(token?: string): void {
        if (token) {
            this.header.Authorization = token;
            return
        }
    }

    /**
     * 清除token
     */
    public ClearToken(): void {
        this.header.Authorization = "";
    }

    /**
     * Post方法
     * @param Url 地址
     * @param dto 参数
     */
    public Post(Url: string, dto: any): any {
        return new Promise((resolve, reject) => {
            this.http.Post(Url, dto, this.header, (respoense: ResponseDto) => {
                if (respoense.Result == ErrorCode.Success) {
                    resolve(respoense.Data);
                } else {
                    reject(ErrorCode[respoense.Result]);
                }
            }, (error: string | ErrorCode) => {
                if (ErrorCode.hasOwnProperty(error)) {
                    reject(ErrorCode[error as ErrorCode]);
                } else {
                    reject(error.toString());
                }
            })
        })
    }

    /**
     * Get方法
     * @param Url 地址
     * @param dto 参数
     */
    public Get(Url: string, dto: any): any {
        return new Promise((resolve, reject) => {
            this.http.Get(Url, dto, this.header, (respoense: ResponseDto) => {
                if (respoense.Result == ErrorCode.Success) {
                    resolve(respoense.Data);
                } else {
                    reject(ErrorCode[respoense.Result]);
                }
            }, (error: string | ErrorCode) => {
                if (ErrorCode.hasOwnProperty(error)) {
                    reject(ErrorCode[error as ErrorCode]);
                } else {
                    reject(error.toString());
                }
            })
        })
    }
}