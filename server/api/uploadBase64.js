const connect = require("../db");

const uploadBase64 = (req,res)=>{
     let id = req.body.userId;
     let headImg = req.body.base64;
     
     connect(`update user_info set head_img = '${headImg}' where id =${id}`,(err,results,fileds)=>{
        if(err) throw err;
        //更新成功
        if(results.affectedRows === 1){
            //更新用户信息返回前端
            connect(`select * from user_info where id = '${id}'`,function (err,results,feild) {
                if(err) throw err;
                if(results.length === 1){
                    res.send({state:'success',msg:'上传成功',data:results[0]});
                }else{
                    res.send({state:'fail',msg:'发生错误',data:null});
                }
            })
        }else{
            res.send({state:'fail',msg:'发生错误',data:null});
        }
    })
}

module.exports = uploadBase64;