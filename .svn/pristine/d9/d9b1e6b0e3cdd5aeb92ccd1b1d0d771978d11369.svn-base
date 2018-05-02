import * as React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import { MemberRoute, GameRecordRoute, ReportRoute, ScoreRecordRoute, MemberDetailRoute } from '../../Route/Config';
import Tabs from "../../Components/TabView/TabView";

import MemberList from "./Member";
import GameRecord from "./GameRecord";
import Report from "./Report/index";
import ScoreRecord from "./ScoreRecord"
import MemberDetail from "../MemberDetail"
enum tab {
    "/manager/member" = 0,
    "/manager/gamerecord",
    "/manager/report",
    "/manager/scoreRecord"


}

const styles = require("./style.css");
export default class Manager extends React.Component<any, any> {
    //头部tab列表
    private tabList: Array<string> = ["会员", "游戏记录", "报表", "分数记录"];
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
                this.props.history.replace(GameRecordRoute);
                break;
            case 2:
                this.props.history.replace(ReportRoute);
                break;
            case 3:
                this.props.history.replace(ScoreRecordRoute);
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
                <Route exact path={GameRecordRoute} component={GameRecord} />
                <Route exact path={ReportRoute} component={Report} />
                <Route exact path={ScoreRecordRoute} component={ScoreRecord} />
            </div>
        );
    }
}