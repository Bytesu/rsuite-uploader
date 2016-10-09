/**
 * Created by Godfery on 2016/10/9.
 */
var express = require('express');
var fileUpload = require('express-fileupload');
var path = require('path');
var util = require('util');
var fs = require('fs');
var uuid = require('uuid');
var app = express();

mkdirs('cache');

app.use(fileUpload());

app.post('/upload', function(req, res) {
    var sampleFile, tempFileName;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;
    tempFileName = [uuid.v1(), path.extname(sampleFile.name)].join('');
    sampleFile.mv(path.resolve('cache', tempFileName), function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.send('File uploaded!');
    });
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
/**
 * 创建文件夹
 * @param dirpath - 文件路径
 * @param callback - 回调
 */
function mkdirs(dirpath, callback) {
    dirpath = path.normalize(dirpath);
    fs.exists(dirpath, (exists)=> {
        if (exists) {
            util.isFunction(callback) && callback(dirpath);
        } else {
            mkdirs(path.dirname(dirpath), ()=> {
                fs.mkdir(dirpath, callback);
            });
        }
    });
}
