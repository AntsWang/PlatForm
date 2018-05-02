import { GetReportApi, GetGameReportApi } from './Config';

import { ListParamsDto, ListParamsCtrlDto, ScoreRecordDto } from '../Dto/SelfReportDto';


import BaseCtrl from './BaseCtrl';
export default class ScoreRecordCtrl extends BaseCtrl {
    /**
     * 获取自己的报表参数
     */
    private ChildScoreListParams: ListParamsCtrlDto = new ListParamsCtrlDto();
    constructor() {
        super();
    }

    /**
    * 获取报表
    * @param startDate 开始日期      
    * @param endDate  结束日期
    * @param isRefresh 是否刷新
    * @param handler 回调
    * @param type 触发类型
    * @param memberId 会员Id 有的话查找子会员的报表
    */
    public GetReport(startDate: string, endDate: string, isRefresh: boolean, handler: Function, type: string, memberId?: number, ): void {
        if (this.ChildScoreListParams.IsLoading) {
            return;
        }
        this.ChildScoreListParams.IsLoading = true;
        //转换为API参数要求的格式
        startDate = startDate.replace(/\//g, "-");
        endDate = endDate.replace(/\//g, "-");
        let dto: ListParamsDto = new ListParamsDto();
        if (memberId) {
            dto.MemberId = memberId;
        }
        dto.StartDate = startDate;
        dto.EndDate = endDate;

        this.webApi.Post(GetReportApi, dto).then((data: any) => {
            if (data) {
                this.ChildScoreListParams.IsLoading = false;
                handler(data, [isRefresh, type]);
            }
        }, (error: string) => {
            this.ChildScoreListParams.IsLoading = false;
            handler(null, [isRefresh, type], error);
        })
    }

    /**
    * 获取游戏记录
    * @param startDate 开始日期      
    * @param endDate  结束日期
    * @param isRefresh 是否刷新
    * @param handler 回调
    */
    public GetGameReport(startDate: string, endDate: string, isRefresh: boolean, handler: Function, memberId?: number): void {
        if (this.ChildScoreListParams.IsLoading) {
            return;
        }
        this.ChildScoreListParams.IsLoading = true;
        //转换为API参数要求的格式
        startDate = startDate.replace(/\//g, "-");
        endDate = endDate.replace(/\//g, "-");
        let dto: ListParamsDto = new ListParamsDto();
        dto.MemberId = memberId;
        dto.StartDate = startDate;
        dto.EndDate = endDate;

        this.webApi.Post(GetGameReportApi, dto).then((data: any) => {
            if (data) {
                this.ChildScoreListParams.IsLoading = false;
                handler(data, [isRefresh]);
            }
        }, (error: string) => {
            this.ChildScoreListParams.IsLoading = false;
            handler(null, [isRefresh], error);
        })
    }

}