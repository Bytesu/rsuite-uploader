/**
 * Created by Godfery on 2016/10/14.
 */
import {TYPE_REFERENCES} from './constant';

export default {
    getType: function (obj) {
        return Object.prototype.toString.call(obj);
    },
    isFunction: function (func) {
        return this.getType(func) === TYPE_REFERENCES.FUNC;
    }
}
