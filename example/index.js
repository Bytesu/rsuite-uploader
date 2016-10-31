/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import Upload from '../src/main';
import ProgressPanel from '../src/component/ProgressPanel';
import FilePanelList from '../src/component/FilePanelList';

const rootElement = document.getElementById('app');

var App = React.createClass({
    render(){
        const progressPanelOption = {
            file: {
                name: '测试文件.jpg',
                gid: 1111
            },
            handleCancel(gid, e){
                console.log(gid, e);
            }
        };

        const completePanelOption = Object.assign({}, progressPanelOption, {
            file: {
                name: '测试文件.jpg',
                gid: 1111,
                showProgressBar: false
            }
        });

        const readOnlyPanelOption = Object.assign({}, progressPanelOption, {
            disabled: true
        });

        const uploadOption = {
            timeout: 30e3,
            name: 'sampleFile',
            multiple: true,
            fileNumLimit: 3,
            baseUrl: '/upload',
            accept: [
                {
                    title: 'Images',
                    extensions: 'jpg,jpeg',
                    mimeTypes: 'image/jpeg'
                },
                {
                    title: 'Images',
                    extensions: 'png',
                    mimeTypes: 'image/png'
                }
            ],
            formData: {
                test: 1
            },
            requestHeaders: {
                'Company-Name': 'Hypers'
            },
            fileList: [{
                name: '测试文件1.jpg',
                gid: 1111233
            },{
                name: '测试文件2.jpg',
                gid: 1111
            }],
            validateError(e){
                console.log(e);
            },
            uploadSuccess(response, file){
                console.log('SUCCESS', response, file);
            },
            uploadError(error, file){
                console.log('ERROR', error, file);
            },
            uploadFail(response, file){
                console.log('FAIL', response, file);
            },
            fileDeQueued(a,b){
                console.log(a,b);
            }
        };
        const FilePabelListOption = {
            fileList: [progressPanelOption, completePanelOption],
            handleCancel(gid, e){
                console.log(gid, e);
            }
        };

        return (
            <div>
                <Upload disabled={true}>上传文件</Upload>
                <br/>
                <Upload {...uploadOption}>上传文件</Upload>

                <FilePanelList fileList={[]} disabled={true}/>
                <FilePanelList {...FilePabelListOption}/>
            </div>
        );
    }
});

ReactDOM.render(
    <App/>,
    rootElement
);
