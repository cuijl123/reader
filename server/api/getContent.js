const connect = require('../db')

const getContent = (req,res)=> {
    let bookId = req.query.bookId;
    let chapter= req.query.chapter;

    connect(`select * from book${bookId} where id=${chapter}`,(err,results,feild)=>{
       if(err) throw err;
       if(results.length === 1){
         res.send({state:'success',data:results[0]})
       }else{  
        res.send({state:'fail',msg:'获取章节失败',data:null})
       }
    })
}

module.exports = getContent