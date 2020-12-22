const connect = require('../db')

const deleteShelf = (req,res)=> {
    let userId = req.body.userId;
    let bookId = req.body.bookId;

    connect(`delete from bookshelf where userid=${userId} and bookid=${bookId}`,(err,results,feild)=>{
       if(err) throw err;
       if(results.affectedRows === 1){
        res.send({state:'success',msg:'删除成功',data:null})
       }else{
        res.send({state:'fail',msg:'删除失败',data:null})
       }
    })
}

module.exports = deleteShelf