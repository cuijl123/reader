const connect = require('../db')

const getChapter = (req,res)=> {
    let bookId = req.query.bookId;

    connect(`select * from booktitles where id=${bookId}`,(err,results,feild)=>{
       if(err) throw err;
       if(results.length === 1){
        res.send({state:'success',data:results[0]})
      }else{  
       res.send({state:'fail',msg:'获取目录失败',data:null})
      }
    })
}

module.exports = getChapter