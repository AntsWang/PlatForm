import ILanguage from './ILanguage';
import { Storage, StorageType } from '../../../../Utils/Storage';
export default class Language implements ILanguage {
    static readonly instance = new Language();
    private language: number;
    private cacheType = StorageType.LOCALSTORAGE;

    constructor() {
        let key: string = this.GetLanguageKey();
        let storage: Storage = new Storage();
        this.language = storage.Get(key, this.cacheType);
    }


    /**
     * 获取用户缓存的key
     */
    private GetLanguageKey(): string {
        return `Language-Cache-Key`;
    }
    /**
     * 获取语言
     */
    GetLanguage(): number {
        return this.language;
    };
    /**
     * 设置语言
     * @param language 
     */
    SetLanguage(language: number): boolean {
        this.language = language;
        let storage: Storage = new Storage();
        let key: string = this.GetLanguageKey();
        storage.Set(key, language, this.cacheType,null);
        return true;
    }

}