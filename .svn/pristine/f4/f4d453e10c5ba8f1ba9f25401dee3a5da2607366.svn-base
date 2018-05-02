import * as React from 'react';
import { withRouter } from "react-router-dom";


import { Switch, Toast, Dialog } from "react-weui";
import CompToast, { ToastType } from '../../../Components/Toast';
import { HocAlert } from "../../../Components/Alert/HOCAlert";

import MemberCtrl from "../../../Controller/MemberCtrl";
import MemberInfoDto from "../../../Dto/MemberInfoDto";
import { TransferScoreDto } from "../../../Dto/MemberInfoDto";
import Verification from "../../../Utils/Verification";
import { InfoItemInput, InfoItemButton, InfoItemCheckBox, InfoItemLabel, InfoItemAmount } from '../../../Components/InfoItem';
import LanguageManager from '../../../Language/LanguageManager';
import { ErrorCode } from '../../../Enum/ErrorCode';
import Money from "../../../Utils/Money";
const baseInforStyle = require("./style.css");
const EditImg = require("../../../Image/edit.png");

class BaseInformation extends React.Component<any, any> {
    private MemberCtrl: MemberCtrl = new MemberCtrl();
    private languageManager: LanguageManager = new LanguageManager();
    private toast: any;
    private setScore: any;
    constructor(props: any) {
        super(props);
        this.state = {
            memberId: "",              //会员ID
            account: "",               //账户
            close: true,               //会员状态
            myScore: 0,                //我的分数
            score: 0,                  //会员分数
            remark: "",               //会员备注
            password: "******",       //密码
            headImageUrl: "",         //头像
            phoneNumber: "",          //电话
            memberNickname: "",       //会员昵称
            agent: false,            // 是否是代理
        }
    }
    componentDidMount() {
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        let memberId = this.props.match.params.memberId;
        this.setState({
            memberId
        })
        this.MemberCtrl.GetMemberInfo(memberId, this.Handler);
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
     * 获取会员信息handler回调
     */
    public Handler = (data: MemberInfoDto, isRefresh: boolean, error?: string): void => {
        this.toast.Hide();
        if (error) {
            //todo 提示错误信息
            this.ShowToast(error, ToastType.Error);
            return;
        }
        this.setState({
            account: data.Account,
            close: data.Closed,
            remark: data.Remark,
            myScore: data.MyScore,
            score: data.Score,
            memberNickname: data.Nickname,
            headImageUrl: data.HeadImageUrl,
            phoneNumber: data.PhoneNumber,
            agent: data.Agent,
        });

    }


    /**
     * 进分取分
     * @param type 类型 in-进分 out-取分
     */
    private SetScore = (type: any, scoreValue: any): void => {
        let { myScore, score } = this.state;
        this.ShowToast(ErrorCode[ErrorCode.Wait], ToastType.Wait);
        let MemberId = this.state.memberId,
            Amount = Number(scoreValue);
        if (type === "in") {
            if (Amount > myScore) {
                this.ShowToast(this.languageManager.GetErrorMsg("ExceededQuota"), ToastType.Error);
                return;
            }
            this.MemberCtrl.TransferIn(MemberId, Amount, this.SetScoreHandle);
        } else {
            if (Amount > score) {
                this.ShowToast(this.languageManager.GetErrorMsg("ExceededQuota"), ToastType.Error);
                return;
            }
            this.MemberCtrl.TransferOut(MemberId, Amount, this.SetScoreHandle);
        }
    }
    /**
     * 设置进取分回调
     */
    private SetScoreHandle = (data: TransferScoreDto, params: any[], error?: any) => {
        this.toast.Hide();
        if (error) {
            this.ShowToast(error, ToastType.Error);
        } else {
            this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.setState({ myScore: data.MyScore, score: data.Score });
            this.setScore.clearInput();
        }
    }

    /**
     * 修改备注
     * @param remark 备注信息
     */
    private SetRemark = (remark: string) => {
        this.ShowToast(ErrorCode[ErrorCode.Wait], ToastType.Wait);
        let MemberId = this.state.memberId;
        if (!remark) {
            this.ShowToast(ErrorCode[ErrorCode.RemarkNoNull], ToastType.Error);
            return;
        } else if (this.state.remark == remark) {
            this.ShowToast(ErrorCode[ErrorCode.RemarkNoChange], ToastType.Error);
            return;
        } else {
            this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.MemberCtrl.SetRemark(MemberId, remark, this.SetRemarkHandle);
        }

    }
    /**
     * 设置备注回调
     */
    private SetRemarkHandle = (state: any, data: Array<any>, error?: any) => {
        this.toast.Hide();
        if (error) {
            this.ShowToast(error, ToastType.Error);
        } else {
            this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.setState({
                remark: data[1]
            })
        }
    }

    /**
     * 修改会员状态
     */
    private SetMemberClosed = () => {
        this.ShowToast(ErrorCode[ErrorCode.Wait], ToastType.Wait);
        let MemberId = this.state.memberId,
            Close = !this.state.memberClose;
        this.MemberCtrl.UpdateCloseStatus(MemberId, Close, this.SetMemberClosedHandle);
    }
    /**
     * 会员状态回调
     */
    private SetMemberClosedHandle = (state: any, data: any[], error?: any) => {
        this.toast.Hide();
        if (error) {
            this.ShowToast(error, ToastType.Error);
        } else {
            this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.setState({
                memberClose: data[1]
            })
        }
    }
    /**
     * 设置代理提示 只能设置一次
     * 确定将进行设置
     */
    private agentPrompt = () => {
        this.props.showAlert({
            title: this.languageManager.GetErrorMsg("Warning"), content: this.languageManager.GetErrorMsg("SetOnlyOnce"), buttons: [
                {
                    type: 'default',
                    label: this.languageManager.GetErrorMsg("Cancle"),
                    onClick: this.props.hideAlert
                },
                {
                    type: 'primary',
                    label: this.languageManager.GetErrorMsg("Sure"),
                    onClick: this.SetMemberAgent
                }
            ],
        });
    }
    /**
     * 设置会员为代理
    */
    private SetMemberAgent = () => {
        this.props.hideAlert();
        this.ShowToast(ErrorCode[ErrorCode.Wait], ToastType.Wait);
        let MemberId = this.state.memberId;
        this.MemberCtrl.SetAgent(MemberId, this.SetMemberAgentHandle);
    }
    /**
     * 设置会员为代理callback
     */
    private SetMemberAgentHandle = (state: any, data: any[], error?: any) => {
        this.toast.Hide();
        if (error) {
            this.ShowToast(error, ToastType.Error);
        } else {
            this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.setState({
                agent: data[1]
            })
        }
    }

    /**
     * 设置账号
     * @param password 密码
    */
    private SetAmount = (account: string) => {
        if (!Verification.Password(account)) {
            this.ShowToast(ErrorCode[ErrorCode.AccountFormatError], ToastType.Error);
            this.setState({
                account: ""
            })
            return;
        }
        //this.ShowToast(ErrorCode[ErrorCode.Wait], ToastType.Wait);
        let MemberId = this.state.memberId,
            Account = account;

        this.MemberCtrl.SetAccount(MemberId, Account, this.SetAmountHandle);
    }

    /**
     * 设置账号回调
     */
    private SetAmountHandle = (state: any, data: any[], error?: any) => {
        this.toast.Hide();
        if (error) {
            this.setState({
                account: ""
            })
            this.ShowToast(error, ToastType.Error);
        } else {
            this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.setState({
                account: data[1]
            })
        }

    }

    /**
     * 设置密码
     * @param password 密码
     */
    private SetPassWord = (password: string) => {
        this.ShowToast(ErrorCode[ErrorCode.Wait], ToastType.Wait);
        let MemberId = this.state.memberId,
            Password = password;
        this.MemberCtrl.SetChildPassword(MemberId, Password, this.SetPassWordHandle);
    }

    /**
     * 设置密码回调
     */
    private SetPassWordHandle = (state: any, data: any[], error?: any) => {
        this.toast.Hide();
        if (error) {
            this.ShowToast(error, ToastType.Error);
        } else {
            this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.setState({
                password: "******"
            })
        }

    }

    render() {
        let { score, memberNickname, account, myScore, phoneNumber, headImageUrl, toastMsg, alertMsg } = this.state;
        return (
            <div className={baseInforStyle.container}>
                <CompToast ref={(c) => this.toast = c} />
                <InfoItemLabel nickName={memberNickname} memberSocre={Money.Format(score)} myScore={Money.Format(myScore)} />
                <InfoItemButton ref={(c) => this.setScore = c} label={this.languageManager.GetErrorMsg("Score")} memberSocre={Money.Format(score)} myScore={Money.Format(myScore)} handler={this.SetScore} />
                <InfoItemInput label={this.languageManager.GetErrorMsg("Remark")} value={this.state.remark} handler={this.SetRemark}></InfoItemInput>
                <InfoItemCheckBox label={this.languageManager.GetErrorMsg("State")} trueText={this.languageManager.GetErrorMsg("Normal")} falseText={this.languageManager.GetErrorMsg("Close")} memberClosed={this.state.memberClose} handler={this.SetMemberClosed} />
                <InfoItemCheckBox label={this.languageManager.GetErrorMsg("SetasProxy")} trueText={this.languageManager.GetErrorMsg("AlreadyAgent")} falseText={this.languageManager.GetErrorMsg("SetOnlyOnce")} agent={this.state.agent} memberClosed={!this.state.agent} handler={this.agentPrompt} />
                {/* <InfoItemInput label={this.languageManager.GetErrorMsg("Account")} value={memberNickname} disable={true}></InfoItemInput> */}
                <InfoItemAmount label={this.languageManager.GetErrorMsg("Account")} value={account} handler={this.SetAmount}></InfoItemAmount>
                <InfoItemInput label={this.languageManager.GetErrorMsg("PassWord")} value={this.state.password} handler={this.SetPassWord}></InfoItemInput>
                <InfoItemInput label={this.languageManager.GetErrorMsg("PhoneNumber")} value={phoneNumber} disable={true}></InfoItemInput>

            </div>
        );
    }
}

export default withRouter(HocAlert(BaseInformation));