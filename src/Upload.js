/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';

const Upload = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },
    getDefaultProps(){
        console.log(this.props);
    },
    render() {
        const {name = ''} = this.props;
        return (
            <input type="file" name={name}/>
        );
    }
});

export default Upload;
