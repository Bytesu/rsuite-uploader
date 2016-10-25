/**
 * Created by Godfery on 2016/10/25.
 */
import React, {PropTypes} from 'react';
import util from '../common/util';
const FilePanel = React.createClass({
    prototypes: {
        gid         : PropTypes.string,
        handleCancel: PropTypes.func
    },
    getInitialState(){
        const {gid} = this.props;
        return {
            gid,
        };
    },
    handleClick(e){
        const {gid, handleCancel} = this.props;
        handleCancel && handleCancel(gid, e);
    },
    render(){
        const {children} = this.props;
        return (
            <div className="rsuite-upload-file-panel">
                <div className="rsuite-upload-file-info">
                    {children}
                </div>
                <a className="rsuite-upload-file-cancel"
                   href="javascript:;"
                   onClick={this.handleClick}>
                    <i className="icon icon-close"></i>
                </a>
            </div>
        );
    }
});
export default FilePanel;
