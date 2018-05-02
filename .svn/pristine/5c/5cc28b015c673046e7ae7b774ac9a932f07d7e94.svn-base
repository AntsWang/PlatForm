import * as React from 'react';

import { Button, Toast } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import CompToast, { ToastType } from '../../../Components/Toast';
import LanguageManager from '../../../Language/LanguageManager';
import { ErrorCode } from '../../../Enum/ErrorCode';
import Money from '../../../Utils/Money';

import ReportCtrl from '../../../Controller/GameRecordCtrl';

import { GetDetailRoute } from '../../../Route/Config';
import { Link } from 'react-router-dom';

import PullLoad, { STATS } from "../../../Components/PullList/index";
const pullStyle = require("../../../Components/PullList/ReactPullLoad.css");

const styles = require("./style.css");
const rightImg = require("../../../Image/right.png");
class GameRecord extends React.Component<any, any> {
    private ReportCtrl: ReportCtrl = new ReportCtrl();
    private toast: any;
    private languageManager: LanguageManager;
    constructor(props: any) {
        super(props);
        this.state = {
            memberList: [],
            action: STATS.init,
            isNoMore: false,
            init: true,
            showLoading: false,
        }
    }
    componentDidMount() {
        this.setState({
            showLoading: true
        })
        this.ReportCtrl.GetScoreRecord(true, this.Handler);
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
    private Handler = (data: any, isRefresh: any[], error?: string): void => {
        //loading
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
        //初始化设置action为reset
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
            } else { //加载更多 拼接数据
                this.setState({
                    memberList: this.state.memberList.concat(data),
                    action: STATS.reset,
                    isNoMore: isRefresh[1]
                });
            }

        }


    }
    /**
     * 处理上拉下拉动作
     *@param action 当前动作
     */
    private handleAction = (action: any): any => {
        //判断当前动作状态
        if (action === this.state.action ||
            action === STATS.refreshing && this.state.action === STATS.loading ||
            action === STATS.loading && this.state.action === STATS.refreshing) {
            return false
        }
        if (action === STATS.refreshing) {//刷新
            this.ReportCtrl.GetScoreRecord(true, this.Handler);
        } else if (action === STATS.loading && !this.state.isNoMore) {//加载更多

            this.ReportCtrl.GetScoreRecord(false, this.Handler);
        } else if (action === STATS.loading && this.state.isNoMore) {//没有更多数据
            this.setState({
                action: STATS.reset
            })
            return;
        }
        //设置action为当前action
        this.setState({
            action: action
        })

    }
    /**
     * 渲染游戏记录
     */
    renderReportItem = (rowItem: any, index: number): any => {
        let total = Number((rowItem.PayAmount - rowItem.BetAmount).toFixed(2));
        return (
            <Link to={{
                pathname: `${GetDetailRoute("/gameRecordDetail/", rowItem.Id)}`,
                state: { detail: rowItem, payAmount: rowItem.PayAmount }
            }} key={index} className={""}>
                <div className={styles.item}>
                    <div className={styles.gameName}>{rowItem.GameName}</div>
                    <div className={styles.time}>{rowItem.BetTime}</div>
                    <div className={total > 0 ? "win" : "lose"}>
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
        let { memberList, isNoMore, action } = this.state;
        if (!memberList || memberList.length == 0) {
            return (
                <div className="noData">
                    无数据
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
                <CompToast ref={(c) => this.toast = c} />
                <Toast icon="loading" show={this.state.showLoading}>加载中</Toast>
                <div className={styles.listTitle}>
                    <div className={styles.head}>
                        <div className={styles.gameName}>游戏名称</div>
                        <div className={styles.time}>时间</div>
                        <div className={styles.titleWin}>总输赢</div>
                    </div>
                    {this.renderData()}
                </div>
            </div>
        );
    }
}
export default GameRecord;