import * as React from 'react';
import {
    Link
} from "react-router-dom";
import { ReportGameResutlRoute, GetDetailRoute } from '../../../Route/Config';
import ReportCtrl from '../../../Controller/ReportCtrl';

import TimePicker from '../../../Components/TimePicker';
import { Time } from '../../../Utils/Time';

import CompToast, { ToastType } from '../../../Components/Toast';
import LanguageManager from '../../../Language/LanguageManager';
import { ErrorCode } from '../../../Enum/ErrorCode';
import Money from '../../../Utils/Money';

import { JString } from "../../../Utils/TransferJson";

const styles = require("./style.div.css");
const rightImg = require("../../../Image/right.png");

export default class Report extends React.Component<any, any> {
    private ReportCtrl: ReportCtrl = new ReportCtrl();
    private toast: any;
    private languageManager: LanguageManager = new LanguageManager();
    private timePicker1: any;
    private timePicker2: any;
    private type: boolean;    //true=完整报表  false=报表
    constructor(props: any) {
        super(props);
        let dateNow: any = new Date();
        let startDate: string = Time.GetNextMonth(dateNow, 7);
        let endDate: string = Time.GetNextMonth(dateNow, 0);
        this.state = {
            startDate: startDate,
            endDate: endDate,
            curReportList: [],  //当前显示的会员报表
            allReportList: [],   //请求过的所有的报表，包括每个层级的
            memberId: null,          //选择的子会员的ID
            curTotal: null,    //汇总
            curTotalName: this.languageManager.GetErrorMsg("Me"),  //汇总行对应昵称
            curRemark: null,          //汇总行备注
            myTotal: null,
            nameList: [this.languageManager.GetErrorMsg("Me")],         //汇总行昵称数组
            ownBet: 0,
            ownPay: 0,
        }
        this.ShowStartPicker = this.ShowStartPicker.bind(this);
    }

