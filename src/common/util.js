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
    getType: function (obj) {
        return Object.prototype.toString.call(obj);
    },
    /**
     * 判断func是否为FUNCTION
     * @param func
     * @returns {boolean}
     */
    isFunction: function (func) {
        return this.getType(func) === TYPE_REFERENCES.FUNC;
    },
    /**
     *
     * @param accept
     * @returns {String}
     */
    getAcceptStr:function(accept) {
        let _extensions=[],_mimeTypes=[];
        accept.forEach((_A)=>{
            const {extensions='',mimeTypes=''}=_A;
            _extensions = [..._extensions,extensions.split(',').map((str)=>`.${str}`)];
            _mimeTypes =[..._mimeTypes,mimeTypes];
        });
        return Array.from(new Set([..._extensions,..._mimeTypes])).join(',');
    }
}
