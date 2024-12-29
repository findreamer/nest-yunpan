export const RESPONSE_SUCCESS_CODE = 200;

export const RESPONSE_SUCCESS_MSG = 'success';

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

export const RESPONSE_CODE_MSG = {
  200: '请求成功',
  404: '请求资源不存在',
  600: '请求参数错误',
  601: '信息已存在',
  500: '服务器异常',
};