    componentDidMount() {
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        let { startDate, endDate } = this.state;
        this.ReportCtrl.GetReport(startDate, endDate, true, this.Handler, "search");
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
    public Handler = (data: any, isRefresh: any[], error?: string): void => {
        this.toast.Hide();
        if (error) {
            //提示错误信息
            this.ShowToast(error, ToastType.Error);
            return;
        }
        if (isRefresh[0]) {
            this.calculateTotal(data); //计算总total
            this.setState({ curReportList: data }, () => {
                let arr = this.state.allReportList, len = arr.length - 1;
                //点击列表项 push
                if (isRefresh[1] == "click") {
                    arr.push(data);
                    this.setState({
                        allReportList: arr
                    })

                } else {   //点击查询按钮  进行替换

                    arr.splice(len, 1, data);
                    this.setState({
                        allReportList: arr
                    })
                }


            });
        }

    }
    /**
     * 计算汇总金额
     * @param data api json数据
     */
    private calculateTotal = (data: any): void => {
        let total = 0, { OwnTotalBet, OwnTotalPay, ChildReportList } = data, totalBet = OwnTotalBet, totalPay = OwnTotalPay;
        this.setState({
            ownBet: OwnTotalBet,
            ownPay: OwnTotalPay,
            myTotal: Number((totalPay - totalBet).toFixed(2))
        })
        for (let i = 0, len = ChildReportList.length; i < len; i++) {
            totalBet += ChildReportList[i].TotalBet;
            totalPay += ChildReportList[i].TotalPay;

        }
        total = Number((totalPay - totalBet).toFixed(2));
        this.setState({
            curTotal: total,
        })

    }
    /**
     * 进入下一层
     * @param memberId 父级会员Id
     * @param startDate 开始时间
     * @param endDate 终止时间
     */
    private goToChild = (item: any) => {
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        let { startDate, endDate } = this.state;
        let arr = this.state.nameList;
        arr.push(item.Nickname);
        this.setState({
            memberId: item.MemberId,
            curTotalName: item.Nickname,
            nameList: arr,
            curTotal: item.Total,
            curRemark: item.Remark,
        })
        this.ReportCtrl.GetReport(startDate, endDate, true, this.Handler, "click", item.MemberId);
    }
    /**
     * 返回上一级
     */
    private back = () => {
        let arr = this.state.allReportList, arrName = this.state.nameList;
        arr.pop();
        arrName.pop();
        if (arr.length <= 1) {
            this.setState({
                memberId: null
            })
        }
        this.setState({
            allReportList: arr,
            nameList: arrName,
            curReportList: arr[arr.length - 1],
            curTotalName: arrName[arrName.length - 1],
        })
        this.calculateTotal(arr[arr.length - 1]);
    }
    /**
     * 查询报表
     */
    private searchReport = () => {
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        //获取起始时间
        let { startDate, endDate } = this.state;
        if (startDate == "") {
            alert("请选择正确的时间");
            return;
        }
        //查询自己的报表
        if (!this.state.memberId) {
            this.ReportCtrl.GetReport(startDate, endDate, true, this.Handler, "search");
        } else { //查询子级报表
            this.ReportCtrl.GetReport(startDate, endDate, true, this.Handler, "search", this.state.memberId);
        }

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
     * 渲染报表列表
     * @param rowItem 当前条目
     * @param index 当前条目序号
     */
    private renderReportItem = (rowItem: any, index: number): any => {
        let total = rowItem.TotalPay - rowItem.TotalBet;
        return (
            <div key={index} className={styles.item} onClick={() => { this.goToChild(rowItem) }}>
                <div className={styles.name}>{rowItem.Remark ? rowItem.Remark : rowItem.Nickname}</div>
                <div className={styles.score}>
                    <div className={total == 0 ? styles.rozero : total > 0 ? styles.rwin : styles.rlose}>
                        {Money.Format(total)}
                    </div>
                    <div>
                        <img src={rightImg} />
                    </div>
                </div>
            </div>
        )
    }
    /**
     * 日期搜索
     */
    renderSearch = () => {
        return (<div className={styles.headdate}>
            <div className={styles.timeContainer}>
                <div className={styles.time} onClick={this.ShowStartPicker}>{this.state.startDate}</div>
                <div className={styles.time} onClick={this.ShowEndPicker}>{this.state.endDate}</div>
            </div>
            <div className={styles.search} onClick={() => { this.searchReport() }}>{this.languageManager.GetErrorMsg("Inquire")}</div>
        </div>)
    }
    /**
     * 当前父级行
     */
    renderHeader = (allReportList: any, routerParam: any, curTotalName: any, myTotal: any, curRemark: any) => {
        let { ownBet, ownPay } = this.state;
        return (allReportList.length > 0 ? (
            <Link to={{
                pathname: `${GetDetailRoute("/report/gameResult/", routerParam)}`,
            }} className={styles.head}>
                <div className={styles.type}>{allReportList.length > 1 ? curRemark ? curRemark : curTotalName : this.languageManager.GetErrorMsg("Me")}</div>
                {
                    allReportList.length > 1 ? (<div onClick={(e) => { e.stopPropagation(); e.preventDefault(); this.back() }} className={styles.back}>Back</div>) : null
                }
                <div className={styles.score}>
                    <div className={myTotal == 0 ? styles.zero : myTotal > 0 ? styles.totalWin : styles.total}>
                        {myTotal != null ? Money.Format(myTotal) : "---"}
                    </div>
                    <div>
                        <img src={rightImg} />
                    </div>
                </div>
            </Link>
        ) : null)
    }
    render() {
        let { memberId, curReportList, allReportList, curTotal, curTotalName, curRemark, myTotal, startDate, endDate } = this.state;
        let { ChildReportList, Total } = curReportList;
        let routerParam = JString.EncodeJson({
            memberId: memberId,
            nickName: curTotalName,
            remark: curRemark,
            startDate,
            endDate
        })
        return (
            <div>
                <CompToast ref={(c) => this.toast = c} />
                {
                    this.renderSearch()
                }
                {
                    this.renderHeader(allReportList, routerParam, curTotalName, myTotal, curRemark)
                }

                <div>
                    {
                        ChildReportList && ChildReportList.length > 0 ? (<div>
                            {ChildReportList.map((item: any, index: number) => {
                                return this.renderReportItem(item, index);
                            })}
                            <div className={styles.allTotal}>
                                <div className={styles.totalName}>{this.languageManager.GetErrorMsg("Total")}</div>
                                <div className={curTotal == 0 ? styles.allZero : curTotal > 0 ? styles.allWin : styles.allLose}>
                                    {Money.Format(curTotal)}
                                </div>
                            </div>

                        </div>) : (<div>
                            <div className={styles.allTotal}>
                                <div className={styles.totalName}>{this.languageManager.GetErrorMsg("Total")}</div>
                                <div className={curTotal == 0 ? styles.allZero : curTotal > 0 ? styles.allWin : styles.allLose}>
                                    {Money.Format(curTotal)}
                                </div>
                            </div>
                            <div className={styles.noChildren}></div>

                        </div>)

                    }
                </div>
                <TimePicker ref={(e: any) => { this.timePicker1 = e }} time={this.state.startDate} timeHanler={this.StartTimeHanler} />
                <TimePicker ref={(e: any) => { this.timePicker2 = e }} time={this.state.endDate} timeHanler={this.EndTimeHanler} />
            </div>
        );
    }
}