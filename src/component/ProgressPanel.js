/**
 * Created by Godfery on 2016/10/25.
 */
import React, {PropTypes} from 'react';
import ProgressBar from './ProgressBar';
import FilePanel from './FilePanel';

const ProgressPanel = React.createClass({
    prototypes: {
        file           : PropTypes.objectOf({
            name: PropTypes.string,
            gid : PropTypes.string
        }),
        progress       : PropTypes.number,
        showProgressBar: PropTypes.bool,
        handleCancel   : PropTypes.func
    },
    getDefaultProps(){
        return {
            progress: 1,
            showProgressBar    : true
        };
    },
    handleCancel(gid, e){
        const {handleCancel}  = this.props;
        handleCancel && handleCancel(gid, e);
    },
    render(){
        const {file, progress, showProgressBar} = this.props;
        return (
            <div className="rsuite-upload-progress-panel">
                <FilePanel gid={file.gid} handleCancel={this.handleCancel}>{file.name}</FilePanel>
                <ProgressBar progress={progress} show={showProgressBar}/>
            </div>
        );
    }
});

export default ProgressPanel;
