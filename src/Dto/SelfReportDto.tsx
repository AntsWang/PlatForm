export class ListParamsDto {
    /**
     * 父级memberID
    */
    public MemberId?: number;
    /**
 * 游戏Id
*/
    public GameId?: number;
    /**
     * 起始时间
     */
    public StartDate: string;
    /**
     * 截止时间
     */
    public EndDate: string;
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
    public MemberId: number;
    /**
     * id
     */
    public Total: number;
    /**
     * 备注
     */
    public Nickname: string;
    /**
     * 时间
     */
    public Remark: string;
}