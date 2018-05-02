import { AuthorizationDto } from '../../../../Dto/AuthorizationDto';
export default interface IAuthorization {
    /**
    * 获取会员授权信息
    */
    GetAuthorization(): AuthorizationDto,
    /**
     * 设置授权信息
     * @param dto 
     */
    SetAuthorization(dto: AuthorizationDto): boolean
};
