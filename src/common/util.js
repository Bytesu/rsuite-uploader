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
     *
     * @param accept
     * @returns {String}
     */
    getAcceptStr(accept) {
        const _mimeTypes = Array.from(new Set(...accept.reduce((_mimeTypes, _A)=> {
            let {mimeTypes = '', extensions = ''} = _A;
            return [..._mimeTypes, mimeTypes];
        }, [])));
        return _mimeTypes.length > 0 ? _mimeTypes.join('.') : '.*';
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
    }
};
