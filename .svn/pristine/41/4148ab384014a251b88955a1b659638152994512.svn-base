import CacheManager, { CacheType, Language } from '../Service/CacheManager/CacheManager';
import { LangMsg, LanguageType } from './Config';
import ILanguageManager from './ILanguageManager';

export default class LanguageManager implements ILanguageManager {
    private langMsg: any = {}
    constructor() {
        let language: LanguageType = this.GetLanguage();
        this.ChangeLanguage(language);
    }

    /**
     * 改变语言对应解析
     * @param language 语言
     */
    private ChangeLanguage(language: LanguageType): void {
        switch (language) {
            case LanguageType.CH:
                this.langMsg = LangMsg.CH; break;
            case LanguageType.EN:
                this.langMsg = LangMsg.EN; break;
            default:
                this.langMsg = LangMsg.CH; break;
        }
    }

    /**
     * 获取当前语言
     */
    public GetLanguage(): LanguageType {
        let cacheLanguage: Language = CacheManager.GetCache(CacheType.Language);
        return cacheLanguage.GetLanguage();
    }


    /**
     * 设置语言
     * @param language 语言类型
     */
    public SetLanguage(language: LanguageType): boolean {
        this.ChangeLanguage(language);
        let cacheLanguage: Language = CacheManager.GetCache(CacheType.Language);
        return cacheLanguage.SetLanguage(language);
    }

    /**
     * 解析错误码
     * @param key 错误码
     */
    public GetErrorMsg(key: string): string {
        let msg: string = this.langMsg[key];
        if (!msg) {
            return key;
        }
        return msg;
    }
}