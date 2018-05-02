import ICacheManager from './ICacheManager';
import Authorization from './Cache/Authorization/Authorization';
import Language from './Cache/Language/Language';
import UserInfo from './Cache/UserInfo/UserInfo';
import { CacheType } from './CacheType';
export { CacheType, Language, UserInfo, Authorization };
export default class CacheManager implements ICacheManager {
    constructor() {

    }

    /**
     * 获取当前语言
     */
    public static GetCache(cacheType: CacheType): any {
        switch (cacheType) {
            case CacheType.Authorization:
                return Authorization.instance;
            case CacheType.Language:
                return Language.instance;
            case CacheType.UserInfo:
                return UserInfo.instance;
            default:
                return null;
        }
    }

}