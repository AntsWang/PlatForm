import * as React from 'react';
import {
    Link,
    Redirect
} from 'react-router-dom';
import { Toast } from "react-weui";
import LanguageManager from '../../Language/LanguageManager';
import UserCtrl from "../../Controller/UserCtrl";
import { ResultEnum, LoginResultDto } from '../../Dto/LoginInfoDto';
import { MultiAccountDto } from '../../Dto/AuthorizationDto';
import Verification from "../../Utils/Verification";
import CompToast, { ToastType } from '../../Components/Toast';
import { ErrorCode } from '../../Enum/ErrorCode';

import { HomeRoute } from '../../Route/Config';
const styles = require("./style.css");
const rightImg = require("../../Image/right.png");

export default class Login extends React.Component<any, any> {
    private userCtrl: UserCtrl = new UserCtrl();
    private toast: any;
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any) {
        super(props);
        this.state = {
            account: "",
            passWord: "",
            login: false,
            showLoading: false,
            limite: false
        }
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
    handleAChange = (event: any) => {
        this.setState({
            account: event.target.value
        })
    }
    handlePChange = (event: any) => {
        this.setState({
            passWord: event.target.value
        })
    }
    login = () => {
        this.userCtrl.GetAppID();
        let { account, passWord } = this.state;
        if (!Verification.Password(account) || !Verification.Password(passWord)) {
            this.ShowToast(this.languageManager.GetErrorMsg("Illegal"), ToastType.Error);
            return;
        }
        console.log(account, passWord);
        this.ShowToast(this.languageManager.GetErrorMsg("Logining"), ToastType.Loading);
        this.userCtrl.LoginByAccount(account, passWord, this.LoginCallback);
    }
    private LoginCallback = (response: LoginResultDto): void => {
        console.log(response);
        if (response.Result == 1) {
            this.setState({
                login: true
            });
            this.userCtrl.GetMemberInfo(() => { });
            return;
        } else if (response.Result == 3) {
            this.setState({
                limite: true
            });
            return;
        }
        this.toast.Hide();
        this.ShowToast(this.languageManager.GetErrorMsg(response.Data), ToastType.Error);
        return;
    }
    render() {
        let { account, passWord, login, limite } = this.state;
        return (
            <div className={styles.container}>
                <CompToast ref={(c) => this.toast = c} />
                <Toast icon="loading" show={this.state.showLoading}>{this.languageManager.GetErrorMsg("Loading")}</Toast>
                {
                    limite ? <Redirect to="/limite" /> : login ? <Redirect to="/" /> : <div className={styles.form}>
                        <div className={styles.inputRow}>
                            账号:<input className={styles.input} type="text" value={account} onChange={this.handleAChange} />
                        </div>
                        <div className={styles.inputRow}>
                            密码:<input className={styles.input} type="password" value={passWord} onChange={this.handlePChange} />
                        </div>
                        <div onClick={this.login} className={styles.loginBtn}>登录</div>
                    </div>}
            </div>
        );
    }
}