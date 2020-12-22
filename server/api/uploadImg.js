const connect = require('../db');

const fs = require('fs');
const uploadImg = (req, res) => {
    let fileName = "";
    const userId = req.body.userId;

    if (req.file != undefined) {
        fileName = new Date().getTime() + "_" + req.file.originalname;

        const oldPath = req.file.path;
        const newPath = "uploads/img/" + fileName;
        fs.rename(oldPath,newPath, err => {//重命名，加后缀，不然图片会显示乱码，打不开
            if (err) console.log(err);
            insertUserInfo(userId,newPath,res);
        }); 
    }
}

//将头像地址放到数据库
function insertUserInfo(id,path,res) {
    connect(`update user_info set head_img = '${path}' where id =${id}`,(err,results,fileds)=>{
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

module.exports = uploadImg