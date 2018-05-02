import * as React from 'react';
import { Button, Toast, Dialog,Picker,CityPicker } from "react-weui";
import 'weui';
import 'react-weui/build/packages/react-weui.css';


interface State {
    showToast: boolean,
    showLoading: boolean,
    showIOS2: boolean,
    style2: any

}
class ToastDemo extends React.Component<any, State> {
    private toastTimer: any;
    private loadingTimer: any;
    constructor(props: any, state: State) {
        super(props);
        this.state = {
            showToast: false,
            showLoading: false,
            showIOS2: false,
            style2: {
                title: 'title',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideDialog.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '确定',
                        onClick: this.hideDialog.bind(this)
                    }
                ]
            }
        };
    }


    componentWillUnmount() {
        this.toastTimer && clearTimeout(this.toastTimer);
        this.loadingTimer && clearTimeout(this.loadingTimer);
    }

    render() {
        return (
            <div>
                <Button onClick={this.showToast.bind(this)} type="default" disabled={false} size="10">Toast</Button>
                <Button onClick={this.showLoading.bind(this)} type="default">Loading</Button>
                <Button type="default" onClick={(e: any) => this.props.showAlert()}>Alert</Button>

                <Toast icon="success-no-circle" show={this.state.showToast}>已完成</Toast>
                <Toast icon="loading" show={this.state.showLoading}>加载中...</Toast>
                <Dialog type="ios" title={this.state.style2.title} buttons={this.state.style2.buttons} show={this.state.showIOS2}>
                    电量不足
                </Dialog>
            </div>

        );
    }

    showToast() {
        this.setState({ showToast: true });

        this.toastTimer = setTimeout(() => {
            this.setState({ showToast: false });
        }, 2000);
    }

    showLoading() {
        this.setState({ showLoading: true });

        this.loadingTimer = setTimeout(() => {
            this.setState({ showLoading: false });
        }, 2000);
    }

    hideDialog() {
        this.setState({
            showIOS2: false,
        });
    }

};

export default ToastDemo

