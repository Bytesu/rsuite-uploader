/**
 * Created by Godfery on 2016/10/14.
 */
import {TYPE_REFERENCES} from './constant';
export default {
    /**
     * 返回obj的类型
     * @param obj
     * @returns {*}
     */
    getType(obj) {
        return Object.prototype.toString.call(obj);
    },
    /**
     * 判断func是否为FUNCTION
     * @param func
     * @returns {boolean}
     */
    isFunction(func) {
        return this.getType(func) === TYPE_REFERENCES.FUNC;
    },
    /**
     * 判断obj是否为null
     * @param obj
     * @return {boolean}
     */
    isNull(obj){
        return this.getType(obj) === TYPE_REFERENCES.NULL;
    },
    /**
     *
     * @param accept
     * @returns {String}
     */
    getAcceptStr(accept = []) {
        const _mimeTypes = Array.from(new Set(accept.reduce((_mimeTypes, _A)=> {
            let {mimeTypes = ''} = _A;
            return [..._mimeTypes, mimeTypes];
        }, [])));
        return _mimeTypes.length > 0 ? _mimeTypes.join(',') : '*.*';
    },
    /**
     * 获取文件类型正则
     * @param accept
     * @return {RegExp}
     */
    getExtensionsReg(accept = []){
        let _extensions = Array.from(new Set(accept.reduce((_extensions, _A)=> {
            let {extensions = ''} = _A;
            return [..._extensions, ...extensions.split(',')];
        }, [])));
        _extensions = _extensions.length > 0 ? _extensions.join('|').replace(/\*/g, '.*') : '.*';
        return new RegExp(_extensions, 'i');
    },
    /**
     * 获取ie版本 如果不是ie则返回-1
     * @return {Number}
     */
    ieInfo(){
        const userAgent = navigator.userAgent;
        const version = userAgent.indexOf('MSIE');
        if (version < 0) {
            return -1;
        }
        return parseFloat(userAgent.substring(version + 5, userAgent.indexOf(';', version)));
    },
    /**
     * 生成一个定长的随机字符串
     * @param num [8] - 长度
     * @return {string}
     */
    guid(num = 8){
        return (Math.random() * 1E18).toString(36).slice(0, num).toUpperCase();
    },
    /**
     * 获取文件名的后缀 （不含.）
     * @param {String} fileName - 文件名
     * @return {String}
     */
    getExtName(fileName) {
        return fileName.split('.').pop();
    },
    /**
     * 转换成10进制
     * @param arg
     * @param [num=2] - 保留几位小数
     * @return {*}
     */
    toDecimal(arg, num = 2) {

        if (this.isNull(arg) || arg === undefined || arg === '--') {
            return '--';
        }

        if (!arg || arg === '--') {
            return '0.00';
        }
        try {
            arg = arg.toFixed(num);
        } catch (e) {
            return arg;
        }

        return arg;
    },
    /**
     * 两数相乘（保留两位小数）
     * @param arg1
     * @param arg2
     * @param [precision=2] - 精度
     * @param [sign=] - 后缀
     * @return {*}
     */
    floatMul(arg1, arg2, precision = 2, sign = '') {
        if (this.isNull(arg1)) {
            return '--';
        }

        if (!arg1 || !arg2) {
            return `0.${Array(precision + 1).join(0)}`;
        }

        var m  = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();

        try {
            m += s1.split('.')[1].length;
        } catch (e) {}
        try {
            m += s2.split('.')[1].length;
        } catch (e) {}

        var n = Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
        return this.toDecimal(n, precision) + sign;

    }
};
