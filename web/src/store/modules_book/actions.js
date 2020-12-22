import * as types from './types'
import state from './state'
const actions = {
    //书的类型
    getType({commit},type){
      return new Promise((resolve,reject)=>{
          state.types.map((item)=>{
              if(item.type == type){
                  resolve(item.title)
              }
          })
      })
    },
    //显示上下导航菜单
    menus({commit}) {
        commit(types.MENU);
    },
    //设置并获取当前章节
    currentCpt({commit},num){
        commit(types.CURRENT_CPT,num);
    },
    //上一章
    preCpt({commit}) {
        return new Promise((resolve, reject) => {
            resolve(true);
            commit(types.PRE_CPT)
        })
    },
    //下一章
    nextCpt({commit}) {
        return new Promise((resolve, reject) => {
            resolve(true);
            commit(types.NEXT_CPT)
        })
    },
    //字体设置界面
    font({commit}) {
        commit(types.FONT)
    },
    //放大字体
    bigFont({commit}){
        commit(types.BIG_FONT)
    },
    //缩小字体
    smallFont({commit}){
        commit(types.SMALL_FONT)
    },
    //当前背景
    currentStyle({commit},index){
        commit(types.BACK_GROUND,index)
    },
    //日夜模式
    nightState({commit}){
        commit(types.NIGHT_STATE)
    }
}

export default actions;
