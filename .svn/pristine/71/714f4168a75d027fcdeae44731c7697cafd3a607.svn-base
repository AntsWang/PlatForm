import * as React from 'react';
import {
    Link
} from "react-router-dom";

import { Toast } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';

import CompToast, { ToastType } from '../../../Components/Toast';
import LanguageManager from '../../../Language/LanguageManager';
import { ErrorCode } from '../../../Enum/ErrorCode';

import MemberCtrl from '../../../Controller/MemberCtrl';
import ChildScoreDto from '../../../Dto/ChildScoreDto';
import Money from '../../../Utils/Money';
import { GetDetailRoute } from '../../../Route/Config';
import MemberDetail from "../../MemberDetail/index";

import PullLoad, { STATS } from "../../../Components/PullList/index";
const pullStyle = require("../../../Components/PullList/ReactPullLoad.css");

const styles = require("./style.css");
const rightImg = require("../../../Image/right.png");

export default class MemberList extends React.Component<any, any> {
    private memberCtrl: MemberCtrl = new MemberCtrl();
    private toast: any;
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any) {
        super(props);
        this.state = {
            memberList: [],
            action: STATS.init,
            isNoMore: false,
            initRequest: true,
            showLoading: false,
        }
        this.Handler = this.Handler.bind(this);
    }

    componentDidMount() {
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        //网络请求加载数据
        this.memberCtrl.GetChildScoreList(true, this.Handler);
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
     * 网络请求回调
     * @param data 数据
     * @param params 传递的参数
     * @param error 错误
     */
    public Handler = (data: Array<ChildScoreDto>, params: Array<any>, error?: string): void => {
        this.toast.Hide();
        if (error) {
            this.setState({
                action: STATS.reset,
            })
            //提示错误信息
            this.ShowToast(error, ToastType.Error);
            return;
        }
        let isRefresh: boolean = params[0];
        let isNoMore: boolean = params[1];
        if (this.state.initRequest) {
            this.setState({
                memberList: data,
                action: STATS.reset,
                isNoMore: isNoMore,
                initRequest: false
            });
        } else {
            if (isRefresh) {
                this.setState({
                    memberList: data,
                    action: STATS.refreshed,
                    isNoMore: isNoMore
                });
            } else {
                this.setState({
                    memberList: this.state.memberList.concat(data),
                    action: STATS.reset,
                    isNoMore: isNoMore
                });
            }

        }
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
            this.memberCtrl.GetChildScoreList(true, this.Handler);
        } else if (action === STATS.loading && !this.state.isNoMore) {//加载更多

            this.memberCtrl.GetChildScoreList(true, this.Handler);
        } else if (action === STATS.loading && this.state.isNoMore) { //没有更多数据
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
     * 渲染每行数据
     */
    public renderMemberItem = (rowItem: ChildScoreDto, index: number): any => {
        return (
            <Link to={`${GetDetailRoute("/memberDetail/", rowItem.MemberId)}`} key={index} className={styles.rowItem}>
                <div className={styles.nickName}>
                    <div className={styles.number}>
                        {index + 1}
                    </div>
                    <div className={styles.name}>
                        {rowItem.Nickname}{rowItem.Remark ? "(" + rowItem.Remark + ")" : ""}
                    </div></div>
                <div className={styles.score}>
                    <div className={rowItem.Score == 0 ? null : (rowItem.Score > 0 ? "zheng" : "fu")}>
                        {Money.Format(rowItem.Score)}
                    </div>
                    <div>
                        <img src={rightImg} />
                    </div>
                </div>
            </Link>
        )
    }

    render() {
        let { memberList, isNoMore, action, initRequest } = this.state;
        if (!memberList || memberList.length == 0) {
            return (
                <div className="noData">
                    <CompToast ref={(c) => this.toast = c} />
                    {!initRequest && this.languageManager.GetErrorMsg("NoData")}
                </div>

            )
        }
        return (
            <div className={styles.container}>
                <CompToast ref={(c) => this.toast = c} />
                <Toast icon="loading" show={this.state.showLoading}>{this.languageManager.GetErrorMsg("Loading")}</Toast>
                <PullLoad
                    isBlockContainer={true}
                    downEnough={40}
                    action={action}
                    handleAction={this.handleAction}
                    noMore={isNoMore}
                    distanceBottom={1000}>
                    <div className={styles.listContent}>
                        {
                            memberList.map((item: any, index: number) => {
                                return this.renderMemberItem(item, index);
                            })
                        }
                    </div>
                </PullLoad>

            </div>
        );
    }
}