export class ListParamsDto {
    public MemberId: number;
    /**
     * 上一页查询最后一条数据的ID
     * 默认为null
     */
    public LogId: number = null;
    /**
     * 每页条数
     */
    public PageSize: number = 20;
    /**
     * 交易类型
     */
    public TransactionType: number;

    public Desc: boolean;
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

export class ScoreRecordDto {
    public MemberId: number;
    /**
     * 变化数目
     */
    public Changed: number;
    /**
     * id
     */
    public ID: number;
    /**
     * 备注
     */
    public Remark: string;
    /**
     * 时间
     */
    public UpdateTime: string;
}