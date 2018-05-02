import * as React from 'react';
import { withRouter } from "react-router-dom";


import { Switch, Toast, Dialog } from "react-weui";
import CompToast, { ToastType } from '../../../../Components/Toast';
import { HocAlert } from "../../../../Components/Alert/HOCAlert";

import MemberCtrl from "../../../../Controller/MemberCtrl";
import MemberInfoDto from "../../../../Dto/MemberInfoDto";
import { TransferScoreDto } from "../../../../Dto/MemberInfoDto";
import Verification from "../../../../Utils/Verification";
import { InfoItemInput, InfoItemShow, InfoItemPassword, InfoItemMy, InfoItemAmount } from '../../../../Components/InfoItem';
import LanguageManager from '../../../../Language/LanguageManager';
import { ErrorCode } from '../../../../Enum/ErrorCode';
import Money from "../../../../Utils/Money";
const baseInforStyle = require("./style.css");
const EditImg = require("../../../../Image/edit.png");

class BaseInformation extends React.Component<any, any> {
    private MemberCtrl: MemberCtrl = new MemberCtrl();
    private languageManager: LanguageManager = new LanguageManager();
    private toast: any;
    private setScore: any;
    constructor(props: any) {
        super(props);
        this.state = {
            memberId: 0,              //会员ID
            account: "",               //账户
            myScore: 0,                //我的分数
            password: "******",       //密码
            headImageUrl: "",         //头像
            phoneNumber: "",          //电话
            agent: false,            // 是否是代理
            oldPassword: "",
            newPassword: "",
            showModal: false,
            curPassword: "",
            memberNickname:"",
        }
    }
    componentDidMount() {
        let { memberId } = this.state;
        this.ShowToast(this.languageManager.GetErrorMsg("Loading"), ToastType.Loading);
        this.MemberCtrl.GetOwnInfo(this.Handler);
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
            // this.ShowToast(ErrorCode[ErrorCode.Success], ToastType.Success);
            this.setState({
                account: data[1]
            })

            this.props.showAlert({
                title: this.languageManager.GetErrorMsg("SetAccountSuccess"), content: this.languageManager.GetErrorMsg("SetAccountWarning"), buttons: [
                    {
                        type: 'primary',
                        label: this.languageManager.GetErrorMsg("Sure"),
                        onClick: this.props.hideAlert
                    }
                ],
            });
        }

    }
    ShowModal = () => {
        this.setState({
            showModal: true
        })
    }

    /**
     * 设置密码
     *
     */
    private SetPassWord = () => {
        let { oldPassword, newPassword, curPassword } = this.state;
        if (!Verification.Password(oldPassword) || !Verification.Password(newPassword) || !Verification.Password(curPassword)) {
            this.ShowToast(this.languageManager.GetErrorMsg("Illegal"), ToastType.Error);
            return;
        }
        if (newPassword != curPassword) {
            this.toast.Show("两次密码一样", ToastType.Error);
            return;
        }

        this.MemberCtrl.SetPassword(oldPassword, newPassword, this.SetPassWordHandle);
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
                password: "******",
                showModal: false
            })
        }

    }

    handleAChange = (event: any) => {
        this.setState({
            oldPassword: event.target.value
        })
    }
    handlePChange = (event: any) => {
        this.setState({
            newPassword: event.target.value
        })
    }
    handleCurhange = (event: any) => {
        this.setState({
            curPassword: event.target.value
        })
    }
    Cancle = () => {
        this.setState({
            showModal: false
        })
    }
    renderModal = () => {
        let { oldPassword, newPassword, curPassword } = this.state;
        return (<div className={baseInforStyle.modal}>
            <div className={baseInforStyle.content}>
                <div className={baseInforStyle.inputRow}>
                    &nbsp;&nbsp;{this.languageManager.GetErrorMsg("OldPwd")}: &nbsp;<input className={baseInforStyle.input} type="password" value={oldPassword} onChange={this.handleAChange} />
                </div>
                <div className={baseInforStyle.inputRow}>
                    &nbsp;&nbsp;{this.languageManager.GetErrorMsg("NewPwd")}: &nbsp;<input className={baseInforStyle.input} type="password" value={newPassword} onChange={this.handlePChange} />
                </div>
                <div className={baseInforStyle.inputRow}>
                    {this.languageManager.GetErrorMsg("ConfirmPwd")}: &nbsp;<input className={baseInforStyle.input} type="password" value={curPassword} onChange={this.handleCurhange} />
                </div>
                <div className={baseInforStyle.btn}>
                    <div onClick={this.Cancle} className={baseInforStyle.loginBtn}>{this.languageManager.GetErrorMsg("Cancle")}</div>
                    <div onClick={this.SetPassWord} className={baseInforStyle.loginBtn}>{this.languageManager.GetErrorMsg("Sure")}</div>
                </div>
            </div>

        </div>)
    }
    render() {
        let { showModal, score, memberNickname, account, myScore, phoneNumber, headImageUrl, toastMsg, alertMsg, agent, close } = this.state;
        return (
            <div className={baseInforStyle.container}>
                <CompToast ref={(c) => this.toast = c} />
                <InfoItemMy nickName={memberNickname} myScore={Money.Format(myScore)} />



                {/* <InfoItemInput label={this.languageManager.GetErrorMsg("Account")} value={memberNickname} disable={true}></InfoItemInput> */}
                <InfoItemAmount label={this.languageManager.GetErrorMsg("Account")} value={account} handler={this.SetAmount}></InfoItemAmount>
                <InfoItemPassword label={this.languageManager.GetErrorMsg("PassWord")} value={this.state.password} disable={account} handler={this.ShowModal}></InfoItemPassword>
                <InfoItemInput label={this.languageManager.GetErrorMsg("NickName")} value={memberNickname} disable={true}></InfoItemInput>
                <InfoItemInput label={this.languageManager.GetErrorMsg("PhoneNumber")} value={phoneNumber} disable={true}></InfoItemInput>
                <InfoItemShow label={this.languageManager.GetErrorMsg("IsAgent")} value={this.languageManager.GetErrorMsg(agent)} disable={true}></InfoItemShow>
                <InfoItemShow label={this.languageManager.GetErrorMsg("State")} value={this.languageManager.GetErrorMsg(`S${close}`)} disable={true}></InfoItemShow>
                {
                    showModal && this.renderModal()
                }
            </div>
        );
    }
}

export default withRouter(HocAlert(BaseInformation));