# Rsuite Upload
## props
### name
{String} [可选] [默认值：rFile]提交时，文件在formData中的name
### baseUrl
{String} 文件上传的url
### withCredentials
{Boolean} [可选] [默认值：false] 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息
### requestHeaders
{Object} [可选] [默认值: undefined] 请求头
### timeout
{Object} [可选] [默认值:undefined] 超时时间
### disabled
{Boolean} ][可选] [默认值:false] 如果为true，则禁用
### dataType
{String} [可选] [默认值:json] 返回的数据类型 `json`/`string`
### dnd
{Selector} [可选] [默认值：undefined] 指定Drag And Drop拖拽的容器，如果不指定，则不启动。
### disableGlobalDnd
{Selector} [可选] [默认值：false] 是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
### multiple
{Boolean} 是否开启同时选择多个文件能力。
### accept
{Array} [可选] [默认值：null] 指定接受哪些类型的文件。
- title {String} 文字描述
- extensions {String} 允许的文件后缀，不带点，多个用逗号分割。
- mimeTypes {String} 多个用逗号分割。
如：
```javascript
{
    title: 'Images',
    extensions: 'gif,jpg,jpeg,bmp,png',
    mimeTypes:'image/*' //此处请尽量减少使用通配符*否则 可能导致卡顿问题严重
}
```

### autoUpload
{Boolean} [可选] [默认值：false] 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
### threads
{Boolean} [可选] [默认值：3] 上传并发数。允许同时最大上传进程数。
### formData
{Object} [可选] [默认值：{}] 文件上传请求的参数表，每次发送都会发送此对象中的参数。
### fileNumLimit
{int} [可选] [默认值：10] 文件总数量, 超出则不允许加入队列。
### fileSizeLimit
{int} [可选] [默认值：5MB] 验证文件总大小是否超出限制, 超出则不允许加入队列。
### fileSingleSizeLimit
{int} [可选] [默认值：50MB] 验证单个文件大小是否超出限制, 超出则不允许加入队列。
## props(function)
### beforeFileQueued
- file `{File}` 单个对象
- files `{File[]}`数组，内容为此次选中的所有文件
- fileList `{File[]}`数组，内容为整个file队列

> 当文件被加入队列之前触发，此事件的handler返回值为false，则此文件不会被添加进入队列。

### fileQueued
- file `{File}` File对象

> 当文件被加入队列以后触发。

### filesQueued
- files `{File[]}`数组，内容为此次选中的所有文件
- fileList `{File[]}`数组，内容为整个file队列

> 当一批文件添加进队列以后触发。

### fileDeQueued
- gid `文件id` fileId
- file `{File}` File对象
- fileList `{File[]}`数组，内容为整个file队列

> 当文件被移除队列后触发。

### startUpload
> 当开始上传流程时触发。

### stopUpload
> 当开始上传流程停止时触发。

### uploadFinished
> 当所有文件上传结束时触发。

### uploadStart
- file `{File}`File对象

> 某个文件开始上传前触发，一个文件只会触发一次。

### uploadProgress
- file `{File}`File对象
- percentage `{Number}`上传进度

> 上传过程中触发，携带上传进度。

### uploadError
- reason {Object} 错误信息
- file `{File}`File对象

> 当文件上传出错时触发。

### uploadSuccess
- response `{Object}`服务端返回的数据
- file `{File}`File对象

### uploadFail 
- response `{Object}`服务端返回的数据
- file `{File}`File对象

> 当文件上传失败时触发。服务端statusCode>400时

### uploadComplete
- file `{File}` [可选]File对象

> 不管成功或者失败，文件上传完成时触发。

### validateError
- type `{String}`错误类型。

> 当validate不通过时触发。

1. `Q_EXCEED_NUM_LIMIT` 在设置了`fileNumLimit`且尝试给`uploader`添加的文件数量超出这个值时派送。
2. `Q_EXCEED_SIZE_LIMIT` 在设置了`Q_EXCEED_SIZE_LIMIT`且尝试给`uploader`添加的文件总大小超出这个值时派送。
3. `Q_TYPE_DENIED` 当文件类型不满足时触发。
4. `F_EXCEED_SIZE` 当文件大小唱过`fileSizeLimit`设置的大小时派送

