import * as types from './types'
import { Toast } from "mint-ui";

const mutations = {
    //显示上下导航菜单
    [types.MENU](state) {
        state.menu = !state.menu;
        if (state.menu == false) {
            //关闭字体选择界面
            state.font = false
        }
    },

    //设置当前章节
    [types.CURRENT_CPT](state, num) {
        if (num > 100) {
            Toast({
                message: "暂未开放",
            });
            return false;
        } else {
            state.currentCpt = num;
        }
    },
    //上一章
    [types.PRE_CPT](state) {
        if (state.currentCpt <= 1) {
            return false;
        } else {
            state.currentCpt--;
        }
    },
    //下一章
    [types.NEXT_CPT](state) {
        if (state.currentCpt > 100) {
            Toast({
                message: "暂未开放",
            });
            return false;
        } else {
            state.currentCpt++;
        }
    },
    //字体设置界面
    [types.FONT](state) {
        state.font = !state.font
    },
    //放大字体
    [types.BIG_FONT](state) {
        if (state.fontSize >= 20) {
            Toast({
                message: "已达最大",
            });
            return false
        } else {
            state.fontSize++;
        }
    },
    //缩小字体
    [types.SMALL_FONT](state) {
        if (state.fontSize <= 12) {
            Toast({
                message: "已达最小",
            });
            return false
        } else {
            state.fontSize--;
        }
    },
    //设置背景
    [types.BACK_GROUND](state,index) {
        state.currentStyle = state.styles[index]
    },
    //日夜模式
    [types.NIGHT_STATE](state) {
        state.night = !state.night
    },
}

export default mutations