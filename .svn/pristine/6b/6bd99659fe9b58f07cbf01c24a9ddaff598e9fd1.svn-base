import * as React from 'react';

const style = require("./style.css");


export default class InfoItemLabel extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
    }
    /**
     * 渲染label
     * @param MemberSocre 会员分数
     * @param MyScore 我的分数
     */
    public renderLabel = (MemberSocre: number, MyScore: number) => {
        return (
            <div className={style.rowItem}>
                <div className={style.memSoc}>会员分数：{MemberSocre}</div>
                <div className={style.mySoc}>我的分数：{MyScore}</div>
            </div>
        )

    }

    render() {
        let { memberSocre, myScore } = this.props;
        return (
            <div>
                {
                    this.renderLabel(memberSocre, myScore)
                }


            </div>

        );
    }
}

