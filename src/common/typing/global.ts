/**
 * 响应格式
 */
export interface IResponse {
  code: number;
  msg: string;
  data: any;
  success?: boolean;
  timestamp?: string;
}
