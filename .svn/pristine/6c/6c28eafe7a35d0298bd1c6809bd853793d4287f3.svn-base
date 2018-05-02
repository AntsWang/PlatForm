import * as React from 'react';
import {
    Link,
    Prompt,
} from 'react-router-dom';

import { AuthorizationDto } from '../../Dto/AuthorizationDto';
import CacheManager, { CacheType, UserInfo, Authorization } from '../../Service/CacheManager/CacheManager';

import { GetRedirectUrl } from "../../GameConfig";
import CompToast, { ToastType } from '../../Components/Toast';
import LanguageManager from '../../Language/LanguageManager';
import { ErrorCode } from '../../Enum/ErrorCode';
import { GetQuery } from '../../Utils/Url';
import * as GameConfig from '../../GameConfig';


import { MemberRoute } from '../../Route/Config';
import UserCtrl from "../../Controller/UserCtrl";
import Money from '../../Utils/Money';

import { GameList } from "../../GameList";
import { url } from 'inspector';
const logoImg = require("../../Image/logo.png");
const style = require("./style.css");
const rightImg = require("../../Image/right.png");
const starImg = require("../../Image/star.png");

export default class Home extends React.Component<any, any> {
    private userCtrl: UserCtrl = new UserCtrl();
    private toast: any;
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any) {
        super(props);
        this.state = {
            isLogin: this.userCtrl.IsLogin(),
            isClose: this.userCtrl.IsClose(),
            memberInfo: this.userCtrl.GetMemberInfoByLocal(),
            isTourists: this.userCtrl.GetAuthorizationDtoByLocal().IsTourists,
            gmeList: [],
            value: CacheManager.GetCache(CacheType.Language).language
        }
    }
    componentWillMount() {
    }
    /**
     * 提示信息
     * @param errorKey 提示信息
     * @param  type 信息类型
    */
    private ShowToast = (errorKey: string, type: ToastType = ToastType.Success): void => {
        let msg: string = this.languageManager.GetErrorMsg(errorKey);
        this.toast.Show(msg, type);
    }
    /**
     * 游戏跳转
     * @param id  游戏ID
     * @param url 游戏地址
     */
    private GameLogin = (id: number) => {
        let isLogin = this.userCtrl.GameLogin(id);
        if (isLogin) {
            window.location.href = GetRedirectUrl(id)
        }
        else {
            //todo
            this.ShowToast("token_Error", ToastType.Error);

        }
    }
    /**
     *点击关注 
     */
    private Attention = () => {
        //获取地址栏中state参数，即父级（推荐人）ID
        let parentID: string = GetQuery("parentid");
        if (!parentID) {
            parentID = "1";
        }
        let link = GameConfig.GetWeChatShareDto(parentID, true).Link;
        window.location.replace(link);

    }
    /**
     * 渲染按钮
     */
    public renderButton = (): any => {
        let { isTourists } = this.state;
        if (isTourists) {
            return (<div onClick={this.Attention} className={style.button}>{this.languageManager.GetErrorMsg("Attention")}</div>)
        } else if (!this.state.isLogin) {
            return (<div onClick={this.Attention} className={style.button}>{this.languageManager.GetErrorMsg("Login")}</div>)
        } else if (this.state.isClose) {
            return null;
        } else if (this.state.isLogin) {
            return (<Link to={MemberRoute} className={style.button}>{this.languageManager.GetErrorMsg("Manager")}</Link>)
        }
    }
    /**
     * 渲染游戏列表
     */
    private renderGameList = (item: any, index: number) => {
        return (
            <div key={index}>
                {
                    item.complete ? (
                        <div key={index} className={style.rowItem} onClick={() => { this.GameLogin(item.id) }}>
                            <div className={style.img}>
                                <img style={{ width: 60, height: 60 }} src={item.imgUrl} />
                            </div>
                            <div className={style.gameMsg}>
                                <div className={style.name}>{this.languageManager.GetErrorMsg("GameName")}:{this.languageManager.GetErrorMsg(item.name)}</div>
                                <div className={style.start}>{this.languageManager.GetErrorMsg("Recommended")}:{this.renderStar(item.star)}</div>
                            </div>
                            <div className={style.imgRight}>
                                {
                                    item.complete ? (<img style={{ width: 16, height: 16 }} src={rightImg} />) : <span style={{ color: "red" }}>{this.languageManager.GetErrorMsg("Waiting")}</span>
                                }

                            </div>
                        </div>
                    ) : (
                            <div key={index} className={style.rowItem}>
                                <div className={style.img}>
                                    <img style={{ width: 60, height: 60 }} src={item.imgUrl} />
                                </div>
                                <div className={style.gameMsg}>
                                    <div className={style.name}>{this.languageManager.GetErrorMsg("GameName")}:{this.languageManager.GetErrorMsg(item.name)}</div>
                                    <div className={style.start}>{this.languageManager.GetErrorMsg("Recommended")}:{this.renderStar(item.star)}</div>
                                </div>
                                <div className={style.imgRight}>
                                    {
                                        item.complete ? (<img style={{ width: 16, height: 16 }} src={rightImg} />) : <span style={{ color: "red" }}>{this.languageManager.GetErrorMsg("Waiting")}</span>
                                    }

                                </div>
                            </div>
                        )
                }
            </div>


        )
    }
    /**
     * 切换语言
     */
    private handleChange = (event: any) => {
        this.languageManager.SetLanguage(Number(event.target.value));
        this.setState({
            value: event.target.value
        });
    }
    renderStar = (level: number) => {
        let arr = [];
        for (let i = 0; i < level; i++) {
            arr.push(level)
        }
        return arr.map((item, index) => {
            return (<img key={index} style={{ width: 16, height: 16 }} src={starImg} />)
        })
    }
    render() {
        document.title = this.languageManager.GetErrorMsg("Plat");
        let socre: string = this.state.memberInfo ? Money.Format(this.state.memberInfo.Score) : "0",
            headImg = this.state.memberInfo && this.state.memberInfo.HeadImageUrl ? this.state.memberInfo.HeadImageUrl : logoImg
        return (
            <div className="home">
                <CompToast ref={(c) => this.toast = c} />
                <div className={style.header}>
                    <div className={style.info} >
                        <img src={headImg} alt="" className={style.logo} />
                        {
                            this.state.isLogin ? (
                                <label htmlFor="">{this.languageManager.GetErrorMsg("Score")}:{socre}</label>
                            ) : null
                        }
                    </div>
                    <div>
                        <select className={style.select} value={this.state.value} onChange={this.handleChange}>
                            <option value="0">中文</option>
                            <option value="1">English</option>
                        </select>
                    </div>
                </div>
                <div className={style.gameList}>
                    {
                        GameList.map((item: any, index: number) => {
                            return this.renderGameList(item, index);
                        })
                    }
                </div>
            </div>
        );
    }
}