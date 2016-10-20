/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import util from './common/util';
import {
    UNIT,
    VALIDATE_ERROR_STRING,
    VALIDATE_CODE,
    EMPTY_FUNCTION
} from  './common/constant';

const PT = React.PropTypes;
const updateProps = Symbol('updateProps');
const Upload = React.createClass({
    propTypes: {
        name: PT.string,
        multiple: PT.bool,
        accept: PT.array,
        autoUpload: PT.bool,
        baseUrl:PT.string,
        fileNumLimit: PT.number,
        fileSizeLimit: PT.number,
        fileSingleSizeLimit: PT.number,
        beforeFileQueued: PT.func,
        fileQueued: PT.func,
        filesQueued: PT.func,
        fileDeQueued: PT.func,
        validateError: PT.func
    },
    getDefaultProps(){

    },
    componentWillMount(){
        // console.log([updateProps]);
        this['_updateProps'](this.props);
    },
    render() {
        return (util.ieInfo() < 0 || util.ieInfo() > 10) ? this.modernUploadRender() : (
            <p>暂不支持远古IE浏览器(IE6,IE7,IE8,IE9)</p>);
    },
    handleFileChange(e){
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
            const {size} = _F;
            if (fileList.length > this.fileNumLimit) {
                this.validateError(VALIDATE_ERROR_STRING[VALIDATE_CODE.Q_EXCEED_NUM_LIMIT]);
                return;
            }
            if (size > this.fileSingleSizeLimit) {
                this.validateError(VALIDATE_ERROR_STRING[VALIDATE_CODE.Q_EXCEED_SIZE_LIMIT]);
                return;
            }
            if (fileList + size > this.fileSizeLimit) {
                this.validateError(VALIDATE_ERROR_STRING[VALIDATE_CODE.F_EXCEED_SIZE]);
                return;
            }
            fileList.push(_F);
            fileList.sizeCount += size;
        });
        this.fileList = fileList;
        this.filesQueued(fileList);
        this.autoUpload && this.modernUpload();
    },
    _updateProps(props){
        const {
            baseUrl,
            autoUpload = true,
            fileNumLimit = 10,
            fileSizeLimit = 500 * UNIT.MB,
            fileSingleSizeLimit = 5 * UNIT.MB,
            name = 'rFile',
            multiple = false,
            accept = [],
            beforeFileQueued = EMPTY_FUNCTION,
            fileQueued = EMPTY_FUNCTION,
            filesQueued = EMPTY_FUNCTION,
            fileDeQueued = EMPTY_FUNCTION,
            validateError = EMPTY_FUNCTION
        } = props;
        if (baseUrl) {
            throw new Error('baseUrl missing in props');
        }
        this.baseUrl = baseUrl;
        this.autoUpload = autoUpload;
        this.fileNumLimit = fileNumLimit;
        this.fileSizeLimit = fileSizeLimit;
        this.fileSingleSizeLimit = fileSingleSizeLimit;
        this.name = name;
        this.multiple = multiple;
        this.accept = accept;
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
                   onChange={this.handleFileChange}/>
        );
    },
    modernUpload(){
        if (!this.files) {
            return;
        }
        //formData
        let formData = new FormData();
    }
});

export default Upload;
