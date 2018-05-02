import IUserInfo from "./IUserInfo";
import { UserInfoDto } from '../../../../Dto/UserInfoDto';
import { Storage, StorageType } from '../../../../Utils/Storage';
import { AuthorizationDto } from '../../../../Dto/AuthorizationDto';

export default class UserInfo implements IUserInfo {
    static readonly instance = new UserInfo();
    private memberInfo: UserInfoDto = null;
    private cacheType = StorageType.LOCALSTORAGE;

    /**
     * 获取用户缓存的key
     */
    private GetUserInfoKey(gameId?: any): string {
        if (gameId) {
            return `UserInfo-${gameId}-CacheKey`;
        }
        return `UserInfo-CacheKey`;
    }
    /**
     * 获取会员授权信息
     */
    public GetUserInfo(): UserInfoDto {
        if (this.memberInfo) {
            return this.memberInfo;
        }

        let storage: Storage = new Storage();
        let key: string = this.GetUserInfoKey();
        this.memberInfo = <UserInfoDto>storage.Get(key, this.cacheType);
        return this.memberInfo;
    }

    /**
     * 设置授权信息
     * @param dto 
     */
    public SetUserInfo(dto: UserInfoDto, gameId?: any): boolean {
        if (!this.memberInfo) {
            this.memberInfo = new UserInfoDto();
        }
        this.memberInfo.Account = dto.Account !== undefined ? dto.Account : this.memberInfo.Account;
        this.memberInfo.HeadImageUrl = dto.HeadImageUrl !== undefined ? dto.HeadImageUrl : this.memberInfo.HeadImageUrl;
        this.memberInfo.Nickname = dto.Nickname !== undefined ? dto.Nickname : this.memberInfo.Nickname;
        this.memberInfo.Score = dto.Score !== undefined ? dto.Score : this.memberInfo.Score;
        this.memberInfo.MemberId = dto.MemberId !== undefined ? dto.MemberId : this.memberInfo.MemberId;
        let storage: Storage = new Storage();
        let key: string = this.GetUserInfoKey(gameId);
        storage.Set(key, this.memberInfo, this.cacheType);
        return true;
    }

    /**
     * 清除用户数据
     */
    public ClearUserInfo(): void {
        this.memberInfo = null;
        let key: string = this.GetUserInfoKey();
        let storage: Storage = new Storage();
        storage.Set(key, null, this.cacheType);
    }

}