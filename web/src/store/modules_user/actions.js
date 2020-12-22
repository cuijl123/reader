import * as types from './types'
import state from './state'
import axios from "axios"
const actions = {
    //用户信息
    getInfo({ commit }, info) {
        if (info) { 
            commit(types.PERSON_INFO, info);
            localStorage.setItem("userInfo", JSON.stringify(info));
        } else {  //如果浏览器中保存的有用户的信息
            commit(types.PERSON_INFO, JSON.parse(localStorage.getItem('userInfo')));
        }

    },
    //获取我的书架
    getShelf({ commit }, id) {
        axios.get('/getShelf', { params: { id: id, type: 'bookId' } }).then((res) => {
            if (res.data.state == 'success') {
                commit(types.MY_SHELF, res.data.data)
            }
        })
    }
}

export default actions