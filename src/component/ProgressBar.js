/**
 * Created by Godfery on 2016/10/25.
 */
import React, {PropTypes} from 'react';

/**
 * @class Progressbar
 * @description 进度条
 */
const Progressbar = React.createClass({
    prototypes: {
        progress: PropTypes.number,
        show    : PropTypes.bool
    },
    getDefaultProps(){
        return {
            progress: 1,
            show    : true
        };
    },
    render(){
        const {progress, show} = this.props;
        const visibility = show ? 'visible' : 'hidden';
        const wrapStyle = {
            visibility
        }
        const progressbarStyle = {
            width: `${progress}%`
        }
        return (
            <div className="rsuite-upload-progress striped" style={wrapStyle}>
                <div className="rsuite-upload-progressbar" style={progressbarStyle}></div>
            </div>
        );
    }
});

export default Progressbar;
