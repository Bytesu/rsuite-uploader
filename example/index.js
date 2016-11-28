/**
 * Created by Godfery on 2016/10/10.
 */
import React from 'react';
import {render} from 'react-dom';
import Markdown from  'react-markdown';
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router';

import Uploader from '../src/main';

const rootElement = document.getElementById('app');

const App = React.createClass({
    render(){
        return (
            <div className="container">
                <div className="col-sm-8 col-md-offset-2">
                    <h1>Rsuite Uploader</h1>
                    <hr/>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

const Home = React.createClass({
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
            <div>
                <h2>演示</h2>
                <h3>禁用状态</h3>
                <Uploader disabled={true}>上传文件</Uploader>
                <h4>代码</h4>
                <Markdown source={demo1}/>
                <h3>禁用状态(有文件)</h3>
                <Uploader disabled={true} fileList={fileList}>上传文件</Uploader>
                <h4>代码</h4>
                <Markdown source={demo2}/>
                <h3>启用状态</h3>
                <Uploader {...uploadOption}>上传文件</Uploader>
                <h4>代码</h4>
                <Markdown source={demo3}/>
                <Link to="/document">详细文档</Link>
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
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="document" component={Document}/>
        </Route>
    </Router>
), rootElement);
