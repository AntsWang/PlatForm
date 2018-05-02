import * as React from "react"
const tabStyle = require("./TabView.css");

interface Props {
    tabList: any[];
    tabClick(index: number): void;
    selectedIndex?:number;
}
class TabsControl extends React.Component<Props, any>{
    private list: string[] = new Array();
    private content: string[] = new Array();
    constructor(props: Props) {
        super(props)
        this.state = {
            currentIndex: this.props.selectedIndex?this.props.selectedIndex:0
        }
        this.list = this.props.tabList;
    }
    private tabClick = (index: any): void => {
        this.props.tabClick(index);
    }
    private check_title_index = (index: number): any => {

        return index === this.state.currentIndex ? tabStyle.active : tabStyle.tab_title;

    }

    render() {
        return (
            <div className={tabStyle.tab_title_wrap}>
                {
                    this.list.map((item: any, index: any) => {
                        return (
                            <div key={index} onClick={() => { this.tabClick(index); this.setState({ currentIndex: index }) }} className={this.check_title_index(index)}>{item}</div>
                        )
                    })
                }
            </div>
        )
    }
}

export default TabsControl