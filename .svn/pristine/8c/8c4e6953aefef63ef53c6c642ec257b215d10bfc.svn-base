import { SetSetAgentApi,GetChildScoreListApi, GetMemberInfoApi, UpdateCloseStatusApi, SetRemarkApi, TransferInApi, TransferOutApi, SetChildPasswordApi, GetTransferLogApi } from './Config';

import { ListParamsDto, ListParamsCtrlDto, TransferLogDto, TransferLogCtrlDto } from '../Dto/ChildListParamsDto';
import MemberInfoDto from '../Dto/MemberInfoDto';
import ChildScoreDto from '../Dto/ChildListDto';
import { ErrorCode } from '../Enum/ErrorCode';
import Verification from '../Utils/Verification';

import BaseCtrl from './BaseCtrl';

export default class MemberCtrl extends BaseCtrl {
    /**
     * 获取所有子级会员分数参数
     */
    private ChildScoreListParams: ListParamsCtrlDto = new ListParamsCtrlDto();
    /**
     * 转账记录参数
     */
    private TransferLogParams: TransferLogCtrlDto = new TransferLogCtrlDto();
    constructor() {
        super();
    }

    /**
     * 获取所有子级会员分数
     * @param isRefresh 是否刷新
     * @param handler 回调
     */
    public GetChildScoreList(isRefresh: boolean, handler: Function): void {
        if (this.ChildScoreListParams.IsLoading) {
            return;
        }
        this.ChildScoreListParams.IsLoading = true;
        if (isRefresh) {
            this.ChildScoreListParams.LastId = null;
            this.ChildScoreListParams.IsNoMore = false;
        }

        let dto: ListParamsDto = new ListParamsDto();
        dto.LastId = this.ChildScoreListParams.LastId;
        dto.PageSize = this.ChildScoreListParams.PageSize;

        this.webApi.Post(GetChildScoreListApi, dto).then((data: Array<ChildScoreDto>) => {
            if (data) {
                let length = data.length;
                if (data.length < this.ChildScoreListParams.PageSize) {
                    this.ChildScoreListParams.IsNoMore = true;
                } else {
                    this.ChildScoreListParams.LastId = data[length - 1].MemberId;
                }
                this.ChildScoreListParams.IsLoading = false;
                handler(data, [isRefresh, this.ChildScoreListParams.IsNoMore]);
            }
        }, (error: string) => {
            this.ChildScoreListParams.IsLoading = false;
            handler(null, [isRefresh, this.ChildScoreListParams.IsNoMore], error);
        })
    }

    /**
     * 查询转账记录
     * @param memberId 会员ID
     * @param isRefresh 是否刷新
     * @param handler 回调
     */
    public GetTransferLog(memberId: number, isRefresh: boolean, handler: Function): void {
        if (this.TransferLogParams.IsLoading) {
            return;
        }
        this.TransferLogParams.IsLoading = true;
        if (isRefresh) {
            this.TransferLogParams.LastId = null;
            this.TransferLogParams.IsNoMore = false;
        }

        let dto: TransferLogDto = new TransferLogDto();
        dto.LastId = this.TransferLogParams.LastId;
        dto.PageSize = this.TransferLogParams.PageSize;
        dto.MemberId = memberId;

        this.webApi.Post(GetTransferLogApi, dto).then((data: Array<ChildScoreDto>) => {
            if (data) {
                let length = data.length;
                if (data.length < this.ChildScoreListParams.PageSize) {
                    this.TransferLogParams.IsNoMore = true;
                } else {
                    this.TransferLogParams.LastId = data[length - 1].MemberId;
                }
                this.TransferLogParams.IsLoading = false;
                handler(data, [memberId, isRefresh]);
            }
        }, (error: string) => {
            this.TransferLogParams.IsLoading = false;
            handler(null, [memberId, isRefresh], error);
        })
    }

    /**
     * 获取子会员信息
     * @param memberId 会员ID
     * @param handler 回调
     */
    public GetMemberInfo(memberId: number, handler: Function): void {
        let dto: any = {
            MemberId: memberId
        }
        this.webApi.Post(GetMemberInfoApi, dto).then((data: MemberInfoDto) => {
            if (data) {
                handler(data, [memberId]);
            }
        }, (error: string) => {
            handler(null, [memberId], error);
        })
    }

    /**
     * 设置备注
     * @param memberId 会员id
     * @param remark 备注
     * @param handler 回调
     */
    public SetRemark(memberId: number, remark: string, handler: Function): void {
        let dto: any = {
            MemberId: memberId,
            Remark: remark
        }
        this.webApi.Post(SetRemarkApi, dto).then((data: any) => {
            handler(null, [memberId, remark]);
        }, (error: string) => {
            handler(null, [memberId, remark], error);
        })
    }

    /**
     * 设置子会员状态
     * @param memberId 会员id
     * @param close 关闭状态
     * @param handler 回调
     */
    public UpdateCloseStatus(memberId: number, close: boolean, handler: Function): void {
        let dto: any = {
            MemberId: memberId,
            Close: close
        }
        this.webApi.Post(UpdateCloseStatusApi, dto).then((data: any) => {
            handler(null, [memberId, close]);
        }, (error: string) => {
            handler(null, [memberId, close], error);
        })
    }

        /**
     * 设置代理
     * @param memberId 会员id
     * @param handler 回调
     */
    public SetAgent(memberId: number, handler: Function): void {
        let dto: any = {
            MemberId: memberId,
        }
        this.webApi.Post(SetSetAgentApi, dto).then((data: any) => {
            handler(null, [memberId,true]);
        }, (error: string) => {
            handler(null, [memberId,false], error);
        })
    }

    /**
     * 进分
     * @param memberId 会员id
     * @param amount 分数
     * @param handler 回调
     */
    public TransferIn(memberId: number, amount: number, handler: Function): void {
        //进分值必须大于0
        if (typeof amount !== "number" || amount <= 0) {
            handler(null, [memberId, amount], ErrorCode[ErrorCode.AmountError]);
            return
        }
        let dto: any = {
            MemberId: memberId,
            Amount: amount
        }
        this.webApi.Post(TransferInApi, dto).then((data: any) => {
            handler(data, [memberId, amount]);
        }, (error: string) => {
            handler(null, [memberId, amount], error);
        })
    }

    /**
     * 出分
     * @param memberId 会员id
     * @param amount 分数
     * @param handler 回调
     */
    public TransferOut(memberId: number, amount: number, handler: Function): void {
        //出分值必须大于0
        if (typeof amount !== "number" || amount <= 0) {
            handler(null, [memberId, amount],ErrorCode[ErrorCode.AmountError]);
            return;
        }
        let dto: any = {
            MemberId: memberId,
            Amount: amount
        }
        this.webApi.Post(TransferOutApi, dto).then((data: any) => {
            handler(data, [memberId, amount]);
        }, (error: string) => {
            handler(null, [memberId, amount], error);
        })
    }

    /**
     * 设置子会员密码
     * @param memberId 会员id
     * @param password 密码
     * @param handler 回调
     */
    public SetChildPassword(memberId: number, password: string, handler: Function): void {
        //出分值必须大于0
        if (!Verification.Password(password)) {
            handler(null, [memberId, password], ErrorCode[ErrorCode.PasswordFormatError]);
            return;
        }
        let dto: any = {
            MemberId: memberId,
            Password: password
        }
        this.webApi.Post(SetChildPasswordApi, dto).then((data: any) => {
            handler(null, [memberId, password]);
        }, (error: string) => {
            handler(null, [memberId, password], error);
        })
    }
}