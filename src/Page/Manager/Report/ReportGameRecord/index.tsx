import * as React from 'react';

import { Button, Toast } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import CompToast, { ToastType } from '../../../../Components/Toast';
import LanguageManager from '../../../../Language/LanguageManager';
import { ErrorCode } from '../../../../Enum/ErrorCode';
import Money from '../../../../Utils/Money';

import GameRecordCtrl from '../../../../Controller/GameRecordCtrl';

import { GetDetailRoute } from '../../../../Route/Config';
import { Link } from 'react-router-dom';

import PullLoad, { STATS } from "../../../../Components/PullList/index";
import { JString } from '../../../../Utils/TransferJson';
const pullStyle = require("../../../../Components/PullList/ReactPullLoad.css");

const styles = require("./style.css");
const rightImg = require("../../../../Image/right.png");

class ReportGameRecord extends React.Component<any, any> {
    private ReportCtrl: GameRecordCtrl = new GameRecordCtrl();
    private toast: any;
    private memberId: any;
    private languageManager: LanguageManager = new LanguageManager();
    private startDate: string;
    private endDate: string;
    private gameId: any;
    constructor(props: any) {
        super(props);
        this.state = {
            memberList: [],
            action: STATS.init,
            isNoMore: false,
            init: true,
            showLoading: false,
            gameId: null,
            memberId: 0,
        }
        let param = JString.DecodeJson(this.props.match.params.gameId);
        this.memberId = param.memberId == "null" ? 0 : param.memberId;
        this.startDate = param.startDate;
        this.endDate = param.endDate;
        this.gameId = param.gameId;
    }
    componentDidMount() {
        this.setState({
            showLoading: true,
        })
        this.ReportCtrl.GetScoreRecordByTime(true, this.Handler, this.startDate, this.endDate, this.memberId, this.gameId);
    }

    /**
 * 上拉下拉回调 动作处理
 * @param action 当前动作
 */
    private handleAction = (action: any): any => {
        //判断当前动作状态
        if (action === this.state.action ||
            action === STATS.refreshing && this.state.action === STATS.loading ||
            action === STATS.loading && this.state.action === STATS.refreshing) {
            return false
        }

        if (action === STATS.refreshing) {//刷新
            this.ReportCtrl.GetScoreRecordByTime(true, this.Handler, this.startDate, this.endDate, this.memberId, this.gameId);
        } else if (action === STATS.loading && !this.state.isNoMore) {//加载更多

            this.ReportCtrl.GetScoreRecordByTime(false, this.Handler, this.startDate, this.endDate, this.memberId, this.gameId);
        } else if (action === STATS.loading && this.state.isNoMore) {//没有更多数据
            this.setState({
                action: STATS.reset
            })
            return;
        }
        //设置为当前动作
        this.setState({
            action: action
        })

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
     * @param data 请求的数据
     * @param isRefresh 是否是刷新
     * @param error 错误信息
     */
    public Handler = (data: any, isRefresh: Array<any>, error?: string): void => {
        this.setState({
            showLoading: false
        })
        if (error) {
            this.setState({
                action: STATS.reset,
            })
            //提示错误信息
            this.ShowToast(error, ToastType.Error);
            return;
        }
        //初始化 设置action为reset
        if (this.state.init) {
            this.setState({
                memberList: data,
                action: STATS.reset,
                isNoMore: isRefresh[1],
                init: false
            });
        } else {
            //刷新
            if (isRefresh[0]) {
                this.setState({
                    memberList: data,
                    action: STATS.refreshed,
                    isNoMore: isRefresh[1]
                });
            } else {//加载更多
                this.setState({
                    memberList: this.state.memberList.concat(data),
                    action: STATS.reset,
                    isNoMore: isRefresh[1]
                });
            }

        }

    }
    /**
     * 渲染游戏记录
     */
    renderReportItem = (rowItem: any, index: number): any => {
        return (
            <Link to={{
                pathname: `${GetDetailRoute("/gameRecordDetail/", rowItem.Id)}`,
                state: { detail: rowItem, payAmount: rowItem.PayAmount }
            }} key={index} className={""}>
                <div className={styles.item}>
                    <div className={styles.roundId}>{rowItem.RoundId}</div>
                    <div className={styles.time}>{rowItem.BetTime}</div>
                    <div className={styles.bet}>{Money.Format(rowItem.BetAmount)}</div>
                    <div className={styles.pay}>{Money.Format(rowItem.PayAmount)}</div>
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
        let { memberList, isNoMore, action, init } = this.state;
        if (!memberList || memberList.length == 0) {
            return (
                <div className="noData">
                    {!init && this.languageManager.GetErrorMsg("NoData")}
                </div>

            )
        } else {
            return (
                <div className={styles.listContent}>
                    <PullLoad
                        isBlockContainer={true}
                        downEnough={40}
                        action={action}
                        handleAction={this.handleAction}
                        noMore={isNoMore}
                        distanceBottom={1000}>
                        {
                            memberList.map((item: any, index: number) => {
                                return this.renderReportItem(item, index);
                            })
                        }

                    </PullLoad>


                </div>
            )
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <CompToast ref={(c: any) => this.toast = c} />
                <Toast icon="loading" show={this.state.showLoading}>{this.languageManager.GetErrorMsg("Loading")}</Toast>
                <div className={styles.listTitle}>
                    <div className={styles.title}>{this.languageManager.GetErrorMsg("GameRecord")}</div>
                    <div className={styles.head}>
                        <div className={styles.roundId}>{this.languageManager.GetErrorMsg("Round")}</div>
                        <div className={styles.time}>{this.languageManager.GetErrorMsg("Time")}</div>
                        <div className={styles.bet}>{this.languageManager.GetErrorMsg("Bet")}</div>
                        <div className={styles.payTitle}>{this.languageManager.GetErrorMsg("Pay")}</div>
                    </div>
                    {this.renderData()}
                </div>
            </div>
        );
    }
}
export default ReportGameRecord;