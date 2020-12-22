const connect = require('../db')

const queryPic = (req,res)=> {
    let user_name = req.query.username;
    if(!user_name){
        res.send({state:null,data:null})
        return
    }
    connect(`select i.head_img from user_info i where i.user=${user_name}`,(err,results,feild)=>{
       if(err) throw err;
       if(results.length ===1){
           res.send({state:'success',data:results[0]})
       }else{
        res.send({state:null,data:null})
       }
    })
}

module.exports = queryPic