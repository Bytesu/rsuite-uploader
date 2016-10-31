/**
 * Object to string 类型参考
 * @type {{ARGS: string, ARRAY: string, BOOL: string, DATE: string, ERROR: string, FUNC: string, GEN: string, MAP: string, NUMBER: string, OBJECT: string, PROMISE: string, REGEXP: string, SET: string, STRING: string, SYMBOL: string, WEAKMAP: string, WEAKSET: string}}
 */
export const TYPE_REFERENCES = {
    ARGS: '[object Arguments]',
    ARRAY: '[object Array]',
    BOOL: '[object Boolean]',
    DATE: '[object Date]',
    ERROR: '[object Error]',
    FUNC: '[object Function]',
    GEN: '[object GeneratorFunction]',
    MAP: '[object Map]',
    NUMBER: '[object Number]',
    OBJECT: '[object Object]',
    PROMISE: '[object Promise]',
    REGEXP: '[object RegExp]',
    SET: '[object Set]',
    STRING: '[object String]',
    SYMBOL: '[object Symbol]',
    WEAKMAP: '[object WeakMap]',
    WEAKSET: '[object WeakSet]',
    NULL: '[object Null]'
};

/**
 * 单位
 * @type {{KB: number, MB: number}}
 */
export const KB = 1024;
export const MB = 1024 * KB;
export const UNIT = {
    KB: KB,
    MB: MB,
};
/**
 * Q_EXCEED_NUM_LIMIT:文件数超过最大数目
 * Q_EXCEED_SIZE_LIMIT:单个文件大小超过限制
 * Q_TYPE_DENIED:文件类型错误
 * F_EXCEED_SIZE:文件总大小超过限制
 * @const VALIDATE_ERROR_STRING
 * @type {String[]}
 */
export const VALIDATE_ERROR_CODE = ['Q_EXCEED_NUM_LIMIT', 'Q_EXCEED_SIZE_LIMIT', 'Q_TYPE_DENIED'];
export const VALIDATE_ERROR_CODE_STRING = ['文件数超过最大数目', '单个文件大小超过限制', '文件类型错误'];
/**
 * Q_EXCEED_NUM_LIMIT: 0 文件数超过最大数目
 * Q_EXCEED_SIZE_LIMIT: 1 单个文件大小超过限制
 * Q_TYPE_DENIED: 2 文件类型错误
 * F_EXCEED_SIZE: 3 文件总大小超过限制
 * @constant VALIDATE_CODE
 * @type {{Q_EXCEED_NUM_LIMIT: number, Q_EXCEED_SIZE_LIMIT: number, Q_TYPE_DENIED: number, F_EXCEED_SIZE: number}}
 */
export const VALIDATE_CODE = {
    'Q_EXCEED_NUM_LIMIT': 0,
    'Q_EXCEED_SIZE_LIMIT': 1,
    'Q_TYPE_DENIED': 2,
    'F_EXCEED_SIZE': 3
};

/**
 * 文件状态值，具体包括以下几种类型：
 * `inited` 初始状态
 * `progress` 上传中
 * `complete` 上传完成。
 * `error` 上传出错，可重试
 * @property {Object} Status
 * @const FILE_STATUS_CODE
 * @static
 */
export const FILE_STATUS_CODE = {
    INITED: 'INITED',    // 初始状态
    PROGRESS: 'PROGRESS',    // 上传中
    ERROR: 'ERROR',    // 上传出错
    COMPLETE: 'COMPLETE'    // 上传完成
};
export const FILE_STATUS_STRING = {
    INITED: '初始状态',
    PROGRESS: '上传中',
    ERROR: '上传出错',
    COMPLETE: '上传完成'
};

/**
 * TIMEOUT_ERROR: 超时
 * SERVER_ERROR: 服务端错误
 * XHR_ERROR: XHR错误
 * XHR_ABORT: 3 XHR中断
 * @const {UPLOAD_ERROR_CODE_STRING}
 * @type {string[]}
 */
export const UPLOAD_ERROR_CODE_STRING = ['TIMEOUT_ERROR', 'SERVER_ERROR', 'XHR_ERROR', 'XHR_ABORT'];
export const UPLOAD_ERROR_STRING = ['上传超时', '服务器异常', '上传错误', '上传被终止'];
/**
 *
 * TIMEOUT_ERROR: 0 超时
 * SERVER_ERROR: 1 服务端错误
 * XHR_ERROR: 2 XHR错误
 * XHR_ABORT: 3 XHR中断
 * @const {UPLOAD_ERROR_CODE}
 * @type {{TIMEOUT_ERROR: number, SERVER_ERROR: number, XHR_ERROR: number, XHR_ABORT: number}}
 */
export const UPLOAD_ERROR_CODE = {
    TIMEOUT_ERROR: 0,
    SERVER_ERROR: 1,
    XHR_ERROR: 2,
    XHR_ABORT: 3
};

/**
 * 空方法
 * @constructor
 */
export const EMPTY_FUNCTION = function() {};

/**
 * 默认数据类型 json
 * @type {string}
 */
export const DEFAULT_DATA_TYPE_JSON = 'json';
