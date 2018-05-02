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
        this.state = {
            isEdit: false,
            oldValue: this.props.value,
            newValue: ""
        };
    }

    shouldComponentUpdate(nextProps: any, nextState: State) {
        if (this.state.isEdit !== nextState.isEdit) {
            return true
        }
        if (this.state.newValue != nextState.newValue) {
            return true;
        }
        if (nextProps.value !== this.state.oldValue) {
            this.setState({
                oldValue: nextProps.value,
                newValue: ""
            })
            return true;
        }
        return false;
    }

    /**
     * 渲染Input
     */
    public renderInput = () => {
        let { newValue, isEdit, oldValue } = this.state;
        if (isEdit) {
            return (<input type="text" value={newValue} placeholder={oldValue} onChange={
                (event: any) => {
                    this.setState({ newValue: event.target.value })
                }}
            />)
        } else {
            return (<span>&nbsp;{!oldValue ? this.languageManager.GetErrorMsg("No") : oldValue}</span>)
        }
    }

    /**
     * 渲染按钮
     */
    public renderButton = () => {
        let { newValue, isEdit, oldValue } = this.state;
        if (this.props.disable) {
            return null;
        }
        if (isEdit) {
            return (<div className="">
                <span onClick={this.OnConfirm} className={style.butuon}>{this.languageManager.GetErrorMsg("Sure")}</span>
                <span onClick={this.OnCancel} className={style.butuon}>{this.languageManager.GetErrorMsg("Cancle")}</span>
            </div>)
        }
        else {
            return (<div onClick={this.OnClick} className={style.mySoc}><img src={EditImg} /></div>)
        }
    }

    render() {
        let { label } = this.props;
        let { newValue, isEdit, oldValue } = this.state;
        return (
            <div className={style.rowItem}>
                <label className={style.inputScore}>
                    {label}:{
                        this.renderInput()
                    }
                </label>
                {
                    this.renderButton()
                }


            </div>

        );
    }

    /**
     * 启动编辑模式
     */
    public OnClick = () => {
        this.setState({
            isEdit:true
        })
       // this.props.handler();
    
    }

    /**
     * 确认回调
     */
    public OnConfirm = () => {
        this.setState({ isEdit: false });
        if (typeof this.props.handler == "function") {
            this.props.handler(this.state.newValue);
        }
    }

    /**
     * 取消回调
     */
    public OnCancel = () => {
        this.setState({ isEdit: false, newValue: "" });
    }
};

