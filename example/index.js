/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Upload from '../src/main';
import ProgressPanel from '../src/component/ProgressPanel';

const rootElement = document.getElementById('app');

var App = React.createClass({
    render(){
        const uploadOption = {
            timeout       : 5e3,
            name          : 'sampleFile',
            multiple      : true,
            baseUrl       : '/upload',
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
        const progressPanelOption = {
            file: {
                name: '测试文件.jpg',
                gid : 1111
            },
            handleCancel(gid, e){
                console.log(gid, e);
            }
        }
        return (
            <div>
                <Upload {...uploadOption}>上传文件</Upload>
                <ProgressPanel {...progressPanelOption}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App/>,
    rootElement
);
