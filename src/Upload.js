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
    FILE_STATUS_CODE
} from  './common/constant';

const PT = React.PropTypes;
const updateProps = Symbol('updateProps');
const Upload = React.createClass({
    propTypes: {
        name               : PT.string,
        multiple           : PT.bool,
        accept             : PT.array,
        autoUpload         : PT.bool,
        baseUrl            : PT.string,
        withCredentials    : PT.bool,
        requestHeaders     : PT.object,
        fileNumLimit       : PT.number,
        fileSizeLimit      : PT.number,
        fileSingleSizeLimit: PT.number,
        beforeFileQueued   : PT.func,
        fileQueued         : PT.func,
        filesQueued        : PT.func,
        fileDeQueued       : PT.func,
        validateError      : PT.func
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
                  accept              = [],
                  formData            = {},
                  beforeFileQueued    = EMPTY_FUNCTION,
                  fileQueued          = EMPTY_FUNCTION,
                  filesQueued         = EMPTY_FUNCTION,
                  fileDeQueued        = EMPTY_FUNCTION,
                  validateError       = EMPTY_FUNCTION
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
    },
    /**
     * 现代浏览器 file input 的change方法
     * @param e
     */
    handleModernFileChange(e){
        let files = e.dataTransfer ? e.dataTransfer.files :
            e.target ? e.target.files : [];
        let fileList = [];
        if (!fileList.sizeCount) {
            fileList.sizeCount = 0;
        }
        Array.from(files).forEach((_F)=> {
            if (this.beforeFileQueued(_F, fileList) === false) {
                return;
            }
            const {size, name} = _F;
            const extName = util.getExtName(name);
            /**
             * 验证文件数是否达到上限
             */
            if (fileList.length > this.fileNumLimit) {
                this.validateError({
                    code: VALIDATE_ERROR_STRING[VALIDATE_CODE.Q_EXCEED_NUM_LIMIT]
                });
                return;
            }
            /**
             * 验证文件格式
             */
            if (!this.accept.extensionsReg.test(extName)) {
                this.validateError({
                    code: VALIDATE_ERROR_STRING[VALIDATE_CODE.Q_TYPE_DENIED]
                });
                return;
            }
            /**
             * 验证单个文件大小
             */
            if (size > this.fileSingleSizeLimit) {
                this.validateError({
                    code: VALIDATE_ERROR_STRING[VALIDATE_CODE.Q_EXCEED_SIZE_LIMIT]
                });
                return;
            }
            /**
             * 验证总文件大小
             */
            if (fileList + size > this.fileSizeLimit) {
                this.validateError({
                    code: VALIDATE_ERROR_STRING[VALIDATE_CODE.F_EXCEED_SIZE]
                });
                return;
            }
            _F.status = FILE_STATUS_CODE.INITED;
            _F.gid = util.guid();
            fileList.push(_F);
            fileList.sizeCount += size;
            this.fileQueued(_F);
        });
        this.fileList = fileList;
        this.filesQueued(fileList);
        //如果允许自动上传则调用上传方法
        this.autoUpload && this.modernUpload();
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
            let formData = new FormData();
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
            //跨域是否开启验证信息
            xhr.withCredentials = T.withCredentials;
            xhr.onload = function() {
                if (xhr.status === 200) {
                    console.log('SUCCESS', xhr);
                    return;
                }
                console.log('ERROR', xhr);
            };
            xhr.send(formData);
        });
    },
});
export default Upload;
