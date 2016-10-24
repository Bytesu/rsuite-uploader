/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Upload from '../src/main';

const rootElement = document.getElementById('app');

var App = React.createClass({
    render(){
        const option = {
            timeout       : 5e4,
            name          : 'sampleFile',
            multiple      : true,
            baseUrl       : 'http://localhost:3000/upload',
            accept        : [
                {title: 'Images', extensions: 'jpg,jpeg', mimeTypes: 'image/jpeg'},
                {title: 'Images', extensions: 'png', mimeTypes: 'image/png'}
            ],
            formData      : {
                test: 1
            },
            requestHeaders: {
                'Company-Name': 'Hypers'
            },
            uploadSuccess(response, file){
                console.log('SUCCESS', response, file);
            },
            uploadError(error, file){
                console.log('ERROR', error, file);
            },
            uploadFail(response, file){
                console.log('FAIL', response, file);
            }
        };
        return (
            <Upload {...option}>上传文件</Upload>
        );
    }
});

ReactDOM.render(
    <App/>,
    rootElement
);
