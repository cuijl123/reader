const connect = require("../db");

const bookList = (req,res)=>{
     const id = req.query.id;
     connect(id?`select * from booklist where id = ${id}`:`select * from booklist`,function (err,results,feild) {
         if(err) throw err;
         id?res.send({state:'success',data:results[0]}):res.send({state:'success',data:results});
         
     })
}

module.exports = bookList;