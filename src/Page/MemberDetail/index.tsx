import * as React from 'react';
import { withRouter } from "react-router-dom";
import Tabs from "../../Components/TabView/TabView";
import BaseInformation from "./BaseInforMation";
import CheckAccount from "../Manager/ScoreRecord";
import ScorerRecord from "./ChildScoreRecord";
import LanguageManager from '../../Language/LanguageManager';
const memDetailStyle = require("./style.css");
class MemberDetail extends React.Component<any, any> {
    private languageManager: LanguageManager = new LanguageManager();
    //tab 列表
    private tabList: Array<string> = [this.languageManager.GetErrorMsg("BasicInformation"), 
    this.languageManager.GetErrorMsg("GiveScore"),
    this.languageManager.GetErrorMsg("CheckAccount")];
    constructor(props: any) {
        super(props);
        this.state = {
            selectedIndex: 0   //当前选择的tab项
        }
    }
    /**
     * tab切换
     * @param index 当前点击的tab的下标
     */
    public tabClick = (index: number): any => {
        this.setState({
            selectedIndex: index
        });

    }
    /**
     * tab对应的组件
     * @param index 当前点击的tab选项
     */
    public renderTabContent = (index: any): any => {
        switch (index) {
            case 0:
                return <BaseInformation />;
            case 1:
                return <ScorerRecord />
            case 2:
                return <CheckAccount />
            default:

                break;
        }
    }
    render() {
        return (
            <div className="hello">                
            <div className={memDetailStyle.tabs}>
                <Tabs tabList={this.tabList} tabClick={this.tabClick} />
            </div>

                <div className={memDetailStyle.content}>
                    {
                        this.renderTabContent(this.state.selectedIndex)
                    }
                </div>

            </div>
        );
    }
}

export default MemberDetail;