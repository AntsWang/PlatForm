import * as React from 'react';
import Routes from "./Route";
import "./Style/reset.css";
import "./Style/base.css";
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import LanguageManager from './Language/LanguageManager';
import Promotion from "./Page/Promotion";
export default class App extends React.Component<any, any> {
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any) {
        super(props);
    }
    componentWillMount() {
        document.title = this.languageManager.GetErrorMsg("Plat");
    }
    componentDidMount() {

    }
    /**
     * 分享回调
     * @param status 分享结果类型 1.分享成功 0.取消分享 -1.分享失败
     */
    public WeChatShareHandler(status: number): void {
    };
    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Routes />
            </div>

        );
    }
}