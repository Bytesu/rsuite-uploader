/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import util from './common/util';

const Upload = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        multiple:React.PropTypes.bool,
        accept:React.PropTypes.array
    },
    getDefaultProps(){

    },
    handleChange(e){

    },
    render() {
        const {name = '',multiple=false,accept=[]} = this.props;
        let acceptStr = util.getAcceptStr(accept);
        return (
            <input type="file"
                   name={name}
                   multiple={multiple}
                   accept={acceptStr}
                   onChange={this.handleChange} />
        );
    }
});

export default Upload;
