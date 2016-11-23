/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import {render} from 'react-dom';
import Markdown from  'react-markdown';
import {Router, Route, Link, browserHistory} from 'react-router';

import Upload from '../src/main';

const rootElement = document.getElementById('app');

const App = React.createClass({
    render(){
        const T = this;
        const fileList = [{
            name: '测试文件1.jpg',
            gid: 1111233
        }, {
            name: '测试文件2.jpg',
            gid: 1111
        }];
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
            fileList: fileList,
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
            fileDeQueued(gid, file, files){
                console.log(gid, file, files);
            }
        };
        const demo1 = require('./demo/demo1.md');
        const demo2 = require('./demo/demo2.md');
        const demo3 = require('./demo/demo3.md');
        return (
            <div className="container">
                <div className="col-sm-12">
                    <h2>演示</h2>
                    <h3>禁用状态</h3>
                    <Upload disabled={true}>上传文件</Upload>
                    <h4>代码</h4>
                    <Markdown source={demo1}/>
                    <h3>禁用状态(有文件)</h3>
                    <Upload disabled={true} fileList={fileList}>上传文件</Upload>
                    <h4>代码</h4>
                    <Markdown source={demo2}/>
                    <h3>启用状态</h3>
                    <Upload {...uploadOption}>上传文件</Upload>
                    <h4>代码</h4>
                    <Markdown source={demo3}/>
                    <Link to="/document">详细文档</Link>
                </div>
            </div>
        );
    }
});

const Document = React.createClass({
    render(){
        const docs = require('../docs/api.md');
        return (
            <Markdown source={docs}/>
        );
    }
});

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="document" component={Document}/>
        </Route>
    </Router>
), rootElement);
