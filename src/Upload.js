/**
 * Created by Godfery on 2016/10/10.
 */
import './less/main.less';

import React, {PropTypes} from 'react';
import classnames from 'classnames';
import util from './common/util';

import UploadButton from './component/UploadButton';
import FilePanelList from './component/FilePanelList';

import {
    UNIT,
    VALIDATE_ERROR_CODE_STRING,
    VALIDATE_ERROR_CODE,
    VALIDATE_CODE,
    EMPTY_FUNCTION,
    FILE_STATUS_CODE,
    UPLOAD_ERROR_CODE,
    UPLOAD_ERROR_CODE_STRING,
    DEFAULT_DATA_TYPE_JSON
} from  './common/constant';

const Upload = React.createClass({
    propTypes: {
        accept: PropTypes.array,
        autoUpload: PropTypes.bool,
        baseUrl: PropTypes.string,
        dataType: PropTypes.string,
        fileNumLimit: PropTypes.number,
        fileSizeLimit: PropTypes.number,
        fileSingleSizeLimit: PropTypes.number,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        name: PropTypes.string,
        timeout: PropTypes.number,
        withCredentials: PropTypes.bool,
        requestHeaders: PropTypes.object,
        beforeFileQueued: PropTypes.func,
        fileQueued: PropTypes.func,
        filesQueued: PropTypes.func,
        fileDeQueued: PropTypes.func,
        validateError: PropTypes.func,
        uploadError: PropTypes.func,
        uploadSuccess: PropTypes.func,
        uploadProgress: PropTypes.func
    },
    getDefaultProps(){
        return {
            autoUpload: true,
            fileNumLimit: 10,
            fileSizeLimit: 50 * UNIT.MB,
            fileSingleSizeLimit: 5 * UNIT.MB,
            name: 'rFile',
            multiple: false,
            disabled: false,
            withCredentials: false,
            dataType: 'json',
            accept: [],
            formData: {},
            beforeFileQueued: EMPTY_FUNCTION,
            fileQueued: EMPTY_FUNCTION,
            filesQueued: EMPTY_FUNCTION,
            fileDeQueued: EMPTY_FUNCTION,
            validateError: EMPTY_FUNCTION,
            uploadError: EMPTY_FUNCTION,
            uploadSuccess: EMPTY_FUNCTION,
            uploadFail: EMPTY_FUNCTION,
            uploadProgress: EMPTY_FUNCTION
        };
    },
    getInitialState(){
        let {fileList = []} = this.props;
        fileList = fileList.map((file)=> {
            file.gid = util.guid();
            return file;
        });
        return {
            fileList,
            disabledUploadBtn: false
        };
    },
    componentWillMount(){
        this._updateProps(this.props);
    },
    componentWillUpdate(nextProps, nextState){
        this._updateProps(nextProps);
    },
    render() {
        return (util.ieInfo() < 0 || util.ieInfo() > 10) ? this.modernUploadRender() : (
            <p>暂不支持远古IE浏览器(IE6,IE7,IE8,IE9)</p>);
    },
    _updateProps (props){
        const {
                  baseUrl,
                  autoUpload,
                  fileNumLimit,
                  fileSizeLimit,
                  fileSingleSizeLimit,
                  name,
                  multiple,
                  disabled,
                  withCredentials,
                  requestHeaders,
                  timeout,
                  dataType,
                  accept,
                  formData,
                  beforeFileQueued,
                  fileQueued,
                  filesQueued,
                  fileDeQueued,
                  validateError,
                  uploadError,
                  uploadSuccess,
                  uploadFail,
                  uploadProgress
              } = props;
        if (!disabled && !baseUrl) {
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
        //返回数据的数据类型
        this.dataType = dataType;
        this.name = name;
        this.multiple = multiple;
        this.disabled = disabled;
        this.accept = accept;
        this.accept.extensionsReg = util.getExtensionsReg(accept);
        this.formData = formData;
        this.timeout = timeout;
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
         * @param file {File} - 当前文件
         * @param fileList {File[]} - 文件列表
         */
        this.fileQueued = fileQueued;
        /**
         * 一批文件加入队列后触发（不管是否成功加入，均触发此方法）
         * @type {EMPTY_FUNCTION}
         * @param files {File[]} - 本次上传的所有文件
         * @param fileList {File[]} - 文件列表
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
        /**
         * 上传过程中触发
         * @type {callback}
         * @param process
         * @param file `{File}` File对象
         */
        this.uploadProgress = uploadProgress;
    },
    /**
     * 文件面板列表点击"x"按钮
     * @param gid - 文件id
     * @param e
     */
    handleRemoveFile(gid, e){
        this.setState({
            fileList: this.state.fileList.filter((file)=> {
                return file.gid !== gid;
            }),
            errorMsg: undefined
        });
    },
    /**
     * 现代浏览器 file input 的change方法
     * @param e
     */
    handleModernFileChange(e){
        let files = e.dataTransfer ? e.dataTransfer.files :
            e.target ? e.target.files : [];
        let fileList = this.state.fileList;
        Array.from(files).forEach((_F)=> {
            if (this.beforeFileQueued(_F, files, fileList) === false) {
                return;
            }
            const validCode = this.validFile(_F, fileList);
            if (validCode > -1) {
                this.validateError({
                    code: VALIDATE_ERROR_CODE[validCode]
                });
                this.setState({
                    errorMsg: VALIDATE_ERROR_CODE_STRING[validCode]
                });
                return;
            }
            _F.status = FILE_STATUS_CODE.INITED;
            _F.gid = util.guid();
            _F.showProgressBar = true;
            fileList.push(_F);
            if (fileList.length === this.fileNumLimit) {
                this.setState({
                    errorMsg: '文件已达最大数量'
                });
            }
            this.fileQueued(_F, fileList);
        });
        this.setState({fileList});
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

        return -1;
    },
    /**
     * 现代浏览器上传方法 （使用XMLHttpRequest）
     */
    modernUpload(){
        var T = this;
        if (!this.state.fileList) {
            return;
        }
        this.state.fileList.forEach(function(file) {
            //formData
            let formData  = new FormData(),
                isTimeout = false,
                timeout   = T.timeout;
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
                    file.status = FILE_STATUS_CODE.ERROR;
                    T.uploadError({
                        code: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.TIMEOUT_ERROR],
                        message: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.TIMEOUT_ERROR]
                    }, file);
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
                    /**
                     * xhr.readyState
                     * 0    UNSENT    代理被创建，但尚未调用 open() 方法。
                     * 1    OPENED    open() 方法已经被调用。
                     * 2    HEADERS_RECEIVED    send() 方法已经被调用，并且头部和状态已经可获得。
                     * 3    LOADING    载入中； responseText 属性已经包含部分数据。
                     * 4    DONE    载入已完成。
                     */
                    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                        let resp = T.dataType === DEFAULT_DATA_TYPE_JSON ? JSON.parse(xhr.responseText) : xhr.responseText;
                        file.status = FILE_STATUS_CODE.COMPLETE;
                        file.progress = 100;
                        T.modifyFileProps(file);
                        T.uploadSuccess(resp, file);
                        //因为动画过度为.6s，所以.6s后再隐藏面板
                        setTimeout(()=> {
                            file.showProgressBar = false;
                            T.modifyFileProps(file);
                        }, 6e2);
                    } else if (xhr.readyState === 4) {
                        //xhr fail
                        let _resp = T.dataType === DEFAULT_DATA_TYPE_JSON ? JSON.parse(xhr.responseText) : xhr.responseText;
                        file.status = FILE_STATUS_CODE.ERROR;
                        T.uploadFail(_resp, file);
                    }
                } catch (e) {
                    //超时的错误 不在这里处理
                    if (!isTimeout) {
                        file.status = FILE_STATUS_CODE.ERROR;
                        T.uploadError({
                            code: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.SERVER_ERROR],
                            message: {
                                statusCode: xhr.status,
                                response: xhr.responseText,
                                error: e
                            }
                        }, file);
                    }
                }
            };

            /**
             * 处理上传过程
             * @type {XMLHttpRequest.upload.onprogress}
             */
            xhr.onprogress = xhr.upload.onprogress = function(e) {
                let percentage = 0;
                if (e.lengthComputable) {
                    percentage = util.floatMul((e.loaded / e.total), 100, 0);
                }
                if (percentage) {
                    file.progress = percentage;
                    T.modifyFileProps(file);
                }
                T.uploadProgress(percentage, file, e);
            };

            /**
             * xhr 出错时处理
             */
            xhr.onerror = function() {
                file.status = FILE_STATUS_CODE.ERROR;
                try {
                    let resp = T.dataType === DEFAULT_DATA_TYPE_JSON ? JSON.parse(xhr.responseText) : xhr.responseText;
                    T.uploadError({
                        type: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ERROR],
                        message: resp
                    }, file);
                } catch (e) {
                    T.uploadError({
                        type: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ERROR],
                        message: {
                            statusCode: xhr.status,
                            response: xhr.responseText,
                            error: e
                        }
                    }, file);
                }
            };

            /**
             * 处理abort
             */
            xhr.onabort = function() {
                file.status = FILE_STATUS_CODE.ERROR;
                T.uploadError({
                    type: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ABORT],
                    message: UPLOAD_ERROR_CODE_STRING[UPLOAD_ERROR_CODE.XHR_ABORT]
                }, file);
            };

            xhr.send(formData);
            file.status = FILE_STATUS_CODE.PROGRESS;
            T.modifyFileProps(file);
        });
        //清空input的值
        this.refs['RSuiteUploadButton'].setValue('');
    },
    /**
     * 修改文件队列
     * @param file
     */
    modifyFileProps(file){
        let {fileList} = this.state;
        fileList = fileList.map((F)=> {
            if (F.gid === file.gid) {
                return file;
            }
            return F;
        });
        this.setState({
            fileList
        });
    },
    /**
     * 现代浏览器HTML5实现 render
     * @return {XML}
     */
    modernUploadRender(){
        const {name, multiple, disabled, state, accept, fileNumLimit} = this;
        const {fileList, errorMsg} = state;
        const filePanelListProps = {
            disabled,
            fileList: fileList.map((file)=> {
                return {file: file};
            })
        };
        const disabledUploadBtn = !(fileList.length < fileNumLimit);
        const wrapCls = classnames('rsuite-upload-wrap modern', {'has-error': errorMsg});
        const errorSpanCls = classnames({
            'help-block': !disabled,
            'error': errorMsg
        });
        return (
            <div className={wrapCls}>
                <UploadButton name={name}
                              multiple={multiple}
                              disabled={disabled || disabledUploadBtn}
                              accept={accept}
                              ref="RSuiteUploadButton"
                              handleChange={this.handleModernFileChange}>
                    {this.props.children}
                </UploadButton>
                <span className={errorSpanCls}>{errorMsg}</span>
                <FilePanelList disabled {...filePanelListProps} handleCancel={this.handleRemoveFile}/>
            </div>
        );
    }
});

export default Upload;
