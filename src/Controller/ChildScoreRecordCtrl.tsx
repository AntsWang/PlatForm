import { GetTransferLogApi } from './Config';

import { ListParamsDto, ListParamsCtrlDto, ScoreRecordDto } from '../Dto/ChildScoreRecordDto';

import BaseCtrl from './BaseCtrl';
export default class ScoreRecordCtrl extends BaseCtrl {
    /**
     * 获取所有子级会员分数参数
     */
    private ChildScoreListParams: ListParamsCtrlDto = new ListParamsCtrlDto();
    constructor() {
        super();
    }

    /**
    * 获取所有子级会员分数
    * @param isRefresh 是否刷新
    * @param handler 回调
    */
    public GetScoreRecord(memberId: number, isRefresh: boolean, handler: Function): void {
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
        dto.MemberId = memberId;

        this.webApi.Post(GetTransferLogApi, dto).then((data: Array<ScoreRecordDto>) => {
            if (data) {
                let length = data.length;
                if (data.length < this.ChildScoreListParams.PageSize) {
                    this.ChildScoreListParams.IsNoMore = true;
                } else {
                    this.ChildScoreListParams.LastId = data[length - 1].Id;
                }
                this.ChildScoreListParams.IsLoading = false;
                handler(data, [isRefresh, this.ChildScoreListParams.IsNoMore]);
            }
        }, (error: string) => {
            this.ChildScoreListParams.IsLoading = false;
            handler(null, [isRefresh,this.ChildScoreListParams.IsNoMore], error);
        })
    }

}