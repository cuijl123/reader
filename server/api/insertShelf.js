const connect = require('../db')
//时间格式化
let moment = require('moment');

const insertShelf = (req,res)=> {
    let userId = req.body.userId;
    let bookInfo = req.body.bookInfo;
    let formatDate = moment().format('YYYY-MM-DD HH:mm:ss'); /*格式化时间*/

    connect(`insert into bookshelf (userid,createtime,bookid,bookname,author,images,wordcount,type,intro,serialize) values ('${userId}','${formatDate}','${bookInfo.id}','${bookInfo.name}','${bookInfo.author}','${bookInfo.images}','${bookInfo.wordcount}','${bookInfo.type}','${bookInfo.intro}','${bookInfo.serialize}')`,(err,results,feild)=>{
       if(err) throw err;
       if(results.affectedRows === 1){
         res.send({state:'success',msg:'加入成功',data:null})
       }else{  
        res.send({state:'fail',msg:'加入失败',data:null})
       }
    })
}

module.exports = insertShelf