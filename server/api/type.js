const connect = require("../db");

const type = (req,res)=>{
     let type = req.query.type;
     connect(`select * from booklist where type = '${type}'`,function (err,results,feild) {
         if(err) throw err;
         res.send({state:'success',data:results});
         
     })
}

module.exports = type;