import * as React from 'react';

const style = require("./style.css");

interface State {
    scoreValue: any,
}
export default class InfoItemButton extends React.Component<any, State> {
    constructor(props: any, state: State) {
        super(props);
        this.state = {
            scoreValue: "",
        };
    }
    /**
     * 进取分输入监听
     * @param event 事件对象
    */
    private scoreChange = (event: any): void => {
        let value = event.target.value;
        var hasDot = (value.toString()).indexOf(".");
        if (hasDot != -1) {
            let dotData = value.toString().split(".")[1], intData = value.toString().split(".")[0];
            if (dotData.length > 2) {
                //大于两位 取两位
                dotData = dotData.substring(0, 2);
                value = intData + "." + dotData;

            }
        }
        this.setState({
            scoreValue: value
        });
    }

    /**
     * 渲染行 左侧为label 右侧为button
     * @param label 标签名
     */
    public renderRow = (label: any, scoreValue: any) => {
        return (
            <div className={style.rowItem}>
                <label className={style.inputScore}>
                    {label}:<input type="number" value={this.state.scoreValue} onChange={this.scoreChange} />
                </label>
                <div className={style.changeScore}>
                    <div className={style.addScore} onClick={() => this.props.handler("in", scoreValue)}>进分</div>
                    <div className={style.reduceScore} onClick={() => this.props.handler("out", scoreValue)}>取分</div>
                </div>
            </div>)
    }

    render() {
        let { label } = this.props;
        let { scoreValue } = this.state;
        return (
            <div>
                {
                    this.renderRow(label, scoreValue)
                }


            </div>

        );
    }
};

