const connect = require('../db')

const register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    //插入前先查询账号是否已被注册
    connect(`select * from users where user_name=${username}`, (err, results, feild) => {
        if (err) throw err;
        if (results.length === 1) {
            res.send({ state: 'fail', msg: '该账号已被注册', data: null })
        } else {
            //用户表插入数据
            let id = new Date().getTime();
            connect(`insert into users(user_id,user_name,password,email) values ('${id}','${username}','${password}','${email}')`, (err, results, feild) => {
                if (err) throw err;
                if (results.affectedRows === 1) {
                    //用户详情表插入数据  
                    connect(`insert into user_info(id,user,font_size,style_model,night) values ('${id}','${username}',16,'style1','false')`, (err, results, feild) => {
                        if (err) throw err;
                        if (results.affectedRows === 1) {
                            connect(`select * from user_info where user="${username}";`, function (err, results, fileds) {
                                if (err) throw err;
                                if (results.length === 1) {
                                    res.send({state:'success',msg:'注册成功，正在登录',data:results[0]});
                                } else {
                                    res.send({ state: 'fail', msg: '注册失败', data: null })
                                }
                            })
                        }else{
                            res.send({ state: 'fail', msg: '插入用户详情失败', data: null })
                        }

                    })
                } else {
                    res.send({ state: 'fail', msg: '插入失败', data: null })
                }
            })
        }
    })
}

module.exports = register