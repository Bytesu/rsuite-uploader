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

export {
    TYPE_REFERENCES
};
