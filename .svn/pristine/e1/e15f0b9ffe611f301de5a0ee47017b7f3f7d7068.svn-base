import IUserInfo from "./IUserInfo";
import { UserInfoDto } from '../../../../Dto/UserInfoDto';
import { Storage, StorageType } from '../../../../Utils/Storage';
import { AuthorizationDto } from '../../../../Dto/AuthorizationDto';



function UserInfo() {
    this.memberInfo = null;
    this.cacheType = StorageType.LOCALSTORAGE;
}
/**
* 获取用户缓存的key
*/
UserInfo.prototype.GetUserInfoKey = function (gameId = null) {
    if (gameId) {
        return `UserInfo-${gameId}-CacheKey`;
    }
    return `UserInfo-CacheKey`;
}
/**
 * 获取会员授权信息
 */
UserInfo.prototype.GetUserInfo = function () {
    if (this.memberInfo) {
        return this.memberInfo;
    }

    let storage = new Storage();
    let key = this.GetUserInfoKey();
    this.memberInfo = storage.Get(key, this.cacheType);
    return this.memberInfo;
}
/**
 * 设置授权信息
 * @param dto
 */
UserInfo.prototype.SetUserInfo(dto, gameId = null) = function () {
    if (!this.memberInfo) {
        this.memberInfo = new UserInfoDto();
    }
    this.memberInfo.Account = dto.Account !== undefined ? dto.Account : this.memberInfo.Account;
    this.memberInfo.HeadImageUrl = dto.HeadImageUrl !== undefined ? dto.HeadImageUrl : this.memberInfo.HeadImageUrl;
    this.memberInfo.Nickname = dto.Nickname !== undefined ? dto.Nickname : this.memberInfo.Nickname;
    this.memberInfo.Score = dto.Score !== undefined ? dto.Score : this.memberInfo.Score;
    this.memberInfo.MemberId = dto.MemberId !== undefined ? dto.MemberId : this.memberInfo.MemberId;
    let storage = new Storage();
    let key = this.GetUserInfoKey(gameId);
    storage.Set(key, this.memberInfo, this.cacheType);
    return true;
}
/**
 * 清除用户数据
 */
UserInfo.prototype.ClearUserInfo() = function () {
    this.memberInfo = null;
    let key = this.GetUserInfoKey();
    let storage = new Storage();
    storage.Set(key, null, this.cacheType);
}