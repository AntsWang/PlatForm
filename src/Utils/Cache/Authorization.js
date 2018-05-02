//import IAuthorization from './IAuthorization';
//import { Storage, StorageType } from '../../../../Utils/Storage';
//import { AuthorizationDto } from '../../../../Dto/AuthorizationDto';


function Authorization() {
    this.authorization = {};
    this.cacheType = StorageType.LOCALSTORAGE;
}
Authorization.prototype.GetAuthorizationKey = function (gameId = null) {

    if (gameId) {
        return `Authorization-${gameId}-CacheKey`;
    }
    return `Authorization-CacheKey`;

};
Authorization.prototype.GetAuthorization = function () {
    if (this.authorization) {
        return this.authorization;
    }

    let storage = new Storage();
    let key = this.GetAuthorizationKey();
    this.authorization = storage.Get(key, this.cacheType);
    return this.authorization;
}

Authorization.prototype.SetAuthorization = function (dto, gameId = null) {
    this.authorization.Code = dto.Code;
    this.authorization.Token = dto.Token;
    this.authorization.IsMulti = dto.IsMulti !== undefined ? dto.IsMulti : false;
    this.authorization.IsTourists = dto.IsTourists !== undefined ? dto.IsTourists :true;
    this.authorization.Accounts = dto.Accounts;
    this.authorization.ParentID = dto.ParentID;
    this.authorization.IsClose = dto.IsClose;
    let storage = new Storage();
    let key = this.GetAuthorizationKey(gameId);
    storage.Set(key, this.authorization, this.cacheType);
    return true;
}
Authorization.prototype.ClearAuthorization = function () {
    this.authorization = null;
    let key = this.GetAuthorizationKey();
    let storage = new Storage();
    storage.Set(key, null, this.cacheType);
}