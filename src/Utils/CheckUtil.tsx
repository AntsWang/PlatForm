export class CheckUtil {
    static isArray(arg: any) {
        if (typeof arg === 'object') {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
        return false;
    }
}