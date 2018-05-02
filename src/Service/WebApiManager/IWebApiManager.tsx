export default interface IWebApiManager {
    /**
      * 设置token
      */
    SetToken(token?: string): void;
    /**
     * 清除token
     */
    ClearToken(): void;
    /**
    * Post方法
    * @param Url 地址
    * @param dto 参数
    */
    Post(Url: string, dto: any): any;
    /**
     * Get方法
     * @param Url 地址
     * @param dto 参数
     */
    Get(Url: string, dto: any): any;
}