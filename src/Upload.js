/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import util from './common/util';
import {
    UNIT,
    VALIDATE_ERROR_STRING,
    VALIDATE_CODE,
    EMPTY_FUNCTION,
    FILE_STATUS_CODE,
    UPLOAD_ERROR_CODE,
    UPLOAD_ERROR_CODE_STRING,
    DEFAULT_DATA_TYPE_JSON
} from  './common/constant';

const PT = React.PropTypes;
const updateProps = Symbol('updateProps');
const Upload = React.createClass({
    propTypes: {
        baseUrl            : PT.string,
        autoUpload         : PT.bool,
        fileNumLimit       : PT.number,
        fileSizeLimit      : PT.number,
        fileSingleSizeLimit: PT.number,
        name               : PT.string,
        timeOut            : PT.number,
        dataType           : PT.string,
        withCredentials    : PT.bool,
        multiple           : PT.bool,
        requestHeaders     : PT.object,
        accept             : PT.array,
        beforeFileQueued   : PT.func,
        fileQueued         : PT.func,
        filesQueued        : PT.func,
        fileDeQueued       : PT.func,
        validateError      : PT.func,
        uploadError        : PT.func,
        uploadSuccess      : PT.func
    },
    getDefaultProps(){
    },
    componentWillMount(){
        this._updateProps(this.props);
    },
    render() {
        return (util.ieInfo() < 0 || util.ieInfo() > 10) ? this.modernUploadRender() : (
            <p>暂不支持远古IE浏览器(IE6,IE7,IE8,IE9)</p>);
    },
    _updateProps(props){
        const {
                  baseUrl,
                  autoUpload          = true,
                  fileNumLimit        = 10,
                  fileSizeLimit       = 50 * UNIT.MB,
                  fileSingleSizeLimit = 5 * UNIT.MB,
                  name                = 'rFile',
                  multiple            = false,
                  withCredentials     = false,
                  requestHeaders,
                  timeOut,
                  dataType            = 'json',
                  accept              = [],
                  formData            = {},
                  beforeFileQueued    = EMPTY_FUNCTION,
                  fileQueued          = EMPTY_FUNCTION,
                  filesQueued         = EMPTY_FUNCTION,
                  fileDeQueued        = EMPTY_FUNCTION,
                  validateError       = EMPTY_FUNCTION,
                  uploadError         = EMPTY_FUNCTION,
                  uploadSuccess       = EMPTY_FUNCTION,
                  uploadFail          = EMPTY_FUNCTION
              }                       = props;
        if (!baseUrl) {
            throw new Error('baseUrl missing in props');
        }
        //上传URL
        this.baseUrl = baseUrl;
        //是否开启验证信息
        this.withCredentials = withCredentials;
        //请求头
        this.requestHeaders = requestHeaders;
        //自动上传
        this.autoUpload = autoUpload;
        //最大文件数
        this.fileNumLimit = fileNumLimit;
        //总文件限制
        this.fileSizeLimit = fileSizeLimit;
        //单个文件限制
        this.fileSingleSizeLimit = fileSingleSizeLimit;
        this.name = name;
        this.multiple = multiple;
        this.accept = accept;
        this.accept.extensionsReg = util.getExtensionsReg(accept);
        this.formData = formData;
        this.timeOut = timeOut;
        /**
         * 文件加入队列前触发如果返回false，则不加入队列
         * @type {EMPTY_FUNCTION}
         * @param file {File} - 当前文件
         * @param fileList {File[]} - 文件列表
         */
        this.beforeFileQueued = beforeFileQueued;
        /**
         * 文件加入队列后触发
         * @type {EMPTY_FUNCTION}
         */
        this.fileQueued = fileQueued;
        /**
         * 一批文件加入队列后触发（不管是否成功加入，均触发此方法）
         * @type {EMPTY_FUNCTION}
         */
        this.filesQueued = filesQueued;
        this.fileDeQueued = fileDeQueued;
        /**
         * 文件验证不通过时触发
         * @param errorCode {VALIDATE_ERROR_STRING} - 错误代码
         */
        this.validateError = validateError;
        /**
         * 上传出错时触发
         * @type {callback}
         */
        this.uploadError = uploadError;
        /**
         * 上传成功触发
         * @type {callback}
         * @param response `{Object}`服务端返回的数据
         * @param file `{File}` File对象
         */
        this.uploadSuccess = uploadSuccess;
        /**
         * 上传失败时触发
         * @type {callback}
         * @param response `{Object}`服务端返回的数据
         * @param file `{File}` File对象
         */
        this.uploadFail = uploadFail;
    },
    /**
     * 现代浏览器 file input 的change方法
     * @param e
     */
    handleModernFileChange(e){
        let files = e.dataTransfer ? e.dataTransfer.files :
            e.target ? e.target.files : [];
        let fileList = this.fileList || [];
        if (!fileList.sizeCount) {
            fileList.sizeCount = 0;
        }
        Array.from(files).forEach((_F)=> {
            if (this.beforeFileQueued(_F, files, fileList) === false) {
                return;
            }
            const validCode = this.validFile(_F, fileList);
            if (validCode > -1) {
                this.validateError({
                    code: VALIDATE_ERROR_STRING[validCode]
                });
                return;
            }
            const {size} = _F;
            _F.status = FILE_STATUS_CODE.INITED;
            _F.gid = util.guid();
            fileList.push(_F);
            fileList.sizeCount += size;
            this.fileQueued(_F);
        });
        this.fileList = fileList;
        //文件全部加入队列后执行的回调
        this.filesQueued(files, fileList);
        //如果允许自动上传则调用上传方法
        this.autoUpload && this.modernUpload();
    },
    /**
     * 验证文件
     * @param file - 单个文件
     * @param fileList - 文件列表
     * @return {VALIDATE_CODE} -1为通过
     */
    validFile(file, fileList){
        const {size, name} = file;
        const extName = util.getExtName(name);
        /**
         * 验证文件数是否达到上限
         */
        if (fileList.length > this.fileNumLimit) {
            return VALIDATE_CODE.Q_EXCEED_NUM_LIMIT;
        }
        /**
         * 验证文件格式
         */
        if (!this.accept.extensionsReg.test(extName)) {
            return VALIDATE_CODE.Q_TYPE_DENIED;

        }
        /**
         * 验证单个文件大小
         */
        if (size > this.fileSingleSizeLimit) {
            return VALIDATE_CODE.Q_EXCEED_SIZE_LIMIT;
        }
        /**
         * 验证总文件大小
         */
        if (fileList + size > this.fileSizeLimit) {
            return VALIDATE_CODE.F_EXCEED_SIZE;
        }

        return -1;
    },
    /**
     * 现代浏览器HTML5实现 render
     * @return {XML}
     */
    modernUploadRender(){
        let acceptStr = util.getAcceptStr(this.accept);
        return (
            <input type="file"
                   name={this.name}
                   multiple={this.multiple}
                   accept={acceptStr}
                   ref="RSuiteUploadFile"
                   onChange={this.handleModernFileChange}/>
        );
    },
    /**
     * 现代浏览器上传方法 （使用XMLHttpRequest）
     */
    modernUpload(){
        var T = this;
        if (!this.fileList) {
            return;
        }
        this.fileList.forEach(function(file) {
            //formData
            let formData  = new FormData(),
                isTimeout = false,
                timeout = T.timeOut;
            //只有 文件状态为初始状态才调用上传方法
            if (file.status !== FILE_STATUS_CODE.INITED) {
                return;
            }
            formData.append(T.name, file, file.name);
            Object.keys(T.formData).forEach((key)=> {
                formData.append(key, T.formData[key]);
            });
            var xhr = new XMLHttpRequest();
            file.xhr = xhr;
            xhr.open('POST', T.baseUrl, true);
            const ResHead = T.requestHeaders;
            ResHead && Object.keys(ResHead).forEach((key)=> {
                xhr.setRequestHeader(key, ResHead[key]);
            });

            //处理超时。用定时器判断超时，xhr state=4 catch的错误无法判断是超时
            if (timeout) {
                xhr.timeout = timeout;
                xhr.ontimeout = function() {
                    T.uploadError({
                        code   : UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.TIMEOUT_ERROR],
                        message: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.TIMEOUT_ERROR]
                    });
                    isTimeout = false;
                };
                setTimeout(function() {
                    isTimeout = true;
                }, timeout);
            }

            //跨域是否开启验证信息
            xhr.withCredentials = T.withCredentials;

            /**
             * readystate 改变时的处理
             * {@link https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange|MDN}
             */
            xhr.onreadystatechange = function() {
                //xhr 完成
                try {
                    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                        let resp = T.dataType === DEFAULT_DATA_TYPE_JSON ? JSON.parse(xhr.responseText) : xhr.responseText;
                        T.uploadSuccess(resp, file);
                    } else if (xhr.readyState === 4) {
                        //xhr fail
                        let _resp = T.dataType === DEFAULT_DATA_TYPE_JSON ? JSON.parse(xhr.responseText) : xhr.responseText;
                        T.uploadFail(_resp, file);
                    }
                } catch (e) {
                    //超时的错误 不在这里处理
                    !isTimeout && T.uploadError({
                        code   : UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.FINISH_ERROR],
                        message: e.message
                    });
                }
            };

            /**
             * xhr 出错时处理
             */
            xhr.onerror = function() {
                try {
                    let resp = T.dataType === DEFAULT_DATA_TYPE_JSON ? JSON.parse(xhr.responseText) : xhr.responseText;
                    T.uploadError({
                        type: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ERROR],
                        message: resp
                    });
                } catch (e) {
                    T.uploadError({
                        type: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ERROR],
                        message: e.message
                    });
                }
            };

            /**
             * 处理abort
             */
            xhr.onabort = function () {
                T.uploadError({
                    type:UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ABORT],
                    message:UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ABORT]
                });
            };

            xhr.send(formData);
        });
    },
});
export default Upload;
