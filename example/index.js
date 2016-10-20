/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Upload from '../src/main';

const rootElement = document.getElementById('app');

var Form = React.createClass({
    getInitialState: function() {
        return {};
    },
    submitHandle(){

    },
    render(){
        const accept = [{
            title: 'Images',
            extensions: 'jpg,jpeg',
            mimeTypes: 'image/*'
        }, {
            title: 'Images',
            extensions: 'png',
            mimeTypes: 'image/png'
        }];
        const formData = {
            test: 1
        };
        return (
            <form ref='uploadForm'
                  id='uploadForm'
                  method='post'
                  encType="multipart/form-data">
                <Upload
                    name="sampleFile"
                    multiple
                    accept={accept}
                    formData={formData}
                    baseUrl='http://localhost:3000/upload'
                />
                <input type='button' value='Upload!' onClick={this.submitHandle}/>
            </form>
        );
    }
});

ReactDOM.render(
    <Form/>,
    rootElement
);
