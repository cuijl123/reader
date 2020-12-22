const state = {
    types: [
        {
            type: 1,
            title: '玄幻'
        },
        {
            type: 2,
            title: '修真'
        },
        {
            type: 3,
            title: '都市'
        },
        {
            type: 4,
            title: '历史'
        },
        {
            type: 5,
            title: '网游'
        }
    ],
    menu: false, //显示上下导航菜单
    font:false,  //字体设置界面
    night:false,  //夜间模式
    fontSize:16, // 字体大小
    currentCpt: 1,  //当前章节
    currentStyle:'style1',  //当前背景
    styles: ['style1', 'style2', 'style3', 'style4', 'style5']

}

export default state