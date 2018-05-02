import * as React from 'react';
import {
    Link,
    Prompt
} from 'react-router-dom';

import { BetPosType } from "../../Enum/BetPosType";
import Money from '../../Utils/Money';
const styles = require("./style.css");
const pokeColor0 = require("../../Image/spades.png"); //黑桃
const pokeColor1 = require("../../Image/hearts.png");  //红心
const pokeColor2 = require("../../Image/flower.png");  //梅花
const pokeColor3 = require("../../Image/square.png");//方块
enum numberToPoke{
  "A" = 1,
  "J" = 11,
  "Q" = 12,
  "K" = 13
}
export default class Home extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            GameData: []
        }
    }
    componentWillReceiveProps(nextProps: any) {
        if (nextProps.detail !== this.props.detail) {
            return true;
        }
        return false;
    }
    /**
     * 数字转换为扑克
     * @param number 数字 1-52
     */
    renderPoke = (number: number) => {
        //计算对应扑克数字
        let pokeNumber:any = (number - 1) % 13 + 1;
         if(pokeNumber==1 || 11<=pokeNumber){
            pokeNumber = numberToPoke[pokeNumber]
         }
        //计算花色
        let pokeColor = Math.floor((number - 1) / 13);
        let img = "";
        switch (pokeColor) {
            case 0:
                img = pokeColor0; //黑桃
                break;
            case 1:
                img = pokeColor1; //红心
                break;
            case 2:
                img = pokeColor2; //梅花
                break;
            case 3:
                img = pokeColor3; //方块
                break;
        }

        return (
            <div>
                <img src={img} />
                {pokeNumber}
            </div>
        )

    }
    /**
     * 渲染投注位置，赔率等信息
     * @param item 遍历到的单条信息
     * @param index 遍历索引
     */
    private rederDetail = (item: any[], index: number) => {
        return <div key={index}>
            {
                item.map((items: any, indexs: number) => {
                    return (
                        <div key={indexs} className={styles.rowItem}>
                            <div className={styles.betPos}>{BetPosType[items.BetPos]}</div>
                            <div className={styles.odds}>{items.Odds}</div>
                            <div className={styles.amount}>{items.Amount}</div>
                        </div>
                    )
                })
            }
        </div>



    }
    render() {
        let { BetTime, GameName, BetAmount, PayAmount, Total, GameData, RoundId } = this.props.location.state.detail;
        let payAmount = this.props.location.state.payAmount;
        GameData = JSON.parse(GameData);
        //删除最后一条数据
        let gameResult = JSON.parse(GameData.pop().Data).Cards;
        return (
            <div className={styles.content}>
                <h3>游戏详情</h3>
                <div className={styles.time}>游戏时间：{BetTime}</div>
                <div className={styles.time}>游戏名称：{GameName}</div>
                <div className={styles.time}>游戏局号：{RoundId}</div>
                <div className={styles.time}>投注分数：{Money.Format(BetAmount)}</div>
                <div className={styles.time}>赔付分数：{Money.Format(payAmount)}</div>
                <div className={styles.result}>游戏结果：
                    <div>
                        {this.renderPoke(gameResult.FirstCard)}
                    </div>
                    <div>
                        {this.renderPoke(gameResult.ThirdCard)}
                    </div>
                    <div>
                        {this.renderPoke(gameResult.SecondCard)}
                    </div>

                </div>

                <div className={styles.rowItem}>
                    <div className={styles.betPos}>投注位置</div>
                    <div className={styles.odds}>赔率</div>
                    <div className={styles.amount}>投注金额</div>
                </div>
                <div>
                    {
                        GameData.map((item: any, index: any) => {
                            return this.rederDetail(JSON.parse(item.Data), index);
                        })
                    }
                    <div>{}</div>
                </div>
            </div>
        );
    }
}