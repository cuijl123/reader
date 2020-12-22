const express = require("express");
//获取请求体body
const bodyParse = require('body-parser');
const history = require('connect-history-api-fallback');
const app = express();


//使用body-parser中间件
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))

//指定静态文件夹
app.use('/uploads',express.static('uploads'))


const multer = require('multer')		//express框架上传文件所需要的中间件
const upload = multer({			//multer中间件的使用方法可以看官网
    dest: './uploads/'
})



//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
});


//路由匹配
app.get('/booklist', require('./api/booklist'));//查询所有书
app.get('/type',require('./api/type'))          //按类别查询
app.get('/search',require('./api/search'))      //模糊搜索
app.get('/getCaptcha',require('./api/getCaptcha')) //图片验证码
app.get('/queryPic',require('./api/queryPic')) //查询头像
app.get('/getShelf',require('./api/getShelf')) //获取我的书架
app.get('/getContent',require('./api/getContent')) //获取书的内容
app.get('/getChapter',require('./api/getChapter')) //获取书的章节列表
app.get('/getLately',require('./api/getLately')) //获取阅读记录






app.post('/login',require('./api/login')) //登录
app.post('/register',require('./api/register')) //注册
app.post('/uploadImg',upload.single('avatar'),require('./api/uploadImg')) //上传头像
app.post('/uploadBase64',require('./api/uploadBase64')) //上传base64
app.post('/insertShelf',require('./api/insertShelf')) //加入书架
app.post('/deleteShelf',require('./api/deleteShelf')) //从书架中删除
app.post('/saveLately',require('./api/saveLately')) //保存阅读记录








//解决history路由模式浏览器刷新404问题
app.use(history());

//监听端口
app.listen("8087",()=>{
     console.log("8087端口成功启动...");   
})