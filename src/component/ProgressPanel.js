/**
 * Created by Godfery on 2016/10/25.
 */
import React, {PropTypes} from 'react';
import ProgressBar from './ProgressBar';
import FilePanel from './FilePanel';


const ProgressPanel = React.createClass({
    render(){
        return (
            <div>
                <FilePanel gid={file.gid}>{file.name}</FilePanel>
                <ProgressBar progress="90"/>
            </div>
        );
    }
});

export default ProgressPanel;
