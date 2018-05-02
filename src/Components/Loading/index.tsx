import * as React from 'react';
import { Button, Toast } from "react-weui";
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';

interface State {
    showToast: boolean,
    showLoading: boolean,

}
export default class ToastDemo extends React.Component<any, State> {
    private toastTimer: any;
    private loadingTimer: any;
    constructor(props: any, state: State) {
        super(props);
        this.state = {
            showToast: false,
            showLoading: false
        };
    }


    componentWillUnmount() {
        this.toastTimer && clearTimeout(this.toastTimer);
        this.loadingTimer && clearTimeout(this.loadingTimer);
    }

    render() {
        return (
            <div>
                <Button onClick={this.showToast.bind(this)} type="default">Toast</Button>
                <Button onClick={this.showLoading.bind(this)} type="default">Loading</Button>

                <Toast icon="success-no-circle" show={this.state.showToast}>已完成</Toast>
                <Toast icon="loading" show={this.state.showLoading}>加载中...</Toast>
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

};

