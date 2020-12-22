const connect = require('../db')

const saveLately = (req,res)=> {
    let userId = req.body.userId;
    let bookId = req.body.bookId;
    let chapter = req.body.chapter;
    
    connect(`select * from lately_read where userid='${userId}' and book_id='${bookId}'`,(err,results,feild)=>{
       if(err) throw err;
       if(results.length > 0){ //更新
        connect(`update lately_read set chapter='${chapter}' where userid='${userId}' and book_id='${bookId}'`,(err,results,feild)=>{
            if(err) throw err;
            if(results.affectedRows === 1){
              res.send({state:'success',msg:'更新记录成功',data:null})
            }else{  
             res.send({state:'fail',msg:'更新记录失败',data:null})
            }
         })
       }else{ //插入
        connect(`insert into lately_read (userid,book_id,chapter) values ('${userId}','${bookId}','${chapter}')`,(err,results,feild)=>{
            if(err) throw err;
            if(results.affectedRows === 1){
              res.send({state:'success',msg:'保存记录成功',data:null})
            }else{  
             res.send({state:'fail',msg:'保存记录失败',data:null})
            }
         })
       }
    })
}

module.exports = saveLately