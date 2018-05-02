import * as React from 'react';
import { Dialog } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';
const style = require("./HocAlert.css");
interface IOption {
    title?: string,   //标题
    content?: any,    //内容
    buttons?: {}[]    //按钮
}
/**
 * alert高阶组件
 * @param ComposedComponent 组件
 * @param option  参数
 */
export const HocAlert = (ComposedComponent: any, option?: IOption) => class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showAlert: false,
            title: "提示",
            content: "内容区域",
            buttons: [
                {
                    type: 'default',
                    label: '取消',
                    onClick: this.hide
                },
                {
                    type: 'primary',
                    label: '确定',
                    onClick: this.hide
                }
            ],
            ...option
        }
    }
    /**
     * 显示alert
     * @param params 接口IOption类型
     */
    show = (params: any) => {
        let newState = Object.assign({}, this.state, params, { showAlert: true })
        this.setState(
            newState
        );
    }
    /**
     * 隐藏alert
     * @param params 接口IOption类型
     */
    hide = (params: any) => {
        let newState = Object.assign({}, this.state, params, { showAlert: false })
        this.setState({
            showAlert: false
        });
    }
    render() {
        let newProps = {
            showAlert: this.show,
            hideAlert: this.hide
        }
        return (
            <div>
                <Dialog type="ios" title={this.state.title} buttons={this.state.buttons} show={this.state.showAlert}>
                    {this.state.content}
                </Dialog>
                <ComposedComponent {...this.props} {...newProps} />
            </div>

        )
    }
};