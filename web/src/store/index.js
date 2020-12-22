import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//引入模块
import book from './modules_book'
import user from './modules_user'

export default new Vuex.Store({
    // 通过modules属性引入模块。
    modules: {
        book,
        user
    }
})
