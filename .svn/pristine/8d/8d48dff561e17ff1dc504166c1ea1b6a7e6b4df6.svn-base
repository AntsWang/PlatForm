import * as React from 'react';
import {
    Link,
    Route,
    HashRouter as Router
} from 'react-router-dom';
import LanguageManager from '../../Language/LanguageManager';
import { MemberRoute, MeRoute, GameRecordRoute, ReportRoute, ScoreRecordRoute, MemberDetailRoute } from '../../Route/Config';
import Tabs from "../../Components/TabView/TabView";

import MemberList from "./Member";
import Me from "./Me";
// import GameRecord from "./GameRecord";
// import Report from "./Report/index";
// import ScoreRecord from "./ScoreRecord";
// import MemberDetail from "../MemberDetail"
enum tab {
    "/manager/member" = 0,
    "/manager/me"
}

const styles = require("./style.css");
export default class Manager extends React.Component<any, any> {
    private languageManager: LanguageManager = new LanguageManager();
    //头部tab列表
    private tabList: Array<string> = [this.languageManager.GetErrorMsg("Member"), this.languageManager.GetErrorMsg("Me")];
    constructor(props: any) {
        super(props);
        this.state = {
            selectedIndex: tab[this.props.history.location.pathname]
        }
        this.tabClick = this.tabClick.bind(this);

    }

    /**
     * tab切换回调
     * @param index 当前点击的tab下标
     */
    public tabClick = (index: number): void => {
        this.setState({
            selectedIndex: index
        });
        switch (index) {
            case 0:
                this.props.history.replace(MemberRoute);
                break;
            case 1:
                this.props.history.replace(MeRoute);
                break;
            default:
                this.props.history.replace(MemberRoute);
                break;
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.tabs}>
                    <Tabs tabList={this.tabList} tabClick={this.tabClick} selectedIndex={this.state.selectedIndex} />
                </div>
                <Route exact path={MemberRoute} component={MemberList} />
                <Route path={MeRoute} component={Me} />
            </div>
        );
    }
}