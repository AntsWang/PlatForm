import * as React from 'react';
import LanguageManager from '../../Language/LanguageManager';

const style = require("./style.css");


export default class InfoItemLabel extends React.PureComponent<any, any> {
    private languageManager: LanguageManager = new LanguageManager();
    constructor(props: any) {
        super(props);
    }
    /**
     * 渲染label
     * @param MemberSocre 会员分数
     * @param MyScore 我的分数
     */
    public renderLabel = ( MyScore: number) => {
        return (
            <div className={style.rowItem}>
                <div className={style.memSoc}>{this.languageManager.GetErrorMsg("MyScore")}:&nbsp;{MyScore}</div>
            </div>
        )

    }

    render() {
        let { memberSocre, myScore, nickName } = this.props;
        return (
            <div>
                {
                    this.renderLabel(myScore)
                }


            </div>

        );
    }
}

