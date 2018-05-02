import * as React from 'react';
import { Toast } from "react-weui";
export enum ToastType {
    Success,
    Loading,
    Wait,
    Error,
    Alert
}
import './style.css';

export default class CompToast extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isShow: false,
            msg: "",
            type: "loading"
        }
    }

    public Show = (msg: string, type: ToastType): void => {
        let typeIcon: string = "";
        let time: number;
        switch (type) {
            case ToastType.Success:
                typeIcon = "success";
                time = 500;
                break;
            case ToastType.Alert:
                typeIcon = "warn";
                time = 1000;
                break;
            case ToastType.Error:
                typeIcon = "warn";
                time = 1000;
                break;
            case ToastType.Loading:
                typeIcon = "loading";
                break;
            case ToastType.Wait:
                typeIcon = "waiting";
                break;
            default:
                typeIcon = "warn";
                break;
        }
        this.setState({
            isShow: true,
            msg: msg,
            type: typeIcon
        }, () => {
            if (type == ToastType.Success || type == ToastType.Alert || type == ToastType.Error) {
                setTimeout(() => {
                    this.setState({
                        isShow: false,
                        msg: "",
                    });
                }, time)
            }
        });
    }

    public Hide = (msg?: string, type?: ToastType): void => {
        this.setState({
            isShow: false,
            msg: ""
        }, () => {
        });
    }

    render() {
        return (
            <Toast icon={this.state.type} show={this.state.isShow}>{this.state.msg}</Toast>
        )
    }
}