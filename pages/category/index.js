import {
  request
} from "../../request/index.js"

Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0
  },

  // 接口返回的数据
  Cates: [],

  onLoad: function (options) {
    this.getCates()
  },

  // 获取分类数据
  getCates() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
    }).then(res => {
      // console.log(res);
      this.Cates = res.data.message;

      // 构造左侧大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);

      // 构造右侧商品数据
      // 不同的索引，获取到的数据就不同，this.Cates[0].children就是切换右侧数据的关键
      let rightContent = this.Cates[0].children;

      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    // console.log(e);
    /**
     * 获取被点击的标题身上的索引
     * 给data中的currentIndex赋值
     * 根据不同的索引渲染不同的数据
     */
    const {
      index
    } = e.currentTarget.dataset;
    // console.log(index);
    // 构造右侧商品数据
    let rightContent = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightContent
    })
  }
})