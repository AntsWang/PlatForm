//分割时间
export class Time {
    /**
    * 投注时间分割
    * @param time 时间
    * @param type 类型（0：年月 、1：时间）
    */
    static transform(time: string | Date, type: number): string {
        let getTime: string;
        let Time: string;
        Time = typeof time == "string" ? time : time.toString();
        let betTime: Date = new Date(Time);
        if (type == 0) {
            getTime = betTime.toLocaleDateString();
        }
        if (type == 1) {
            let hour: any = betTime.getHours();
            let minute: any = betTime.getMinutes();
            let second: any = betTime.getSeconds();
            hour = hour < 10 ? "0" + hour : hour;
            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;
            getTime = hour + ":" + minute + ":" + second;
        }
        return getTime;
    }
    /**
     * 获取下一个月
     *
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
     */
    static GetNextMonth(date: Date, day: number) {
        //date.setMonth(date.getMonth() + month);
        let dat = date.getTime() - day * 24 * 60 * 60 * 1000;
        date = new Date(dat)
        let y: number = date.getFullYear();
        let m: number = date.getMonth() + 1;
        let d: number = date.getDate();
        let formatwdate = y + '/' + m + '/' + d;
        return formatwdate;
    }
}