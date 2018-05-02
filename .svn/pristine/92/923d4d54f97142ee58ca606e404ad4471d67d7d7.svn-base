//import IAuthorization from './IAuthorization';
//import { Storage, StorageType } from '../../../../Utils/Storage';
//import { AuthorizationDto } from '../../../../Dto/AuthorizationDto';


function Authorization() {
    this.authorization = null;
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
    this.authorization.Code = dto.Code ? dto.Code : this.authorization.Code;
    this.authorization.Token = dto.Token !== undefined ? dto.Token : this.authorization.Token;
    this.authorization.IsMulti = dto.IsMulti !== undefined ? dto.IsMulti : this.authorization.IsMulti;
    this.authorization.IsTourists = dto.IsTourists !== undefined ? dto.IsTourists : this.authorization.IsTourists;
    this.authorization.Accounts = dto.Accounts !== undefined ? dto.Accounts : this.authorization.Accounts;
    this.authorization.ParentID = dto.ParentID !== undefined ? dto.ParentID : this.authorization.ParentID;
    this.authorization.IsClose = dto.IsClose !== undefined ? dto.IsClose : this.authorization.IsClose;
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