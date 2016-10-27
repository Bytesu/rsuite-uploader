/**
 * Created by Godfery on 2016/10/27.
 */
import React, {PropTypes} from 'react';
import ProgressPanel from './ProgressPanel';

/**
 * @class FilePanelList
 * @param {Object} - props
 */
const FilePanelList = React.createClass({
    propTypes: {
        fileList: PropTypes.arrayOf(
            React.PropTypes.shape({
                file: PropTypes.object,
                progress: PropTypes.number,
                showProgressBar: PropTypes.bool
            })
        ),
        disabled: PropTypes.bool,
        handleCancel: PropTypes.func
    },
    getDefaultProps(){
        return {
            fileList: [],
            disabled: false
        };
    },
    render(){
        const {disabled, fileList, handleCancel} = this.props;
        if (disabled && !fileList.length) {
            return (
                <div className="rsuite-upload-file-list">
                    <ProgressPanel none="true"/>
                </div>
            );
        }
        return (
            <div className="rsuite-upload-file-list">
                {
                    fileList.map((fileInfo, index)=> {
                        return <ProgressPanel {...fileInfo}
                                              key={index}
                                              disabled={disabled}
                                              handleCancel={handleCancel}/>;
                    })
                }
            </div>
        );
    }
});

export default  FilePanelList;
