/**
 * Created by Godfery on 2016/10/24.
 */
import React, {PropTypes} from 'react';
import util from  '../common/util';
import {Button} from 'rsuite';

const UploadButton = React.createClass({
    prototypes: {
        name    : PropTypes.string,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        accept  : PropTypes.array,
        onChange: PropTypes.func
    },
    setValue(value){
        this.refs['RSuiteUploadButton'].value = value;
    },
    handleButtonClick(){
        !this.props.disabled && this.refs['RSuiteUploadButton'].click();
    },
    render(){
        let acceptStr = util.getAcceptStr(this.props.accept);
        const {
                  name,
                  multiple,
                  disabled,
                  handleChange,
                  children
              } = this.props;
        return (
            <div className="rsuite-upload-content">
                <input type="file"
                       name={name}
                       multiple={multiple}
                       disabled={disabled}
                       accept={acceptStr}
                       ref="RSuiteUploadButton"
                       onChange={handleChange}/>
                <Button shape="default"
                        disabled={disabled}
                        onClick={this.handleButtonClick}>
                    {children}
                </Button>
            </div>
        );
    }
});

export default UploadButton;
