/**
 * 与scoreRecord页面一样   暂未使用
 */
import * as React from 'react';
import { withRouter } from "react-router-dom";

import PullLoad, { STATS } from "../../../Components/PullList/index";
const pullStyle = require("../../../Components/PullList/ReactPullLoad.css");

import { Button, Toast } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import CompToast, { ToastType } from '../../../Components/Toast';
import LanguageManager from '../../../Language/LanguageManager';
import { ErrorCode } from '../../../Enum/ErrorCode';
import { TransactionType } from "../../../Enum/TransactionType";
import Money from "../../../Utils/Money"

import ScoreRecordCtrl from '../../../Controller/CheckAccountCtrl';

const scoreRecordStyle = require("./style.css");

class CheckAccount extends React.Component<any, any> {
    private ScoreRecordCtrl: ScoreRecordCtrl = new ScoreRecordCtrl();
    private toast: any;
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any) {
        super(props);
        this.state = {
            memberList: [],              //请求返回的数据
            action: STATS.init,          //上拉下拉动作
            isNoMore: false,             //没有更多数据
            init: true,                  //初始化
            showLoading: false,
            memberId: "",                //会员ID
        }
    }
    componentDidMount() {
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        //获取会员ID
        let memberId = this.props.match.params.memberId;
        this.setState({
            showLoading: true,
            memberId
        })
        this.ScoreRecordCtrl.GetScoreRecord(memberId, true, this.Handler);
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
     * api请求回调
     * @param data 请求的数据
     * @param isRefresh 是否是刷新
     * @param error 错误信息
     */
    public Handler = (data: any, isRefresh: Array<any>, error?: string): void => {
        this.toast.Hide();
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
            } else {
                this.setState({    //加载更多
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
            this.ScoreRecordCtrl.GetScoreRecord(this.state.memberId, true, this.Handler);
        } else if (action === STATS.loading && !this.state.isNoMore) {//加载更多

            this.ScoreRecordCtrl.GetScoreRecord(this.state.memberId, false, this.Handler);
        } else if (action === STATS.loading && this.state.isNoMore) {  // 没有更多数据
            this.setState({
                action: STATS.reset
            })
            return;
        }

        this.setState({
            action: action
        })

    }
    /**
     * 渲染单条数据
     * @param item 当前遍历的数据
     * @param index 当前数据索引
     */
    public renderRowItem = (item: any, index: any) => {
        return (
            <div key={index} className={scoreRecordStyle.row}>
                <div className={scoreRecordStyle.time}>{item.UpdateTime}</div>
                <div className={(item.Changed==0?"ling":item.Changed > 0 ? "zheng" : "fu") +" "+scoreRecordStyle.win}>{Money.Format(item.Changed)}</div>
                <div className={scoreRecordStyle.change}>{Money.Format(item.Balance)}</div>
                <div className={scoreRecordStyle.message}>{this.languageManager.GetErrorMsg(`TransactionType${item.TransactionType}`)}</div>
            </div>
        )
    }
    public renderData = () => {
        let { memberList, isNoMore, action,init } = this.state;
        if (!memberList || memberList.length == 0) {
            return (
                <div className="noData">
                    <CompToast ref={(c) => this.toast = c} />
                   {!init&&this.languageManager.GetErrorMsg("NoData")}
                </div>

            )
        }
        return (
            <div>
                <CompToast ref={(c) => this.toast = c} />
                <Toast icon="loading" show={this.state.showLoading}>{this.languageManager.GetErrorMsg("Loading")}</Toast>
                <PullLoad
                    isBlockContainer={true}
                    downEnough={40}
                    action={action}
                    handleAction={this.handleAction}
                    noMore={isNoMore}
                    distanceBottom={1000}>
                    {
                        memberList.map((item: any, index: any) => {
                            return this.renderRowItem(item, index);
                        })
                    }

                </PullLoad>
            </div>
        );
    }

    render() {
        return (
            <div className={scoreRecordStyle.container}>
                <CompToast ref={(c) => this.toast = c} />
                <Toast icon="loading" show={this.state.showLoading}>{this.languageManager.GetErrorMsg("Loading")}</Toast>
                <div className={scoreRecordStyle.rowTitle}>
                    <div className={scoreRecordStyle.time}>{this.languageManager.GetErrorMsg("Time")}</div>
                    <div className={scoreRecordStyle.change}>{this.languageManager.GetErrorMsg("ScoreChanges")}</div>
                    <div className={scoreRecordStyle.change}>{this.languageManager.GetErrorMsg("Balance")}</div>
                    <div className={scoreRecordStyle.message}>{this.languageManager.GetErrorMsg("Type")}</div>
                </div>
                {
                    this.renderData()
                }
            </div>
        );
    }
}

export default withRouter(CheckAccount);