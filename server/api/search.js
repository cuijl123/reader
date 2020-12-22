const connect = require("../db");

const search = (req,res)=>{
     const keyword = req.query.keyword;
     connect(`select * from booklist where name like '%${keyword}%' or author like '%${keyword}%';`,function (err,results,feild) {
         if(err) throw err;
         res.send({state:'success',data:results});
         
     })
}

module.exports = search;