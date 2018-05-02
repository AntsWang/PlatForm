import * as React from 'react';
import {
    Link,
    Prompt,
    Route
} from 'react-router-dom';
import CompToast, { ToastType } from '../../../Components/Toast';
import LanguageManager from '../../../Language/LanguageManager';
import { ErrorCode } from '../../../Enum/ErrorCode';

import { MeRoute, AllReportRoute, GameRecordRoute, ReportRoute, ScoreRecordRoute, SettingRoute, } from '../../../Route/Config';
import GameRecord from "../GameRecord";
import Report from "../Report/index.div";
import AllReport from "../Report/index";
import ScoreRecord from "../ScoreRecord";
import Setting from "./Setting";
const style = require("./style.css");
const rightImg = require("../../../Image/right.png");
class MeTabList extends React.Component<any, any> {
    private languageManager: LanguageManager = new LanguageManager();
    private list: Array<string> = [
        this.languageManager.GetErrorMsg("ScoreRecord"),
        this.languageManager.GetErrorMsg("GameRecord"),
        this.languageManager.GetErrorMsg("Report"),
        this.languageManager.GetErrorMsg("FullReport"),
        this.languageManager.GetErrorMsg("Setting")];
    private routerList: Array<string> = [
        ScoreRecordRoute,
        GameRecordRoute,
        ReportRoute,
        AllReportRoute,
        SettingRoute];
    constructor(props: any) {
        super(props);
    }
    renderItem = (item: any, index: number) => {
        return (<Link key={index} to={this.routerList[index]} className={style.row}>
            <div className={style.left}>{item}</div>
            <div className={style.right}>
                <img src={rightImg} />
            </div>
        </Link>)
    }
    render() {
        let router = this.props.location.pathname;
        return (
            <div className={style.home}>
                {
                    router == "/manager/me" && this.list.map((item, index) => {
                        return this.renderItem(item, index);
                    })
                }
                <Route path={GameRecordRoute} component={GameRecord} />
                <Route path={ReportRoute} component={Report} />
                <Route path={AllReportRoute} component={AllReport} />
                <Route path={ScoreRecordRoute} component={ScoreRecord} />
                <Route path={SettingRoute} component={Setting} />
            </div>
        );
    }
}

export default MeTabList