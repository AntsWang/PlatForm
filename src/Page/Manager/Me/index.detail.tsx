import * as React from 'react';
import {
    Link,
    Route,
} from 'react-router-dom';
import LanguageManager from '../../../Language/LanguageManager';
import { AllReportRoute,MemberRoute,SettingRoute, GameRecordRoute, ReportRoute, ScoreRecordRoute, MemberDetailRoute } from '../../../Route/Config';
import Tabs from "../../../Components/TabView/TabView";

import MemberList from "../Member";
import GameRecord from "../GameRecord";
import Report from "../Report/index";
import ScoreRecord from "../ScoreRecord";
import Setting from "./Setting";
import MemberDetail from "../../MemberDetail"
enum tab {
    "/manager/member" = 0,
    "/manager/gamerecord",
    "/manager/report",
    "/manager/scoreRecord"


}

const styles = require("./style.css");
export default class Manager extends React.Component<any, any> {
    private languageManager: LanguageManager = new LanguageManager();
    //头部tab列表
    private tabList: Array<string> = [
        this.languageManager.GetErrorMsg("GameRecord"),
        this.languageManager.GetErrorMsg("Report"),
        this.languageManager.GetErrorMsg("ScoreRecord"),
        "完整报表", "个人设置"];
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
                this.props.history.replace(GameRecordRoute);
                break;
            case 1:
                this.props.history.replace(ReportRoute);
                break;
            case 2:
                this.props.history.replace(ScoreRecordRoute);
                break;
            case 3:
                this.props.history.replace(AllReportRoute);
                break;
            default:
                this.props.history.replace(SettingRoute);
                break;
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.tabs}>
                    <Tabs tabList={this.tabList} tabClick={this.tabClick} selectedIndex={this.state.selectedIndex} />
                </div>
                <Route exact path={GameRecordRoute} component={GameRecord} />
                <Route path={ReportRoute} component={Report} />
                <Route path={AllReportRoute} component={Report} />
                <Route path={ScoreRecordRoute} component={ScoreRecord} />
                <Route path={SettingRoute} component={Setting} />
            </div>
        );
    }
}