import * as React from 'react';
import { Picker } from "react-weui";

import './style.css';

export default class TimePicker extends React.Component<any, any> {
    private minYear: number;
    private maxYear: number;
    private months: Array<any>;
    private currentYear: number;
    private currentMonth: number;
    private currentDay: number;
    constructor(props: any) {
        super(props);
        let selectDate: Date = new Date(this.props.time);
        this.currentYear = selectDate.getFullYear();
        this.currentMonth = selectDate.getMonth() + 1;
        this.currentDay = selectDate.getDay();
        this.minYear = this.currentYear - 2;
        this.maxYear = this.minYear + 4;
        let monthData = this.GetMonths();
        let yearData = this.GetYear(this.currentYear);
        let dayData = this.GetDays(this.currentMonth);
        this.state = {
            picker_show: false,
            picker_value: [yearData.index, this.currentMonth, this.currentDay - 1],
            picker_group: [{ items: yearData.data }, { items: monthData }, { items: dayData }]
        }

        this.Show = this.Show.bind(this);
    }

    public Show = () => {
        this.setState({
            picker_show: true,
        })
    }

    private GetYear = (year: number): any => {
        let list: Array<any> = [];
        let index: number = (this.maxYear - this.minYear) + 1;
        for (let i = this.minYear; i <= this.maxYear; i++) {
            list.push({
                label: `${i}年`,
                value: i
            });
            if (year && i == year) {
                index = i - this.minYear;
            }
        }
        return { index: index, data: list };
    }

    private GetMonths = (): Array<any> => {
        let list: Array<any> = [];
        for (let index = 1; index <= 12; index++) {
            list.push({
                label: `${index}月`,
                value: index
            });
        }
        return list;
    }
    private GetCountDays(year: number, month: number): number {
        var curDate = new Date(year, month, 1);
        /* 获取当前月份 */
        var curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
    }

    private GetDays = (month: number): Array<any> => {
        let list: Array<any> = [];
        let maxDay: number = this.GetCountDays(this.currentYear, this.currentYear)
        for (let index = 1; index <= maxDay; index++) {
            list.push({
                label: `${index}日`,
                value: index
            });
        }
        return list;
    }

    public onChange = (selected: any) => {
        let year: string = ''
        let month: string = ''
        let day: string = ''
        selected.forEach((item: any, i: number) => {
            if (i == 0) {
                year = this.state.picker_group[i]['items'][item].value
            } else if (i == 1) {
                month = this.state.picker_group[i]['items'][item].value
            } else if (i == 2) {
                day = this.state.picker_group[i]['items'][item].value
            }
        })
        let result: string = `${year}/${month}/${day}`;
        this.setState({
            picker_show: false
        })
        this.props.timeHanler(result);
    }

    public onGroupChange = (selected: any) => {
        console.log(selected);
    }

    public OnActions = (selected: any) => {
        console.log(selected);
    }

    render() {
        return (
            <div>
                <Picker onChange={this.onChange}
                    groups={this.state.picker_group}
                    show={this.state.picker_show}
                    onCancel={(e: any) => this.setState({ picker_show: false })}
                    defaultSelect={this.state.picker_value}
                    lang={{ leftBtn: "取消", rightBtn: "确定" }}
                />
            </div>
        )
    }
}