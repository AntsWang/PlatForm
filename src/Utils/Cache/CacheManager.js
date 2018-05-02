var CacheManager = /** @class */ (function () {
    function CacheManager() {
    }
    /**
     * 获取当前语言
     */
    CacheManager.GetCache = function (cacheType) {
        switch (cacheType) {
            case CacheType.Authorization:
                return new Authorization();
            case CacheType.Language:
                return null;
            case CacheType.UserInfo:
                return new UserInfo();
            default:
                return null;
        }
    };
    return CacheManager;
}());
//# sourceMappingURL=CacheManager.js.map