/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Upload from '../src/main';

const rootElement = document.getElementById('app');

var Form = React.createClass({
    render(){
        return (
            <form ref='uploadForm'
                  id='uploadForm'
                  action='http://localhost:3000/upload'
                  method='post'
                  encType="multipart/form-data">
                <Upload
                    name="sampleFile"/>
                <input type='submit' value='Upload!'/>
            </form>
        );
    }
});

ReactDOM.render(
    <Form/>,
    rootElement
);
