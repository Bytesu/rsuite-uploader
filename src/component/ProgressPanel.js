/**
 * Created by Godfery on 2016/10/25.
 */
import React, {PropTypes} from 'react';
import ProgressBar from './ProgressBar';
import FilePanel from './FilePanel';

/**
 * @class ProgressPanel
 * @description 进度面板（含进度条和文件面板）
 */
const ProgressPanel = React.createClass({
    prototypes: {
        file: PropTypes.objectOf({
            name: PropTypes.string,
            gid: PropTypes.string,
            progress: PropTypes.number,
            showProgressBar: PropTypes.bool
        }),
        disabled: PropTypes.bool,
        none: PropTypes.bool,
        handleCancel: PropTypes.func
    },
    getDefaultProps(){
        return {
            disabled: false,
            none: false
        };
    },
    handleCancel(gid, e){
        const {handleCancel}  = this.props;
        handleCancel && handleCancel(gid, e);
    },
    render(){
        const {file = {}, disabled, none} = this.props;
        const {progress = 1, showProgressBar = true} = file;
        if (none) {
            return (
                <div className="rsuite-upload-progress-panel none">
                    无文件
                </div>
            );
        }
        return (
            <div className="rsuite-upload-progress-panel">
                <FilePanel gid={file.gid} handleCancel={this.handleCancel}
                           cancelBtn={!disabled}>{file.name}</FilePanel>
                <ProgressBar progress={progress} show={!disabled && showProgressBar}/>
            </div>
        );
    }
});

export default ProgressPanel;
