const connect = require('../db')

const getShelf = (req,res)=> {
    let id = req.query.id;
    let type = req.query.type;

    connect(`select * from bookshelf where userid=${id} order by createtime desc`,(err,results,feild)=>{
       if(err) throw err;
       let arr=[];
       if(type == 'bookId'){
         for(let i =0;i<results.length;i++){
            arr.push(results[i].bookid)
         }
         res.send({state:'success',data:arr})
       }else{  //获取shelfList
        res.send({state:'success',data:results})
       }
    })
}

module.exports = getShelf