/**
 * Object to string 类型参考
 * @type {{ARGS: string, ARRAY: string, BOOL: string, DATE: string, ERROR: string, FUNC: string, GEN: string, MAP: string, NUMBER: string, OBJECT: string, PROMISE: string, REGEXP: string, SET: string, STRING: string, SYMBOL: string, WEAKMAP: string, WEAKSET: string}}
 */
let TYPE_REFERENCES = {
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
    WEAKSET: '[object WeakSet]'
};

let UNIT = {
    KB: 1024,
    MB: 1024 * 1024,
};
/**
 * Q_EXCEED_NUM_LIMIT:文件数超过最大数目
 * Q_EXCEED_SIZE_LIMIT:单个文件大小超过限制
 * Q_TYPE_DENIED:文件类型错误
 * F_EXCEED_SIZE:文件总大小超过限制
 * @const VALIDATE_ERROR_STRING
 * @type {String[]}
 */
let VALIDATE_ERROR_STRING = ['Q_EXCEED_NUM_LIMIT', 'Q_EXCEED_SIZE_LIMIT', 'Q_TYPE_DENIED', 'F_EXCEED_SIZE'];
/**
 * Q_EXCEED_NUM_LIMIT:文件数超过最大数目
 * Q_EXCEED_SIZE_LIMIT:单个文件大小超过限制
 * Q_TYPE_DENIED:文件类型错误
 * F_EXCEED_SIZE:文件总大小超过限制
 * @type {{Q_EXCEED_NUM_LIMIT: number, Q_EXCEED_SIZE_LIMIT: number, Q_TYPE_DENIED: number, F_EXCEED_SIZE: number}}
 */
let VALIDATE_CODE = {
    'Q_EXCEED_NUM_LIMIT': 0,
    'Q_EXCEED_SIZE_LIMIT': 1,
    'Q_TYPE_DENIED': 2,
    'F_EXCEED_SIZE': 3
}

const EMPTY_FUNCTION = function() {};

export {
    TYPE_REFERENCES,
    UNIT,
    VALIDATE_ERROR_STRING,
    VALIDATE_CODE,
    EMPTY_FUNCTION
};
