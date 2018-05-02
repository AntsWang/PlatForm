/**
 * float浮点数加减乘除法运算工具类
 */
export class Float {
    /**
     * 浮点数加法
     * @param a 
     * @param b 
     */
    static Add(a: number, b: number): number {
        var c: any = void 0,
            d: any = void 0,
            e: any = void 0;
        try {
            c = a.toString().split('.')[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split('.')[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.Mul(a, e) + this.Mul(b, e)) / e;
    }

    /**
     * 浮点数减法
     * @param a 
     * @param b 
     */
    static Sub(a: number, b: number): number {
        var c: any = void 0,
            d: any = void 0,
            e: any = void 0;
        try {
            c = a.toString().split('.')[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split('.')[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.Mul(a, e) - this.Mul(b, e)) / e;
    }

    /**
     * 浮点数乘法
     * @param a 
     * @param b 
     */
    static Mul(a: number, b: number) {
        var c = 0;
        var d = a.toString();
        var e = b.toString();

        try {
            c += d.split('.')[1].length;
        } catch (f) { }
        try {
            c += e.split('.')[1].length;
        } catch (f) { }
        return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
    }


    /**
     * 浮点数除法
     * @param a 
     * @param b 
     */
    static Div(a: number, b: number): number {
        var c: any = void 0,
            d: any = void 0,
            e: number = 0,
            f: number = 0;
        try {
            e = a.toString().split('.')[1].length;
        } catch (g) { }
        try {
            f = b.toString().split('.')[1].length;
        } catch (g) { }
        return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), this.Mul(c / d, Math.pow(10, f - e));
    }
}
