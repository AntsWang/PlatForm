export class ListParamsDto {
    /**
     * 上一页查询最后一条数据的ID
     * 默认为null
     */
    public GameId: number = null;
    /**
     * 每页条数
     */
    public PageSize: number = 20;
    /**
     * 最后一条编号
     */
    public LastId: number;
    /**
     * 开始日期
    */
    public StartDate: string;
    /**
     * 结束日期
    */
    public EndDate: string;
    /**
     * 会员Id
    */
    public MemberId: any;

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
    /**
     * 变化数目
     */
    public BetTime: string;
    /**
     * id
     */
    public GameName: string;
    /**
     * 备注
     */
    public BetAmount: number;
    /**
     * 时间
     */
    public PayAmount: number;

    public Total: number;

    public GameData: string;
    public Id: number;
}