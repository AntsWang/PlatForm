import * as React from 'react';

import { Button, Toast } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import CompToast, { ToastType } from '../../../../Components/Toast';
import LanguageManager from '../../../../Language/LanguageManager';
import { ErrorCode } from '../../../../Enum/ErrorCode';
import Money from "../../../../Utils/Money";

import TimePicker from '../../../../Components/TimePicker';
import { Time } from '../../../../Utils/Time';

import ReportCtrl from '../../../../Controller/ReportCtrl';


import { ReportGameRecordRoute, GetDetailRoute } from '../../../../Route/Config';
import { Link } from 'react-router-dom';

import PullLoad, { STATS } from "../../../../Components/PullList/index";

import { JString } from "../../../../Utils/TransferJson";
const pullStyle = require("../../../../Components/PullList/ReactPullLoad.css");

const styles = require("./style.css");
const rightImg = require("../../../../Image/right.png");

class GameRecord extends React.Component<any, any> {
    private ReportCtrl: ReportCtrl = new ReportCtrl();
    private toast: any;
    private timePicker1: any;
    private timePicker2: any;
    private languageManager: LanguageManager = new LanguageManager();
    private param: any;
    constructor(props: any) {
        super(props);
        this.param = JString.DecodeJson(this.props.match.params.memberId);//this.props.match.params.memberId.split("_");
        // date = param.split("_")[3];
        let dateNow: any = new Date();
        let startDate: string = this.param.startDate ? this.param.startDate : Time.GetNextMonth(dateNow, 7);
        let endDate: string = this.param.endDate ? this.param.endDate : Time.GetNextMonth(dateNow, 0);
        let { nickName, remark, memberId } = this.param;
        this.state = {
            startDate: startDate,
            endDate: endDate,
            memberList: [],
            action: STATS.init,
            isNoMore: false,
            init: true,
            memberId: memberId,
            nickName: nickName,          //昵称
            remark: remark,            //备注
            gameResultTotal: null,
        }
    }
    componentDidMount() {
        let { startDate, endDate, memberId } = this.state;
        this.ReportCtrl.GetGameReport(startDate, endDate, true, this.Handler, memberId);
    }
    /**
     * 计算汇总金额
     * @param data api json数据
    */
    private calculateTotal = (data: any): void => {
        let gameResultTotal = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            gameResultTotal = gameResultTotal + data[i].TotalPay - data[i].TotalBet;

        }
        this.setState({
            gameResultTotal: gameResultTotal,
        })

    }
    /**
    * 显示日历
    * @param event 事件对象
    */
    private ShowStartPicker = (event: any): void => {
        this.timePicker1.Show(this.state.startDate);
    }
    /**
     * 时间选择回调处理
     * @param value 时间
     */
    public StartTimeHanler = (value: string): void => {
        this.setState({ startDate: value });
    }
    /**
      * 显示日历
      * @param event 事件对象
      */
    private ShowEndPicker = (event: any): void => {
        this.timePicker2.Show(this.state.startDate);
    }
    /**
     * 时间选择回调处理
     * @param value 时间
     */
    public EndTimeHanler = (value: string): void => {
        this.setState({ endDate: value });
    }

    /**
     * 查询报表
    */
    private searchGameList = () => {
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        //获取起始时间
        let { startDate, endDate } = this.state;
        if (startDate == "") {
            alert("请选择正确的时间");
            return;
        }
        this.ReportCtrl.GetGameReport(startDate, endDate, true, this.Handler, this.state.memberId);

    }
    /**
    * 提示信息
    * @param errorKey 提示信息
    * @param  type 信息类型
   */
    private ShowToast = (errorKey: string, type: ToastType = ToastType.Success): void => {
        if (!this.languageManager) {
            this.languageManager = new LanguageManager();
        }
        let msg: string = this.languageManager.GetErrorMsg(errorKey);
        this.toast.Show(msg, type);
    }
    /**
     * 数据请求回调
     *@param data 请求的数据 
     *@param isRefresh 是否是刷新
     *@param error 错误信息
     */
    private Handler = (data: any, isRefresh: boolean, error?: string): void => {
        this.toast.Hide();
        if (error) {
            //提示错误信息
            this.ShowToast(error, ToastType.Error);
            return;
        }
        this.setState({
            init: false
        })
        //初始化设置action为reset
        this.calculateTotal(data);
        //刷新
        if (isRefresh) {
            this.setState({
                memberList: data
            });
        }

    }
    /**
     * 渲染游戏记录
     */
    renderReportItem = (rowItem: any, index: number): any => {
        let total = rowItem.TotalPay - rowItem.TotalBet;
        let { nickName, remark, startDate, endDate, memberId } = this.state;
        let routerParam = JString.EncodeJson({
            startDate,
            endDate,
            gameId: rowItem.GameID,
            memberId
        });
        return (
            // `${rowItem.GameID}_${nickName}_${remark}_${startDate.replace(/\//g, "*")}_${endDate.replace(/\//g, "*")}`
            <Link to={{
                pathname: `${GetDetailRoute("/report/gameRecord/", routerParam)}`
            }} key={index} className={""}>
                <div className={styles.item}>
                    <div className={styles.name}>{rowItem.GameName}</div>
                    <div className={total == 0 ? "zero" : total > 0 ? "win" : "lose"}>
                        {Money.Format(total)}
                    </div>
                    <div className={styles.right}>
                        <img src={rightImg} />
                    </div>
                </div>
            </Link>
        )
    }
    /**
     * 渲染数据
     */
    public renderData = () => {
        let { gameResultTotal, init } = this.state;
        let { memberList, isNoMore, action } = this.state;
        if (!memberList || memberList.length == 0) {
            return (
                <div className="noData">
                    {!init && this.languageManager.GetErrorMsg("NoData")}
                </div>

            )
        } else {
            return (
                <div className={styles.listContent}>
                    {
                        memberList.map((item: any, index: number) => {
                            return this.renderReportItem(item, index);
                        })
                    }
                    <div className={styles.allTotal}>
                        <div className={styles.totalName}>{this.languageManager.GetErrorMsg("Total")}</div>
                        <div className={gameResultTotal > 0 ? styles.zheng : styles.fu}>
                            {Money.Format(gameResultTotal)}
                        </div>
                    </div>

                </div>
            )
        }
    }

    render() {
        let { nickName, remark } = this.state;
        nickName = nickName == "我" ? null : `——${nickName}`
        return (
            <div className={styles.container}>
                <CompToast ref={(c: any) => this.toast = c} />
                <div className={styles.listTitle}>
                    <div className={styles.title}>{this.languageManager.GetErrorMsg("GameResult")}{nickName}{remark}</div>
                    <div className={styles.head}>
                        <div className={styles.timeContainer}>
                            <div className={styles.time} onClick={this.ShowStartPicker}>{this.state.startDate}</div>
                            <div className={styles.time} onClick={this.ShowEndPicker}>{this.state.endDate}</div>
                        </div>
                        <div className={styles.search} onClick={() => { this.searchGameList() }}>{this.languageManager.GetErrorMsg("Inquire")}</div>
                        <TimePicker ref={(e: any) => { this.timePicker1 = e }} time={this.state.startDate} timeHanler={this.StartTimeHanler} />
                        <TimePicker ref={(e: any) => { this.timePicker2 = e }} time={this.state.endDate} timeHanler={this.EndTimeHanler} />
                    </div>
                    <div className={styles.headname}>
                        <div className={styles.name}>{this.languageManager.GetErrorMsg("GameName")}</div>
                        <div className={styles.titlewin}>{this.languageManager.GetErrorMsg("WinOrlose")}</div>
                    </div>
                    {this.renderData()}
                </div>
            </div>
        );
    }
}
export default GameRecord;