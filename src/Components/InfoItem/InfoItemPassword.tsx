import * as React from 'react';
import LanguageManager from '../../Language/LanguageManager';

const style = require("./style.css");
const EditImg = require("../../Image/edit.png");

interface State {
    isEdit: boolean,
    oldValue: any,
    newValue: any
}
export default class InfoItemInput extends React.Component<any, State> {
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any, state: State) {
        super(props);
    }
    /**
     * 渲染按钮
     */
    public renderButton = () => {
        return (<div onClick={this.OnClick} className={style.mySoc}><img src={EditImg} /></div>)
    }
    render() {
        let { label, value, disable } = this.props;
        return (
            <div className={style.rowItem}>
                <label className={style.inputScore}>
                    {label}:&nbsp;{value}
                </label>
                {
                    disable == "" ? null : this.renderButton()
                }


            </div>

        );
    }

    /**
     * 启动编辑模式
     */
    public OnClick = () => {
        this.props.handler();

    }
};

