import { ErrorCode } from '../Enum/ErrorCode';
/**
 * 返回结果
 */
export class ResponseDto {
    /**
     * 结果
     */
    public Result: ErrorCode;

    /**
     * 数据
     */
    public Data: any;
}
