export class ListParamsDto {
    /**
     * 上一页查询最后一条数据的ID
     * 默认为null
     */
    public LastId: number = null;
    /**
     * 每页条数
     */
    public PageSize: number = 20;
}

export class ListParamsCtrlDto extends ListParamsDto {
    /**
     * 是否正在加载
     */
    public IsLoading: boolean = false;

    /**
     * 无更多数据
     */
    public IsNoMore: boolean = false;
}

export class TransferLogDto extends ListParamsDto {
    /**
     * 会员ID
     */
    public MemberId: number;
}

export class TransferLogCtrlDto extends ListParamsCtrlDto {
    /**
     * 会员ID
     */
    public MemberId: number;
}