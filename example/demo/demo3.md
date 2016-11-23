```javascript
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
<Upload {...uploadOption}>上传文件</Upload>
```
