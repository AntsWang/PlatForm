/**
 * 工具类：Http网络请求类
 * 封装Get,Post方法
 */
// import fetch from './fetch';
import * as config from './Config'
/**
 * Http类接口
 */
interface IHttp {
    Post(url: string, params: any, header: any, successBack: Function, failBack: Function, processBack: Function): void,
    Get(url: string, params: any, header: any, successBack: Function, failBack: Function, processBack: Function): void,
    SetAuthorization(authorization: string): void,
    SetHeader(headers: any): void
}

class FetchData {
    public method: string;
    public headers: any;
    public body: string;
    public mode: string = "cors";
}

/**
 * Http类，
 */
export default class Http implements IHttp {
    private headers = {
        "Accept": "application/json",
        'Content-Type': "application/x-www-form-urlencoded",
        'Access-Control-Allow-Origin': "*",
    };

    /**
     * 请求方法
     * @param method 方法类型
     * @param url 地址
     * @param params 参数
     * @param header header
     * @param successBack 成功回调
     * @param failBack 失败回调
     * @param processBack 进度回调
     */
    private Request(url: string, fecthData: FetchData | any, successBack: Function, failBack: Function, processBack: Function): void {
        this._fetch(fetch(url, fecthData)).then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return response
            } else {
                failBack && failBack(response);
            };
        }, e => {
            failBack && failBack(e);
        }).then((response) => {
            if (response) {
                return response.json()
            }
        }).then((responseJSON: any) => {
            successBack && successBack(responseJSON)
        }).catch(e => {
            failBack && failBack(e);
        });
    }

    /**
     * // 超时版的fetch
     * @param fetch 正常fetch
     * @param timeout 超时时间
     */
    private _fetch(fetch: any, timeout: number = config.TIMEOUT) {
        return Promise.race([
            fetch,
            new Promise(function (resolve, reject) {
                setTimeout(() => reject(-1), timeout);
            })
        ]);
    }

    /**
     * Post方法
     * @param url 地址
     * @param params 参数
     * @param header header键值队数组
     * @param successBack 成功回调
     * @param failBack 失败回调
     * @param processBack 进度回调
     */
    public Post(url: string, params: any = null, header: any = null, successBack: Function, failBack: Function, processBack?: Function) {
        //header处理
        header = Object.assign({}, this.headers, header);
        let paramsArray: Array<any> = [];
        if (params) {
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
        }
        let fecthData: FetchData = new FetchData();
        fecthData.method = "POST";
        fecthData.headers = header;
        fecthData.body = paramsArray.join('&');

        this.Request(url, fecthData, (response: any) => {
            successBack && successBack(response);
        }, (error: Error) => {
            failBack && failBack(error);
        }, (data: any) => {
            processBack && processBack(data);
        })
    }

    /**
     * Get方法
     * @param url 地址
     * @param params 参数
     * @param header header键值队数组
     * @param successBack 成功回调
     * @param failBack 失败回调
     * @param processBack 进度回调
     */
    public Get(url: string, params: any = {}, header: any = null, successBack: Function, failBack: Function, processBack?: Function) {
        //header处理
        header = Object.assign({}, this.headers, header);
        if (params) {
            let paramsArray: Array<any> = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));

            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        let fecthData: FetchData = new FetchData();
        fecthData.method = "GET";
        fecthData.headers = header;

        this.Request(url, fecthData, (response: any) => {
            successBack && successBack(response);
        }, (error: Error) => {
            failBack && failBack(error);
        }, (data: any) => {
            processBack && processBack(data);
        })
    }

    /**
     * 设置权限token
     * @param authorization token值 , 清除时传null
     */
    public SetAuthorization(authorization: string = "") {
        this.headers = Object.assign({}, this.headers, { "Authorization": authorization });
    }

    /**
     * 设置Header,
     * 添加 {"Accept":"application/json"}
     * 删除 {"Accept":null}
     * @param headers header的键值对
     */
    public SetHeader(headers: any) {
        this.headers = Object.assign({}, this.headers, headers);
    }

}
