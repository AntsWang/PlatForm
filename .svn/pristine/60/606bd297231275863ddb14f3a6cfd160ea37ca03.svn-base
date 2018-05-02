import * as React from 'react';
import {
    Link,
    Redirect
} from 'react-router-dom';
import LanguageManager from '../../Language/LanguageManager';
import UserCtrl from "../../Controller/UserCtrl";
import { ResultEnum, LoginResultDto } from '../../Dto/LoginInfoDto';
import { MultiAccountDto } from '../../Dto/AuthorizationDto';

import { HomeRoute } from '../../Route/Config';
const styles = require("./style.css");
const rightImg = require("../../Image/right.png");

export default class Login extends React.Component<any, any> {
    private userCtrl: UserCtrl = new UserCtrl();
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any) {
        super(props);
        this.state = {
            isShowLogin: true,
            accountList: [],
            forgin: true,
            limite: false
        };
    }

    componentWillMount() {
        this.userCtrl.GetAppID();
        this.userCtrl.Login(this.LoginCallback);
    }

    private LoginCallback = (response: LoginResultDto): void => {
        if (response.Result == 3) {
            this.setState({
                limite: true

            });
            this.props.loginComplete();
            return;
        }
        if (response.Result == ResultEnum.LOGIN) {
            //登录成功，获取会员信息
            this.userCtrl.GetMemberInfo(this.Redirect);
        } else if (response.Result == ResultEnum.MULTI) {
            this.setState({ accountList: response.Data });
        } else if (response.Result == ResultEnum.ERROR) {
            this.Redirect();
        } else if (response.Result == ResultEnum.Tourist) {
            this.Redirect();
        } else if (response.Result == ResultEnum.NO) {
            this.Redirect();
        }
    }


    /**
     * 重定向
     */
    private Redirect = (): void => {
        let { forgin } = this.state;
        this.setState({ isShowLogin: false });
        this.props.loginComplete(forgin);
    }

    /**
     * 选中回调
     * @param index 编号
     */
    private OnSelect = (memberID: number): void => {
        this.userCtrl.LoginByID(memberID, this.LoginCallback);
    }

    /**
     * 渲染多账号
     */
    private renderAccountItem = (rowItem: MultiAccountDto, index: number) => {
        return (<div onClick={() => { this.OnSelect(rowItem.MemberId) }} key={index} className={styles.rowItem} >
            <div className={styles.nickName}>
                <div className={styles.number}>
                    {this.languageManager.GetErrorMsg("Agent")}：
                </div>
                <div className={styles.name}>
                    {rowItem.ParentNickname}
                </div></div>
            <div className={styles.score}>
                <div>
                    {rowItem.Account ? `${this.languageManager.GetErrorMsg("Account")}:${rowItem.Account}` : ""}
                </div>
                <div>
                    <img src={rightImg} />
                </div>
            </div>
        </div >)
    }

    private renderLogin = (): any => {
        if (this.state.accountList && this.state.accountList.length > 0) {
            return (
                <div className={styles.listContent}>
                    <div className={styles.title}>{this.languageManager.GetErrorMsg("AgentTitle")}</div>
                    {
                        this.state.accountList.map((item: MultiAccountDto, index: number) => {
                            return this.renderAccountItem(item, index);
                        })
                    }
                </div>
            )
        } else {
            return (
                <div className={styles.logining}>
                    {this.languageManager.GetErrorMsg("Loading")}
                </div>
            )
        }
    }

    render() {
        let { limite } = this.state;
        if (limite) {
            return <Redirect to="/limite" />;
        }
        if (!this.state.isShowLogin) {
            return null;
        }
        return (
            <div className={styles.login}>
                {this.renderLogin()}
            </div>
        );
    }
}