import * as types from './types'

const mutations={
    //用户信息
   [types.PERSON_INFO](state,info){
    state.userInfo = info;
   },
   //我的书架
   [types.MY_SHELF](state,bookId){
    state.myShelf = bookId;
   }
}

export default mutations