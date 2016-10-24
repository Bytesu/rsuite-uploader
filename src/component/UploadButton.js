/**
 * Created by Godfery on 2016/10/24.
 */
import React from 'react';
import util from  '../common/util';
import {Button} from 'rsuite';

const PT = React.PropTypes;

const UploadButton = React.createClass({
    prototypes: {
        name    : PT.string,
        multiple: PT.bool,
        disabled: PT.bool,
        accept  : PT.array,
        onChange: PT.func
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
