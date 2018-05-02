import * as React from 'react';
import { withRouter } from "react-router-dom";
import { HocAlert } from "../../Components/Alert/HOCAlert";
import LanguageManager from '../../Language/LanguageManager';

const style = require("./style.css");
const EditImg = require("../../Image/edit.png");

class InfoItemInput extends React.Component<any, any> {
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any, state: any) {
        super(props);
        this.state = {
            isEdit: false,
            value: this.props.value,

        };
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState({
            value: nextProps.value
        })
    }
    /**
     * 输入框校验
     */
    public TextChange = (event: any) => {
        this.setState({ value: event.target.value })
    }
    /**
     * 渲染Input
     */
    public renderInput = () => {
        let { isEdit, value } = this.state;
        if (isEdit) {
            return (<input type="text" placeholder={value} onChange={this.TextChange}
            />)
        } else {
            return (<span>&nbsp;{!value ? this.languageManager.GetErrorMsg("No") :value}</span>)
        }
    }

    /**
     * 渲染按钮
     */
    public renderButton = () => {
        let { isEdit, value } = this.state;
        if (this.props.disable) {
            return null;
        }
        if (isEdit) {
            return (<div className="">
                <span onClick={this.OnConfirm} className={style.butuon}>{this.languageManager.GetErrorMsg("Sure")}</span>
                <span onClick={this.OnCancel} className={style.butuon}>{this.languageManager.GetErrorMsg("Cancle")}</span>
            </div>)
        }
        else if (value == "") {
            return (<div onClick={this.OnClick} className={style.mySoc}><img src={EditImg} /></div>)
        }
    }

    render() {
        let { label } = this.props;
        let { isEdit, value } = this.state;
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
     * 询问
     */
    public OnClick = () => {
        this.props.showAlert({
            title: this.languageManager.GetErrorMsg("Warning"), content: this.languageManager.GetErrorMsg("SetOnlyOnce"), buttons: [
                {
                    type: 'default',
                    label: this.languageManager.GetErrorMsg("Cancle"),
                    onClick: this.props.hideAlert
                },
                {
                    type: 'primary',
                    label: this.languageManager.GetErrorMsg("Sure"),
                    onClick: this.Edit
                }
            ],
        });

    }
    /**
     * 启用编辑模式
     */
    public Edit = () => {
        this.props.hideAlert();
        this.setState({ isEdit: true });
    }
    /**
     * 确认回调
     */
    public OnConfirm = () => {
        this.setState({ isEdit: false });
        if (typeof this.props.handler == "function") {
            this.props.handler(this.state.value);
        }
    }

    /**
     * 取消回调
     */
    public OnCancel = () => {
        this.setState({ isEdit: false, value: "" });
    }
};

export default withRouter(HocAlert(InfoItemInput));

