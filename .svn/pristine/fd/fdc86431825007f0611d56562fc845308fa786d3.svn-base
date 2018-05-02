
import Http from '../../Utils/Http';
import WebApiBaseCtrl from './WebApiBaseCtrl';

import IWebApiManager from './IWebApiManager';

/**
 * WebApi层
 * 单例 使用WebApi.instance
 */
export default class WebApiManager extends WebApiBaseCtrl implements IWebApiManager {
    //单例
    private static instance: WebApiManager;
    private constructor() {
        super();
    }

    /**
     * 获取单例
     */
    public static GetInstance(): WebApiManager {
        if (!WebApiManager.instance) {
            WebApiManager.instance = new WebApiManager();
        }
        return this.instance;
    }

}