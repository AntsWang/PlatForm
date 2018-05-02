import * as React from 'react';

import { Switch } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';

const style = require("./style.css");


export default class InfoItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    /**
     * 渲染SwitchButton行
     * @param label 标签名
     * @param trueText switchButton开启时显示的文字
     * @param falseText switchButton关闭时显示的文字
     * @param memberClosed 会员状态关闭 true-关闭 false-开启
     * @param agent 是否是代理 true-是 false-不是
     */
    public renderCheckBox = (label: any, trueText: any, falseText: any, memberClosed: boolean, agent: boolean) => {
        return (
            <div className={style.state}>
                <div className={style.memSoc}>{label}:{memberClosed ? falseText : trueText}</div>
                {
                    agent ? null : (<div onClick={() => this.props.handler()} className={style.mySoc}><Switch checked={memberClosed ? false : true} onChange={() => { }} /></div>)
                }

            </div>
        )

    }

    render() {
        let { label, trueText, falseText, memberClosed, agent } = this.props;
        return (
            <div>
                {
                    this.renderCheckBox(label, trueText, falseText, memberClosed, agent)
                }


            </div>

        );
    }
}

