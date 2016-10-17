/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import util from './common/util';

const Upload = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    getDefaultProps(){
        
    },
    handleChange(e){
        console.log(e);
    },
    render() {
        const {name = '', onChange} = this.props;
        return (
            <input type="file" name={name} onChange={this.handleChange}/>
        );
    }
});

export default Upload;
