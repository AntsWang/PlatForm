import * as React from 'react';
import { withRouter } from "react-router-dom";
import Tabs from "../../Components/TabView/TabView";
import BaseInformation from "./BaseInforMation";
import CheckAccount from "./CheckAccount";
import ScorerRecord from "./ChildScoreRecord";

const memDetailStyle = require("./style.css");
class MemberDetail extends React.Component<any, any> {
    //tab 列表
    private tabList: Array<string> = ["基本信息", "进取分记录", "查账"];
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