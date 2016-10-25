/**
 * Created by Godfery on 2016/10/25.
 */
import React, {PropTypes} from 'react';

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
        const display = show ? 'block' : 'none';
        const style = {
            width: `${progress}%`,
            display
        }
        return (
            <div className="rsuite-upload-progress striped">
                <div className="rsuite-upload-progressbar" style={style}></div>
            </div>
        );
    }
});

export default Progressbar;
