const connect = require("../db");

const login = (req,res)=>{
     let user_name = req.body.username;
     let password = req.body.password;
     
     connect(`select * from users where user_name = '${user_name}' and password = '${password}'`,function (err,results,feild) {
         if(err) throw err;
         if(results.length === 1){
            connect(`select * from user_info where user = '${user_name}'`,function (err,results,feild) {
                if(err) throw err;
                if(results.length === 1){
                    res.send({state:'success',msg:'登录成功',data:results[0]});
                }else{
                    res.send({state:'fail',msg:'发生错误',data:null});
                }
            })
         }else{
            res.send({state:'fail',msg:'用户名或密码错误',data:null});
         }
         
     })
}

module.exports = login;