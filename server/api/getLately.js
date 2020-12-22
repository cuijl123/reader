const connect = require('../db')

const getLately = (req,res)=> {
    let userId = req.query.userId;
    let bookId = req.query.bookId;

    connect(`select * from lately_read where userid=${userId} and book_id=${bookId}`,(err,results,feild)=>{
       if(err) throw err;
       if(results.length === 1){
        res.send({state:'success',data:results[0]})
      }else{  
       res.send({state:'fail',msg:'没有阅读记录',data:null})
      }
    })
}

module.exports = getLately